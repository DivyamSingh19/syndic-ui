"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Back = ({ onClick, className, disabled }: BackProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
    else router.back();
  };

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-md hover:text-black
        hover:bg-gray-100 transition-colors duration-200
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className || ""}
      `}
    >
      <ChevronLeft size={20} />
      <span className="font-medium">Back</span>
    </div>
  );
};

export default Back;
