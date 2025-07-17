import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
export default async function Home() {
  console.log("Home Page Loaded");

  const supabase = createClient();
  const user: User = await (await supabase).auth.getUser();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Next Js</h1>
    </div>
  );
}
