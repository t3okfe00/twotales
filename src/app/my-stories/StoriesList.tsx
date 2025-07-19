import { Story } from "@/types/types";
import StoryCard from "@/app/my-stories/StoryCard";
export default function StoriesList({ stories }: { stories: Story[] }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      {stories.length > 0 ? (
        stories.map((story) => <StoryCard key={story.id} story={story} />)
      ) : (
        <p>No stories found.</p>
      )}
    </div>
  );
}
