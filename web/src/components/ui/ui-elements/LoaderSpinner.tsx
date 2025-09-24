import { FC } from "react";
import { clsx } from "clsx";

export type LoaderSpinnerProps = {
  message?: string;
  color?: "green-500" | "blue-500" | "gray-500" | "red-500" | "white";
};

const LoaderSpinner: FC<LoaderSpinnerProps> = ({
  message = "Loading...",
  color = "gray-500",
}) => {
  const colorClass = color === "white" ? "text-white" : `text-${color}`;

  return (
    <div className="flex items-center">
      <svg
        className={clsx("animate-spin -ml-1 mr-3 h-5 w-5", colorClass)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default LoaderSpinner;
