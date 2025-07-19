"use client";
import { Story } from "@/types/types";
import { SubmitButton } from "@/components/SubmitButton";
import { generateQuizFromStory } from "@/app/libs/openai/actions";
import Link from "next/link";

export default function StoryCard({ story }: { story: Story }) {
  return (
    <div className="bg-red-500 w-1/3">
      <Link href={`/my-stories/${story.id}`} className="w-1/3">
        <div className="p-4 border rounded-2xl shadow-sm hover:shadow-md transition duration-200 cursor-pointer bg-white">
          <h3 className="text-lg font-semibold">Story title</h3>
        </div>
      </Link>
      <form action={() => generateQuizFromStory(story)} className="mt-4">
        <SubmitButton>Generate Quiz</SubmitButton>
      </form>
    </div>
  );
}
