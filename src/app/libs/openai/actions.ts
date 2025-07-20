"use server";
import { openAiClient } from "@/utils/openai";
import { languageLevel, Story, StoryFormState } from "@/types/types";
import { APIError } from "openai";
import {
  openAIStoryGenerationInstructions,
  openAIStoryGenerationModel,
} from "@/constants";
import { extractStories, generateOpenAIStoryPrompt } from "@/utils/utils";
import { CreateStoryInput } from "@/types/types";
import { createQuizWithQuestions, createStory } from "@/app/libs/db";
import { quizSchema } from "./schemas/quizSchema";
import { zodTextFormat } from "openai/helpers/zod.mjs";

export async function generateStory(
  prevState: StoryFormState,
  formData: FormData
) {
  const language = formData.get("language") as string;
  const prompt = formData.get("prompt") as string;
  const level: languageLevel = formData.get("languageLevel") as languageLevel;
  const length = "short";

  const storyPrompt = generateOpenAIStoryPrompt(
    prompt,
    language,
    level,
    length
  );
  try {
    const response = await openAiClient.responses.create({
      model: openAIStoryGenerationModel,
      instructions: openAIStoryGenerationInstructions,
      input: storyPrompt,
    });

    const totalTokens = response.usage?.total_tokens;
    const story = response.output_text;
    const generatedStories = extractStories(story);

    const storyCreateData: CreateStoryInput = {
      english_version: generatedStories.english,
      translated_version: generatedStories.translated,
      translateTo: language,
      level,
      length,
      total_tokens: totalTokens,
    };
    try {
      await createStory(storyCreateData);
    } catch (error) {
      console.error("Error saving story to database:", error);
      return {
        success: "false",
        error: "Failed to save story to the database.",
        generatedStories: { english: "", translated: "" },
        totalTokens: 0,
      };
    }

    return { success: "true", generatedStories, totalTokens, error: "" };
  } catch (error: unknown) {
    let errorMessage = "";
    if (
      error instanceof APIError &&
      error.status >= 400 &&
      error.status < 500
    ) {
      errorMessage = "Bad request. Please check your input.";
    } else {
      errorMessage = "Server error. Please try again later.";
    }
    return {
      success: "false",
      error: errorMessage,
      generatedStories: { english: "", translated: "" },
      totalTokens: 0,
    };
  }

  //revalidatePath("/my-stories");
}

export async function generateQuizFromStory(story: Story) {
  try {
    const response = await openAiClient.responses.parse({
      model: "gpt-4o-2024-08-06",
      input: [
        {
          role: "system",
          content:
            "You are a quiz generator. Generate a quiz with exactly 5 questions based on the provided story. Each question should have a clear answer.",
        },
        {
          role: "user",
          content: story.translated_version,
        },
      ],
      text: {
        format: zodTextFormat(quizSchema, "quiz_questions_generator"),
      },
    });

    console.log("Quiz generation response:", response.output_parsed);

    if (response.output_parsed) {
      const quizReturn = {
        story_id: story.id,
        id: response.id,
        totalTokens: response.usage?.total_tokens || 0,
        questions: response.output_parsed,
      };

      const saveToDatabase = await createQuizWithQuestions(
        quizReturn.story_id,
        quizReturn.questions.questions,
        quizReturn.totalTokens
      );

      console.log("Quiz saved to database:", saveToDatabase);
      if (!saveToDatabase) {
        console.log("Failed to save quiz to the database.");
        throw new Error("Failed to save quiz to the database.");
      }
    }
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz. Please try again later.");
  }
}
