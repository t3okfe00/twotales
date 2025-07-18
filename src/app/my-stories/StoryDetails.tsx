"use client";
import { useState } from "react";
import { Story } from "@/types/types";
import { useRef, useEffect } from "react";

export default function StoryCard({ story }: { story: Story }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const englishSentences = story.english_version.match(/[^.!?]+[.!?]+/g) || [];
  const translatedSentences =
    story.translated_version.match(/[^.!?]+[.!?]+/g) || [];

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Sync scroll between left and right
  useEffect(() => {
    console.log("Story Details Page Mounted");
    const left = leftRef.current;
    const right = rightRef.current;

    if (!left || !right) return;

    const syncScroll = (source: HTMLElement, target: HTMLElement) => {
      const handler = () => {
        target.scrollTop = source.scrollTop;
      };
      source.addEventListener("scroll", handler);
      return () => source.removeEventListener("scroll", handler);
    };

    const cleanupLeft = syncScroll(left, right);
    const cleanupRight = syncScroll(right, left);

    return () => {
      cleanupLeft();
      cleanupRight();
    };
  }, []);

  return (
    <div className="flex w-full h-full max-h-[calc(100vh-4rem)] overflow-hidden border rounded shadow bg-white">
      {/* Shared scroll containers */}
      <div
        ref={leftRef}
        className="flex-1 overflow-y-auto p-4 border-r space-y-2"
      >
        {englishSentences.map((sentence, index) => (
          <p
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`transition duration-200 rounded px-1 ${
              hoveredIndex === index ? "bg-yellow-100" : ""
            }`}
          >
            {sentence.trim()}
          </p>
        ))}
      </div>

      <div ref={rightRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {translatedSentences.map((sentence, index) => (
          <p
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`transition duration-200 rounded px-1 ${
              hoveredIndex === index ? "bg-yellow-100" : ""
            }`}
          >
            {sentence.trim()}
          </p>
        ))}
      </div>
    </div>
  );
}
