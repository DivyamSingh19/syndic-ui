import React from "react";
import { IconNavigationBolt } from "@tabler/icons-react";
import LoaderSpinner from "../LoaderSpinner";
interface Props {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const BestRoute = ({ onClick, className, disabled, isLoading }: Props) => {
  return (
    <button
      className={`
        group relative flex items-center justify-center gap-2 px-6 py-3 
        bg-orange-600 hover:bg-orange-700 text-white 
        rounded-lg font-medium 
        transform hover:scale-[1.02] active:scale-[0.98]
        transition-all duration-200 ease-in-out
        border border-blue-400/20
        min-w-[200px] min-h-[48px]
        ${
          disabled || isLoading
            ? "opacity-50 cursor-not-allowed hover:scale-100 hover:bg-orange-600"
            : "cursor-pointer"
        }
        ${className || ""}
      `}
      onClick={disabled || isLoading ? undefined : onClick}
      disabled={disabled || isLoading}
    >
      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-orange-300 to-orange-600 opacity-20 group-hover:opacity-30 transition-opacity blur-sm" />

      {isLoading ? (
        <LoaderSpinner message="Finding routes..." color="white" />
      ) : (
        <>
          <IconNavigationBolt
            size={20}
            className="group-hover:translate-y-1 transition-transform"
          />
          <span className="font-semibold group-hover:translate-y-1 transition-transform">
            Get Best Route
          </span>
        </>
      )}
    </button>
  );
};

export default BestRoute