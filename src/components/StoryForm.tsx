"use client";
import { generateStory } from "@/app/actions/stories/createStory";
import { useActionState } from "react";
import { languages, languageLevels } from "@/constants";
import { Submit } from "./Submit";
import { StoryFormState } from "@/types/types";

const initialFormState: StoryFormState = {
  success: "",
  story: "",
  totalTokens: 0,
  error: "",
};

export default function StoryGenerationForm() {
  const [state, formAction] = useActionState(generateStory, initialFormState);

  return (
    <form
      action={formAction}
      className="p-8 flex flex-col border rounded-lg bg-gray-200 shadow-lg w-full max-w-lg"
    >
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-1">Language</label>
          <select
            name="language"
            className="border p-2 rounded w-full"
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
          <label className="block mb-1">Vocabulary level</label>
          <select
            name="languageLevel"
            className="border p-2 rounded w-full"
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
      <label>Description</label>
      <input
        type="text"
        name="prompt"
        placeholder="Prompt"
        className="mb-4 border p-2 rounded"
        defaultValue=""
      />
      <Submit />

      {state.success === "true" && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
          <h2 className="text-lg font-bold">Generated Story</h2>
          <p className="mt-2">{state.story}</p>
          <p className="mt-2 text-sm text-gray-600">
            Tokens used: {state.totalTokens}
          </p>
        </div>
      )}
      {state.success === "false" && <p>{state.error}</p>}
    </form>
  );
}
