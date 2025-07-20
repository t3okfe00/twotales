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
export const openAIStoryGenerationModel = "gpt-4o-mini-2024-07-18";
export const openAIQuizGenerationModel = "gpt-4o-mini-2024-07-18";

export const navigationItems = [
  { name: "Home", href: "/", icon: "🏠", color: "var(--primary-100)" },
  {
    name: "Create Story",
    href: "/create-story",
    icon: "✨",
    color: "var(--accent-100)",
  },
  {
    name: "My Stories",
    href: "/my-stories",
    icon: "📚",
    color: "var(--secondary-100)",
  },
  {
    name: "Get Credits",
    href: "/get-credits",
    icon: "💎",
    color: "var(--primary-200)",
  },
];
