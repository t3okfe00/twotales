import Link from "next/link";

import { createClient } from "@/utils/supabase/server";
import { navigationItems } from "@/constants";
import UserIcon from "./UserIcon";

export default async function Sidebar() {
  const {
    data: { user },
  } = await (await createClient()).auth.getUser();

  if (!user) {
    return;
  }

  return (
    <aside className="hidden md:flex h-screen w-48 lg:w-64 flex-col justify-between p-6 z-50 rounded-r-3xl shadow-lg border-2 border-black">
      {/* Logo */}
      <nav>
        {/* Navigation */}
        <div className="flex items-center gap-3 p-4 mb-6 text-4xl">
          <div>✨</div>
          <h1>TwoTales</h1>
        </div>
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center gap-4 px-4 py-3 rounded-xl bg-white hover:bg-[var(--primary-100)] transition duration-150 shadow-sm"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-semibold"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>
            <span className="text-[var(--primary-800)] font-medium group-hover:text-[var(--primary-900)]">
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
      {/* User Info */}
      <UserIcon email={user.email || "User"} />
    </aside>
  );
}
