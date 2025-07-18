"use server";
import { CreateStoryInput, UserCreateInput } from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import { createClient as adminClient } from "@/utils/supabase/admin";
import { redirect } from "next/navigation";

export async function createStory(storyData: CreateStoryInput) {
  const {
    data: { user },
  } = await (await createClient()).auth.getUser();

  const finalObject = { ...storyData, user_id: user?.id };
  console.log("Creating story in Database", finalObject);

  const { data, error } = await (await createClient())
    .from("stories")
    .insert(finalObject)
    .select("*");
  if (!data || error) {
    throw new Error(error.message);
  }

  return data;
}

export async function isExistingUser(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId.trim())
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function createNewUser(userCreateInput: UserCreateInput) {
  const supabase = adminClient();

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        id: userCreateInput.userId,
        email: userCreateInput.email,
        role: userCreateInput.role,
        daily_tts_limit: userCreateInput.daily_tts_limit,
        daily_story_limit: userCreateInput.daily_story_limit,
        membership_type: userCreateInput.membership_type,
      },
    ])
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logOutUser() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
  redirect("/login");
}
