// MobileSidebar.tsx (Client Component)
"use client";

import Link from "next/link";
import { navigationItems } from "@/constants";

export default function MobileSidebar({ onClose }: { onClose: () => void }) {
  console.log("client ? MobileSidebar rendered");
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-[var(--blue-base)] p-6 z-50 rounded-r-3xl shadow-lg">
      <nav className="flex flex-col gap-3 mt-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary-200)] text-[var(--primary-800)] flex items-center justify-center font-bold text-xl shadow">
            ✨
          </div>
          <h1 className="text-2xl font-extrabold text-[var(--green-light)]">
            TwoTales
          </h1>
        </div>
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center gap-4 px-4 py-3 rounded-xl bg-white hover:bg-[var(--blue-dark)] hover:text-white transition duration-150 shadow-sm"
            onClick={onClose}
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
    </div>
  );
}
