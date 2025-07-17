"use client";
import { useFormStatus } from "react-dom";
export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="block w-full p-2 bg-blue-500"
    >
      {pending ? "Generating..." : "Generate Story"}
    </button>
  );
};
