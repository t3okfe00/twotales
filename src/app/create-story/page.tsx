"use client";

import dynamic from "next/dynamic";

const DynamicStoryGenerationForm = dynamic(
  () => import("@/components/StoryForm"),
  {
    ssr: false,
  }
);

export default function CreateStoryPage() {
  return (
    <div className="flex justify-center px-4 py-16 min-h-screen w-full">
      <div className="w-full md:w-2/3 lg:w-1/2 rounded-lg p-4 border-2 border-[var(--green-dark)]">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Create your story
        </h1>
        <DynamicStoryGenerationForm />
      </div>
    </div>
  );
}
