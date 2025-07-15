export interface StoryFormState {
  success: string;
  story?: string;
  totalTokens?: number;
  error?: string;
}

export type languageLevel =
  | "daily"
  | "academic"
  | "formal"
  | "casual"
  | "technical";

export type storyLength = "short" | "medium" | "long";
