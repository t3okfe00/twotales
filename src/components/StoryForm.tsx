"use client";
import { generateStory } from "@/app/libs/openai/createStory";
import { useActionState } from "react";
import { languages, languageLevels } from "@/constants";
import { SubmitButton } from "./SubmitButton";
import { StoryFormState } from "@/types/types";

const initialFormState: StoryFormState = {
  success: "",
  generatedStories: {},
  totalTokens: 0,
  error: "",
};

export default function StoryGenerationForm() {
  const [state, formAction] = useActionState(generateStory, initialFormState);

  return (
    <form
      action={formAction}
      className="p-4 flex flex-col rounded-lg **:shadow-lg w-full"
    >
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 text-sm">Language</label>
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
          <label className="block mb-1 text-sm">Vocabulary level</label>
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
      <SubmitButton pendingLabel="Generating..." className="">
        Generate Story
      </SubmitButton>

      {state.success === "false" && <p>{state.error}</p>}
    </form>
  );
}
