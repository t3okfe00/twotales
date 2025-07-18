"use client";
import { Story } from "@/types/types";
import Link from "next/link";

export default function StoryCard({ story }: { story: Story }) {
  console.log("StoryCard", story);
  return (
    <Link href={`/my-stories/${story.id}`}>
      <div className="p-4 border rounded-2xl shadow-sm hover:shadow-md transition duration-200 cursor-pointer bg-white">
        <h3 className="text-lg font-semibold">Story title</h3>
      </div>
    </Link>
  );
}
