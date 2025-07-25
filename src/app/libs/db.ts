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

export async function getUserStories() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getStoryById(storyId: string) {
  console.log("Fetching story with ID from database:", storyId);
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("id", storyId)
    .single();

  if (error) {
    console.error("Error fetching story:", error.message);
    return null;
  }

  return data;
}

export async function createQuizWithQuestions(
  storyId: string,
  questions: { question: string; answer: string }[],
  totalTokens: number = 0
) {
  console.log("createQuizWithQuestions function called");
  const supabase = await createClient();
  const {
    data: { user },
  } = await (await createClient()).auth.getUser();
  const { data, error } = await supabase.rpc("create_quiz_with_questions", {
    input_story_id: storyId,
    input_user_id: user?.id,
    input_total_tokens: totalTokens,
    input_questions: questions,
  });

  if (error) {
    console.error("Error creating quiz:", error.message);
    return null;
  }

  return data;
}

export async function getUserStoriesWithQuizMeta() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("stories")
    .select(
      `
      id,
      english_version,
      translated_version,
      level,
      length,
      translateTo,
      quizzes (
        id
      )
    `
    )
    .eq("user_id", user?.id);

  if (error) throw error;

  return data;
}

export async function getQuizQuestionsById(quizId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quizzes")
    .select("quiz_questions (id, question, answer)")
    .eq("id", quizId)
    .single();

  if (error) {
    console.error("Error fetching quiz questions:", error.message);
    return null;
  }

  return data?.quiz_questions || [];
}
