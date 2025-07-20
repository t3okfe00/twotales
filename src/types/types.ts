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

export interface QuizQuestions {
  id: string;
  question: string;
  answer: string;
}

export interface Quiz {
  id: string;
  quiz_questions: QuizQuestions[];
}
export interface StoryWithQuizMeta {
  id: string;
  english_version: string;
  translated_version: string;
  level: string;
  length: number;
  translateTo: string;
  quizzes:
    | {
        id: string;
      }[]
    | null;
}
export interface StoryWithQuizzes {
  id: string;
  english_version: string;
  translated_version: string;
  level: languageLevel;
  length: storyLength;
  translateTo: string;
  quizzes?: Quiz[];
}
