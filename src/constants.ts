import { languageLevel } from "@/types/types";
export const languages = ["Turkish", "Finnish", "Spanish", "French", "German"];

export const WRITERS = [
  "William Shakespeare",
  "Jane Austen",
  "Mark Twain",
  "J.K. Rowling",
  "Leo Tolstoy",
  "Gabriel Garcia Marquez",
];

export const languageLevels: languageLevel[] = [
  "daily",
  "academic",
  "formal",
  "casual",
  "technical",
];

export const openAIStoryGenerationInstructions = `You are a creative and professional story writer.`;
export const openAIStoryGenerationModel = "gpt-4.1";
