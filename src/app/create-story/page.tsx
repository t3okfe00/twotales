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
    <div className="w-full md:w-2/3 lg:w-1/2 min-h-screen py-16 px-4 border-2 border-gray-300 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Create your story</h1>
      <DynamicStoryGenerationForm />
    </div>
  );
}
