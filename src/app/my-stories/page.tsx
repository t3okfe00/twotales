import { getUserStories } from "../libs/db";
import StoryCard from "@/app/my-stories/StoryCard";
import { Story } from "@/types/types";

export default async function MyStoriesPage() {
  const stories: Story[] = await getUserStories();
  console.log("User stories:", stories);
  return (
    <div className="h-screen flex flex-col">
      <h1 className="flex-1 overflow-y-auto sm:px-20 lg:px-0 lg:pb-4">
        My Stories
      </h1>
      {stories.length > 0 ? (
        stories.map((story) => <StoryCard key={story.id} story={story} />)
      ) : (
        <p>No stories found.</p>
      )}
    </div>
  );
}
