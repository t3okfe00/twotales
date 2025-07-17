export interface Story {
  id: string;
  english_version: string;
  translated_version: string;
}

export interface CreateStoryInput {
  english_version: string;
  translated_version: string;
  level: languageLevel;
  length: storyLength;
  total_tokens?: number;
  translateTo: string;
}

export interface UserCreateInput {
  userId: string;
  email: string;
  role: "user" | "admin";
  daily_tts_limit: number;
  daily_story_limit: number;
  membership_type: "basic" | "premium" | "enterprise";
}

export interface StoryFormState {
  success: string;
  generatedStories: Record<string, string>;
  totalTokens?: number;
  error: string;
}

export type languageLevel =
  | "daily"
  | "academic"
  | "formal"
  | "casual"
  | "technical";

export type storyLength = "short" | "medium" | "long";
