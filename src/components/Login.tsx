"use client";
import { createClient } from "@/utils/supabase/client";

export default function Login() {
  async function handleLogin() {
    await createClient().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });
  }
  console.log("Hello from LoginPage");
  return (
    <div className="p-6 width-full max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <button
        onClick={() => handleLogin()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
