"use client";
import { generateStory } from "@/app/libs/openai/actions";
import { useActionState } from "react";
import { languages, languageLevels } from "@/constants";
import { SubmitButton } from "./SubmitButton";
import { StoryFormState } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const initialFormState: StoryFormState = {
  success: "",
  generatedStories: {},
  totalTokens: 0,
  error: "",
  path: "",
};

export default function StoryGenerationForm() {
  const [state, formAction] = useActionState(generateStory, initialFormState);
  const router = useRouter();

  useEffect(() => {
    if (
      state.success === "true" &&
      typeof state.path === "string" &&
      state.path.length > 0
    ) {
      router.push(state.path);
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium text-[var(--text-color)]">
            Language
          </label>
          <select
            name="language"
            className="w-full p-3 rounded border border-[var(--blue-base)] bg-[var(--blue-light)] text-[var(--blue-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--blue-base)] transition"
            defaultValue={languages[0]}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-sm font-medium text-[var(--text-color)]">
            Vocabulary Level
          </label>
          <select
            name="languageLevel"
            className="w-full p-3 rounded border border-[var(--green-base)] bg-[var(--green-light)] text-[var(--green-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--green-base)] transition"
            defaultValue={languageLevels[0]}
          >
            {languageLevels.map((level) => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label
        htmlFor="prompt"
        className="block mb-2 text-sm font-medium text-[var(--text-color)]"
      >
        Description
      </label>
      <input
        type="text"
        name="prompt"
        id="prompt"
        placeholder="Enter your story prompt here..."
        className="w-full mb-6 p-3 rounded border border-[var(--yellow-base)] bg-[var(--yellow-light)] text-[var(--yellow-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--yellow-base)] transition"
        defaultValue=""
        required
      />

      <SubmitButton className="w-full py-3 bg-[var(--blue-base)] hover:bg-[var(--blue-dark)] text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105">
        Generate Story
      </SubmitButton>

      {state.success === "false" && (
        <p className="mt-4 text-[var(--red-base)] font-medium">{state.error}</p>
      )}
    </form>
  );
}
