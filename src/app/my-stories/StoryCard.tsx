"use client";

import { StoryWithQuizMeta } from "@/types/types";
import { generateQuizFromStory } from "@/app/libs/openai/actions";
import Link from "next/link";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";

export default function StoryCard({ story }: { story: StoryWithQuizMeta }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleGenerateQuiz = () => {
    setError(null); // reset
    startTransition(async () => {
      try {
        const path = await generateQuizFromStory(story);

        if (typeof path === "string") {
          router.push(path);
        } else {
          setError("Failed to generate quiz. Please try again.");
        }
      } catch (err: unknown) {
        console.error("Client-side error:", err);
        setError("Failed to generate quiz. Please try again.");
      }
    });
  };

  return (
    <div className="w-full p-2">
      <div className="flex flex-col md:flex-row border rounded-xl shadow-md p-4 justify-between items-center gap-4 h-full">
        <Link href={`/my-stories/${story.id}`} className="w-full md:w-1/3">
          <div className="p-4 border rounded-2xl shadow-sm hover:shadow-md transition duration-200 cursor-pointer bg-white text-center">
            <h3 className="text-base md:text-lg font-semibold truncate">
              {story.id.split("-").pop()}
            </h3>
          </div>
        </Link>

        <div className="w-full md:w-auto flex flex-col items-center gap-2">
          {story.quizzes && story.quizzes?.length > 0 ? (
            <Link href={`/my-stories/${story.id}/quiz/${story.quizzes[0].id}`}>
              <button className="w-full md:w-auto text-sm border px-4 py-2 hover:bg-gray-100 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-md transition-all duration-200 text-white hover:scale-105 hover:shadow-lg">
                Read Quiz
              </button>
            </Link>
          ) : (
            <>
              <button
                onClick={handleGenerateQuiz}
                className="w-full md:w-auto text-sm border px-4 py-2 hover:bg-gray-100 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-md transition-all duration-200 text-white hover:scale-105 hover:shadow-lg"
              >
                Generate Quizz {isPending ? "Generating..." : "Generate"}
              </button>
              {error && (
                <p className="text-red-500 text-sm text-center max-w-xs">
                  {error}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
