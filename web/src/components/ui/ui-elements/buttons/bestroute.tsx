import React from "react";
import { IconNavigationBolt } from "@tabler/icons-react";

interface Props {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const BestRoute = ({ onClick, className, disabled }: Props) => {
  return (
    <button
      className={`
        group relative flex items-center justify-center gap-2 px-6 py-3 
        bg-blue-600 hover:bg-blue-700 text-white 
        rounded-lg font-medium 
        transform hover:scale-[1.02] active:scale-[0.98]
        transition-all duration-200 ease-in-out
        border border-blue-400/20
        ${
          disabled
            ? "opacity-50 cursor-not-allowed hover:scale-100"
            : "cursor-pointer"
        }
        ${className || ""}
      `}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-300 to-indigo-600 opacity-20 group-hover:opacity-30 transition-opacity blur-sm" />
      <IconNavigationBolt size={20} />
      <span className="font-semibold group-hover:translate-x-1 transition-transform">
        Get Best Route
      </span>
    </button>
  );
};

export default BestRoute;
