import { languageLevel, storyLength } from "@/types/types";
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
          - Each story has at least ${numberOfSentences} sentences.
          - Do not include any ** or other special formatting characters in the sentences.

          Please ensure that both stories match sentence-for-sentence precisely.`;
}

export function extractStories(text: string): {
  english: string;
  translated: string;
} {
  const regex = /^(\w+):\s*([\s\S]*?)(?=^\w+:|\s*$)/gm;
  let englishStory = "";
  let translatedStory = "";
  let match;

  while ((match = regex.exec(text)) !== null) {
    const language = match[1].trim().toLowerCase();
    const story = match[2].trim();

    if (language === "english") {
      englishStory = story;
    } else {
      translatedStory = story;
    }
  }

  return {
    english: englishStory,
    translated: translatedStory,
  };
}

export function getTranslatedStory(
  stories: Record<string, string> | undefined
): string | null {
  if (!stories) return null;

  for (const [key, value] of Object.entries(stories)) {
    if (key.toLowerCase() !== "english" && value) {
      return value;
    }
  }

  return null;
}
