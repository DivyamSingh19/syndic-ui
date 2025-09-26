import React from "react";
import { IconNavigationBolt } from "@tabler/icons-react";
import LoaderSpinner from "../LoaderSpinner";
import {cn} from "@/lib/utils"

interface Props {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const BestRoute: React.FC<Props> = ({
  onClick,
  className,
  disabled,
  isLoading,
}) => {
  return (
    // The <motion.button> in the parent component handles the animations,
    // so this can be a standard div or span if you prefer.
    <div
      className={cn(
        "flex items-center justify-center gap-2 font-semibold",
        (disabled || isLoading) && "opacity-50"
      )}
    >
      {isLoading ? (
        <LoaderSpinner message="Finding routes..." color="white" />
      ) : (
        <>
          <IconNavigationBolt size={22} />
          <span>Get Best Route</span>
        </>
      )}
    </div>
  );
};

export default BestRoute;
