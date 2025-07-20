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
    <aside className="hidden lg:flex h-screen w-48 lg:w-64 flex-col justify-between p-6 z-50 rounded-r-3xl shadow-lg border-2 border-black bg-[var(--blue-base)]">
      {/* Logo */}
      <nav>
        {/* Navigation */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary-200)] text-[var(--primary-800)] flex items-center justify-center font-bold text-xl shadow">
            ✨
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--green-light)]">
            TwoTales
          </h1>
        </div>
        <div className="flex flex-col gap-4 mt-10">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center gap-4 px-4 py-3 rounded-xl bg-white hover:bg-[var(--blue-dark)] hover:text-white transition duration-150 shadow-sm"
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
        </div>
      </nav>
      {/* User Info */}
      <UserIcon email={user.email || "User"} />
    </aside>
  );
}
