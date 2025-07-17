"use server";
import { CreateStoryInput, UserCreateInput } from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import { createClient as adminClient } from "@/utils/supabase/admin";

export async function createStory(storyData: CreateStoryInput) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stories")
    .insert(storyData)
    .select("*");
  if (!data || error) {
    throw new Error(error.message);
  }
}

export async function isExistingUser(userId: string) {
  console.log("user id -->", userId);
  const supabase = await createClient();
  console.log("Checking if user exists in Database");
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
  console.log("Creating new user in Database");
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
