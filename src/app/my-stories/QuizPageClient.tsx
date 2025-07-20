"use client";

import { useState } from "react";

type QuizQuestion = {
  id: string;
  question: string;
  answer: string;
};

export default function QuizClient({
  questions,
}: {
  questions: QuizQuestion[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {questions.map((q, index) => (
        <div
          key={q.id}
          className="border rounded-xl shadow-md p-4 bg-[color:var(--yellow-light)]"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center text-left"
          >
            <span className="font-medium text-[color:var(--text-color)]">
              {q.question}
            </span>
            <span className="text-[color:var(--blue-base)] text-xl select-none">
              {openIndex === index ? "▲" : "▼"}
            </span>
          </button>

          <div
            className={`mt-2 text-[color:var(--green-dark)] text-sm transition-all duration-300 ease-in-out ${
              openIndex === index
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <p className="pt-2">{q.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
