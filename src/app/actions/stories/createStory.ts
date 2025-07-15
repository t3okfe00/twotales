"use server";
import { openAiClient } from "@/lib/openai";
import { StoryFormState } from "@/types/types";
import { APIError } from "openai";

export async function generateStory(
  prevState: StoryFormState,
  formData: FormData
) {
  console.log("making request?");
  const language = formData.get("language") as string;
  const prompt = formData.get("prompt") as string;
  try {
    const response = await openAiClient.responses.create({
      model: "gpt-4.1",
      instructions: `You are a creative storyteller. You are very creative and imaginative.`,
      input: "2 sentence about " + prompt + "in" + language,
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
