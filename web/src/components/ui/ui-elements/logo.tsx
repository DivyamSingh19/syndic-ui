import React from "react";

interface Props {
  className?: string;
  // size?: "default" | "large" | "massive" | "responsive";
}

const Logo = ({ className }: Props) => {

  return (
    <div
      className={`font-league-gothic text-9xl w-full flex justify-center items-center ${
        className || ""
      }`}
    >
      SYNDIC
    </div>
  );
};

export default Logo;
