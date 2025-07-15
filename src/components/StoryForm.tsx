"use client";
import { generateStory } from "@/app/actions/stories/createStory";
import { useActionState } from "react";
import { LANGUAGES } from "@/constants";
import { Submit } from "./Submit";
import { StoryFormState } from "@/types/types";

const initialFormState: StoryFormState = {
  success: "",
  story: "",
  totalTokens: 0,
};

export default function StoryGenerationForm() {
  const [state, formAction] = useActionState(generateStory, initialFormState);

  return (
    <form
      action={formAction}
      className="p-8 flex flex-col border rounded-lg bg-gray-200 shadow-lg w-full max-w-lg"
    >
      <label>Language</label>
      <select name="language" className="mb-4 border p-2 rounded">
        {LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <label>Description</label>
      <input
        type="text"
        name="prompt"
        placeholder="Prompt"
        className="mb-4 border p-2 rounded"
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
