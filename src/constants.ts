import { languageLevel, storyLength } from "./types/types";
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

export function generateOpenAIStoryPrompt(
  prompt: string,
  language: string,
  level: languageLevel,
  length: storyLength
): string {
  const numberOfSentences =
    length === "short" ? 2 : length === "medium" ? 4 : 6;
  return `${prompt} +
          I want to hear the same story in English and ${language} using ${level} vocabulary. 
          The format should be like this: 
          English: [the whole story in English]. 
          ${language}: [the whole story in ${language}].

          First, give me the complete English story, then the same story in ${language}. Do not mix any content!

          Make sure:
          - The number of sentences in both translations is exactly the same.
          - Each sentence corresponds directly to the sentence in the other language.
          - The story has at least ${numberOfSentences} sentences.
          - Do not include any ** or other special formatting characters in the sentences.

          Please ensure that both stories match sentence-for-sentence precisely.`;
}
