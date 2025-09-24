import React from "react";
import { History } from "lucide-react";

interface Props {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Retry = ({ onClick, className, disabled }: Props) => {
  return (
    <button
      className={`
        group relative flex items-center justify-center gap-2 px-6 py-3 
        bg-neutral-600 hover:bg-neutral-700 text-white 
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
      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-neutral-300 to-neutral-600 opacity-20 group-hover:opacity-30 transition-opacity blur-sm" />
      <History
        size={20}
        className="group-hover:translate-y-1 transition-transform"
      />
      <span className="font-semibold group-hover:translate-y-1 transition-transform">
        Retry
      </span>
    </button>
  );
};

export default Retry;
