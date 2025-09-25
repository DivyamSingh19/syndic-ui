import React from "react";

interface Props {
  size?: "small" | "default" | "large" | "massive" | "responsive";
  className?: string;
}

const Logo = ({ size = "default", className }: Props) => {
  const sizeStyles = {
    small: "text-[clamp(2rem,5vw,3rem)]",
    default: "text-[clamp(3rem,8vw,5rem)]",
    large: "text-[clamp(5rem,12vw,8rem)]",
    massive: "text-[clamp(6rem,15vw,12rem)]",
    responsive: "text-[clamp(2rem,10vw,12rem)]",
  };

  return (
    <div
      className={`
        font-anton
        leading-none
        flex justify-center items-center
        font-stretch-[150%] sm:font-stretch-[175%] md:font-stretch-[200%]
        ${sizeStyles[size]}
        ${className || ""}
      `}
    >
      SYNDIC
    </div>
  );
};

export default Logo;
