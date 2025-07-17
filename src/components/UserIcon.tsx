import { MdOutlineLogout } from "react-icons/md";
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
      >
        <MdOutlineLogout width={16} height={16} />
      </SubmitButton>
    </form>
  );
}
