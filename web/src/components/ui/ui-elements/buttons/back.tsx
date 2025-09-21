import React from "react";
import { ChevronLeft } from "lucide-react";

interface BackProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Back = ({ onClick, className, disabled }: BackProps) => {
  return (
    <button
      className={`
        flex items-center gap-2 px-3 py-2 
        text-gray-600 hover:text-gray-800
        hover:bg-gray-100 rounded-lg
        transition-colors duration-200
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className || ""}
      `}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <ChevronLeft size={20} />
      <span className="font-medium">Back</span>
    </button>
  );
};

export default Back;
