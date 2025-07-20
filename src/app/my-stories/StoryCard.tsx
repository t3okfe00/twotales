"use client";
import { StoryWithQuizMeta } from "@/types/types";
import { SubmitButton } from "@/components/SubmitButton";
import { generateQuizFromStory } from "@/app/libs/openai/actions";
import Link from "next/link";

export default function StoryCard({ story }: { story: StoryWithQuizMeta }) {
  return (
    <div className="w-1/3 flex border rounded-lg shadow-md p-4 bg-white justify-between">
      <Link href={`/my-stories/${story.id}`} className="w-1/3">
        <div className="p-4 border rounded-2xl shadow-sm hover:shadow-md transition duration-200 cursor-pointer bg-white">
          <h3 className="text-lg font-semibold">{story.id.split("-").pop()}</h3>
        </div>
      </Link>
      {story.quizzes && story.quizzes?.length > 0 ? (
        <Link href={`/my-stories/${story.id}/quiz/${story.quizzes[0].id}`}>
          <button
            className="mt-2 text-sm border px-4 py-2 hover:bg-gray-100 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-md transition-all duration-200 text-white
    hover:scale-105 hover:shadow-lg"
          >
            Read Quiz
          </button>
        </Link>
      ) : (
        <form action={() => generateQuizFromStory(story)} className="mt-4">
          <SubmitButton>Generate Quiz</SubmitButton>
        </form>
      )}
    </div>
  );
}
