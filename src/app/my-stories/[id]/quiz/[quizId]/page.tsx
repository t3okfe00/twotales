import { getQuizQuestionsById } from "@/app/libs/db";
export default async function StoryQuizPage({
  params,
}: {
  params: { id: string; quizId: string };
}) {
  const { quizId } = await params;

  const questions = await getQuizQuestionsById(quizId);
  console.log("Quiz Questions:", questions);

  return <div>Story Quiz Page</div>;
}
