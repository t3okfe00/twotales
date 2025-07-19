import { getUserStories } from "../libs/db";
import { Story } from "@/types/types";
import StoriesList from "./StoriesList";

export default async function MyStoriesPage() {
  const stories: Story[] = await getUserStories();
  
  return (
    <div>
      <h1 className="text-2xl font-bold p-4 px-16">My Stories</h1>
      {stories.length > 0 ? (
        <StoriesList stories={stories} />
      ) : (
        <p>No stories found.</p>
      )}
    </div>
  );
}
