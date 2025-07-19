import { logOutUser } from "@/app/libs/db";
import { SubmitButton } from "./SubmitButton";

export default function UserIcon({ email }: { email: string }) {
  return (
    <form action={logOutUser}>
      {email}
      <SubmitButton
        label="Log out"
        pendingLabel="Logging out..."
        className="flex items-center gap-2"
      ></SubmitButton>
    </form>
  );
}
