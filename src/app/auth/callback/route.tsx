import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";
import { createNewUser, isExistingUser } from "@/app/libs/db";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/";
  }

  if (code) {
    const { error } = await (
      await createClient()
    ).auth.exchangeCodeForSession(code);

    console.log("Code exchanged for session:", code, error);
    // Fetch the user that logged-in
    const {
      data: { user },
      error: userError,
    } = await (await createClient()).auth.getUser();
    if (!user || userError) {
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    // Check if user exists in our custom users table
    try {
      const data = await isExistingUser(user.id);

      if (!user.email) {
        throw new Error("No email found, can not proceed");
      }
      if (!data) {
        // User does not exist in our custom users table,Create a new user entry
        await createNewUser({
          userId: user.id,
          email: user.email,
          role: "user",
          daily_tts_limit: 100,
          daily_story_limit: 10,
          membership_type: "basic",
        });
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    } catch (error) {
      console.log("Error checking user existence:", error);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    if (!error) {
      console.log("Code exchanged for session successfully");
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    } else {
      console.log("Error exchanging code for session:", error.message);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
