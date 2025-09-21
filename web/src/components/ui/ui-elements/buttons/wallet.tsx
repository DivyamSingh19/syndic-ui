import React from "react";
import Image from "next/image";

interface WalletProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Wallet = ({ className, onClick, disabled }: WalletProps) => {
  return (
    <button
      className={`
        group relative flex items-center gap-3 px-4 py-3 rounded-lg 
        bg-gradient-to-r from-purple-500 to-indigo-600 
        hover:from-purple-600 hover:to-indigo-700 
        active:from-purple-700 active:to-indigo-800  
        transform hover:scale-[1.02] active:scale-[0.98]
        transition-all duration-200 ease-in-out
        border border-purple-400/20 text-white
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
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-indigo-500 opacity-20 group-hover:opacity-30 transition-opacity blur-sm" />

      <Image
        src="/images/PhantomIcon.png"
        alt="Phantom Wallet Icon"
        width={24}
        height={24}
        className="relative z-10 rounded"
      />

      <span className="relative z-10 text-lg font-semibold tracking-wide group-hover:translate-x-1 transition-transform">
        Phantom Wallet
      </span>
    </button>
  );
};

export default Wallet;
