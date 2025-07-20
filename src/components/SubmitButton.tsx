"use client";
import React, { ReactNode, CSSProperties } from "react";
import { useFormStatus } from "react-dom";
type SubmitButtonProps = {
  children?: ReactNode;
  label?: string;
  pendingLabel?: string; // <-- Add this line
  color?: string;
  className?: string;
  style?: CSSProperties;
};

export const SubmitButton = ({
  children,

  pendingLabel = "Processing...",
  color = "bg-gradient-to-r from-blue-500 to-green-500 text-white",
  className = "",
  style,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        flex items-center justify-center gap-2 w-full px-4 py-2
        ${color} 
        rounded-lg shadow-md transition-all duration-200
        hover:scale-105 hover:shadow-lg
        disabled:opacity-60 disabled:cursor-not-allowed
        font-semibold text-base
        ${className}
       
      `}
      style={style}
    >
      {!pending && children}
      <span>{pending && pendingLabel}</span>
    </button>
  );
};
