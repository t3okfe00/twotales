import { getUserStoriesWithQuizAndQuestions } from "../libs/db";
import { StoryWithQuizzes } from "@/types/types";
import StoriesList from "./StoriesList";

export default async function MyStoriesPage() {
  //const stories: Story[] = await getUserStories();
  const storiesWithQuizzes: StoryWithQuizzes[] =
    await getUserStoriesWithQuizAndQuestions();
  console.log("Stories with quizzes:", storiesWithQuizzes);

  return (
    <div>
      <h1 className="text-2xl font-bold p-4 px-16">My Stories</h1>
      {storiesWithQuizzes.length > 0 ? (
        <StoriesList stories={storiesWithQuizzes} />
      ) : (
        <p className="p-4 px-16">No stories found.</p>
      )}
    </div>
  );
}
