import { getUserStoriesWithQuizMeta } from "../libs/db";
import { StoryWithQuizMeta } from "@/types/types";
import StoriesList from "./StoriesList";

export default async function MyStoriesPage() {
  //const stories: Story[] = await getUserStories();
  const storiesWithQuizIds: StoryWithQuizMeta[] =
    await getUserStoriesWithQuizMeta();
  console.log("User stories:", storiesWithQuizIds);

  return (
    <div>
      <h1 className="text-2xl font-bold p-4 px-16">My Stories</h1>
      {storiesWithQuizIds.length > 0 ? (
        <StoriesList stories={storiesWithQuizIds} />
      ) : (
        <p className="p-4 px-16">No stories found.</p>
      )}
    </div>
  );
}
