import { getUserStories } from "../libs/db";
import { Story } from "@/types/types";
import StoriesList from "./StoriesList";

export default async function MyStoriesPage() {
  const stories: Story[] = await getUserStories();
  console.log("User has ", stories.length, " stories");
  return (
    <div className="h-screen flex flex-col">
      <h1 className="flex-1 overflow-y-auto sm:px-20 lg:px-0 lg:pb-4">
        My Stories
      </h1>
      {stories.length > 0 ? (
        <StoriesList stories={stories} />
      ) : (
        <p>No stories found.</p>
      )}
    </div>
  );
}
