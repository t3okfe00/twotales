import { getStoryById } from "@/app/libs/db";
import StoryDetails from "@/app/my-stories/StoryDetails";
export default async function StoryPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const story = await getStoryById(id);

  if (!story) {
    return <p>Story not found.</p>;
  }

  return (
    <div className="h-screen flex flex-col">
      <h1 className="flex-1 overflow-y-auto sm:px-20 lg:px-0 lg:pb-4">
        Story Details
      </h1>
      <StoryDetails story={story} />
    </div>
  );
}
