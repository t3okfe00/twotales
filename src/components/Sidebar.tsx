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

  console.log("server ? Sidebar rendered");
  return (
    <aside className="fixed left-0 top-0 h-full w-64 hidden lg:flex flex-col justify-between p-6 z-40 bg-[var(--primary-600)] border-r border-[var(--primary-200)] rounded-r-3xl shadow-lg">
      {/* Logo */}

      <nav className="flex flex-col gap-3">
        {/* Navigation */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary-200)] text-[var(--primary-800)] flex items-center justify-center font-bold text-xl shadow">
            ✨
          </div>
          <h1 className="text-2xl font-extrabold text-white">TwoTales</h1>
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
