import React from "react";
import { IconWallet } from "@tabler/icons-react";

interface Props {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const InitializeTransaction = ({ onClick, className, disabled }: Props) => {
  return (
    <button
      className={`
        group relative flex items-center justify-center gap-2 px-6 py-3 
        bg-gradient-to-r from-[#1F2937] via-[#111827] to-black 
        text-white rounded-lg font-medium 
        transform hover:scale-[1.02] active:scale-[0.98]
        transition-all duration-200 ease-in-out
        border border-neutral-700/40 shadow-lg
        ${
          disabled
            ? "opacity-50 cursor-not-allowed hover:scale-100"
            : "cursor-pointer hover:brightness-110"
        }
        ${className || ""}
      `}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
  
      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-neutral-500/20 to-neutral-700/20 opacity-30 group-hover:opacity-40 transition-opacity blur-sm" />

      <IconWallet
        size={20}
        className="group-hover:translate-y-1 transition-transform"
      />
      <span className="font-semibold group-hover:translate-y-1 transition-transform">
        Initialize Transaction
      </span>
    </button>
  );
};

export default InitializeTransaction;
