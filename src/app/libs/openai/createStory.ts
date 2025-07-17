"use server";
import { openAiClient } from "@/utils/openai";
import { languageLevel, StoryFormState } from "@/types/types";
import { APIError } from "openai";
import {
  openAIStoryGenerationInstructions,
  openAIStoryGenerationModel,
} from "@/constants";
import { extractStories, generateOpenAIStoryPrompt } from "@/utils/utils";
import { CreateStoryInput } from "@/types/types";
import { createStory } from "@/app/libs/db";

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
