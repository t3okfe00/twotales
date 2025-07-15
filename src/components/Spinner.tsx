import React from "react";

const Spinner: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = "#6366f1",
}) => (
  <div className="flex items-center justify-center">
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="25"
        cy="25"
        r="20"
        stroke={color}
        strokeWidth="5"
      />
      <path
        className="opacity-75"
        fill={color}
        d="M25 5a20 20 0 0 1 20 20h-5a15 15 0 1 0-15 15v5A20 20 0 0 1 25 5z"
      />
    </svg>
  </div>
);

export default Spinner;
