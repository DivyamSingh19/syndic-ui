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
        relative flex items-center gap-3 px-4 py-2.5 rounded-xl
        bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600
        hover:from-sky-400 hover:via-blue-500 hover:to-indigo-500
        active:from-sky-600 active:via-blue-700 active:to-indigo-700
        text-white font-medium shadow-md
        transition-all duration-200 ease-in-out
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className || ""}
      `}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {/* Glow overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-300/30 to-indigo-400/30 opacity-0 hover:opacity-100 transition-opacity blur-md" />

      {/* Wallet Icon */}
      <Image
        src="/images/PhantomIcon.png"
        alt="Phantom Wallet Icon"
        width={24}
        height={24}
        className="relative z-10"
      />

      {/* Text */}
      <span className="relative z-10 text-sm sm:text-base font-semibold tracking-wide">
        Phantom Wallet
      </span>
    </button>
  );
};

export default Wallet;
