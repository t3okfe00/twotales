import { createClient } from "@/utils/supabase/client";

export default async function MyStoriesPage() {
  const client = createClient();

  try {
    const { data: story, error } = await client.from("stories").select();
    if (!story) {
      console.log("Errro", error);
    }

    console.log("Fetched story:", story);
  } catch (error) {
    console.error("Error fetching stories:", error);
  }

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px)
            items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
      <h1>My Stories</h1>
      <p className="text-gray-500"></p>
    </div>
  );
}
