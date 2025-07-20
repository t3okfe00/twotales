import { StoryWithQuizMeta } from "@/types/types";
import StoryCard from "@/app/my-stories/StoryCard";
export default function StoriesList({
  stories,
}: {
  stories: StoryWithQuizMeta[];
}) {
  console.log("StoriesList");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4">
      {stories.length > 0 ? (
        stories.map((story) => <StoryCard key={story.id} story={story} />)
      ) : (
        <p>No stories found</p>
      )}
    </div>
  );
}
