import { Story } from "@/types/types";
import StoryCard from "@/app/my-stories/StoryCard";
export default function StoriesList({ stories }: { stories: Story[] }) {
  return (
    <div className="flex-1 overflow-y-auto sm:px-20 lg:px-0 lg:pb-4 w-full">
      {stories.length > 0 ? (
        stories.map((story) => <StoryCard key={story.id} story={story} />)
      ) : (
        <p>No stories found.</p>
      )}
    </div>
  );
}
