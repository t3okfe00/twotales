import { getQuizQuestionsById } from "@/app/libs/db";
import QuizPageClient from "@/app/my-stories/QuizPageClient";
export default async function StoryQuizPage({
  params,
}: {
  params: { id: string; quizId: string };
}) {
  const { quizId } = await params;

  const questions = await getQuizQuestionsById(quizId);
  console.log("Quiz Questions:", questions);

  return (
    <main className="min-h-screen bg-[color:var(--yellow-light)] p-4">
      <h1 className="max-w-3xl mx-auto text-3xl font-bold mb-6 text-[color:var(--blue-dark)] text-center">
        Quiz Questions
      </h1>

      {/* Pass questions to client component */}
      <QuizPageClient questions={questions ?? []} />
    </main>
  );
}
