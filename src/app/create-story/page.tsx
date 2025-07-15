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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Create your story</h1>
      <DynamicStoryGenerationForm />
    </div>
  );
}
