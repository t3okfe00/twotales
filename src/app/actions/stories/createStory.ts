"use server";
import { openAiClient } from "@/lib/openai";
import { StoryFormState } from "@/types/types";
import { APIError } from "openai";
import { generateOpenAIStoryPrompt } from "@/constants";

export async function generateStory(
  prevState: StoryFormState,
  formData: FormData
) {
  const language = formData.get("language") as string;
  console.log("Selected language:", language);
  const prompt = formData.get("prompt") as string;
  const level = formData.get("languageLevel") as string;
  console.log("Selected language level:", level);
  const length = "short";

  const storyPrompt = generateOpenAIStoryPrompt(
    prompt,
    language,
    level,
    length
  );
  try {
    const response = await openAiClient.responses.create({
      model: "gpt-4.1",
      instructions: `You are a creative and professional story writer.`,
      input: storyPrompt,
    });
    console.log("Response received:", response);
    const totalTokens = response.usage?.total_tokens;
    const story = response.output_text;
    return { success: "true", story, totalTokens };
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
    };
  }

  //revalidatePath("/my-stories");
}
