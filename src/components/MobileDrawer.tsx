// components/MobileDrawer.tsx
"use client";

import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaWindowClose } from "react-icons/fa";

import MobileSlider from "./MobileSlider";

export default function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-950 p-2 rounded shadow text-white"
      >
        <CiMenuBurger width={24} height={24} />
      </button>

      {/* Slide-in drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer panel */}
          <div className="absolute top-0 left-0 h-full lg:w-64 lg:bg-[var(--primary-600)] p-6 rounded-r-3xl shadow-lg z-50">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white"
            >
              <FaWindowClose />
            </button>

            {/* Server component rendered on client */}
            <MobileSlider onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
