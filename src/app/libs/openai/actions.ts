"use server";
import { openAiClient } from "@/utils/openai";
import {
  languageLevel,
  Story,
  StoryFormState,
  CreateStoryInput,
  StoryWithQuizMeta,
} from "@/types/types";
import { APIError } from "openai";
import {
  openAIStoryGenerationInstructions,
  openAIStoryGenerationModel,
  openAIQuizGenerationModel,
} from "@/constants";
import { generateOpenAIStoryPrompt } from "@/utils/utils";

import { createQuizWithQuestions, createStory } from "@/app/libs/db";
import { quizSchema } from "./schemas/quizSchema";
import { storySchema } from "./schemas/storySchema";
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
      text: {
        format: zodTextFormat(storySchema, "story_generator"),
      },
    });

    const totalTokens = response.usage?.total_tokens;
    const story = response.output_text;
    const parsed = JSON.parse(story);

    const generatedStories = {
      english: parsed.english_version,
      translated: parsed.translated_version,
    };
    const storyCreateData: CreateStoryInput = {
      english_version: parsed.english_version,
      translated_version: parsed.translated_version,
      translateTo: language,
      level,
      length,
      total_tokens: totalTokens,
    };
    try {
      const storyArray = await createStory(storyCreateData);
      const story: Story = Array.isArray(storyArray)
        ? storyArray[0]
        : storyArray;

      return {
        success: "true",
        generatedStories,
        totalTokens,
        error: "",
        path: `/my-stories/${story.id}`,
      };
    } catch (error) {
      console.error("Error saving story to database:", error);
      return {
        success: "false",
        error: "Failed to save story to the database.",
        generatedStories: { english: "", translated: "" },
        totalTokens: 0,
      };
    }
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
}

export async function generateQuizFromStory(story: StoryWithQuizMeta) {
  try {
    const response = await openAiClient.responses.parse({
      model: openAIQuizGenerationModel,
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

    if (response.output_parsed) {
      const quizReturn = {
        story_id: story.id,
        id: response.id,
        totalTokens: response.usage?.total_tokens || 0,
        questions: response.output_parsed,
      };
      const quizId = await createQuizWithQuestions(
        quizReturn.story_id,
        quizReturn.questions.questions,
        quizReturn.totalTokens
      );

      if (!quizId) {
        throw new Error("Failed to save quiz to the database.");
      }

      return `/my-stories/${story.id}/quiz/${quizId}`;
    }
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz. Please try again later.");
  }
}
