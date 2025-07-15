"use server";
import { openAiClient } from "@/utils/openai";
import { languageLevel, StoryFormState } from "@/types/types";
import { APIError } from "openai";
import {
  generateOpenAIStoryPrompt,
  openAIStoryGenerationInstructions,
  openAIStoryGenerationModel,
} from "@/constants";

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
    return { success: "true", story, totalTokens, error: "" };
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
      story: "",
      totalTokens: 0,
    };
  }

  //revalidatePath("/my-stories");
}
