import React from "react";

interface Props {
  className?: string;
  size?: "default" | "large" | "massive" | "responsive";
}

const Logo = ({ className, size = "default" }: Props) => {
  const getSizeClass = () => {
    switch (size) {
      case "large":
        return "text-[6rem] sm:text-[8rem] md:text-[10rem]";
      case "massive":
        return "text-[8rem] sm:text-[10rem] md:text-[12rem]";
      case "responsive":
        return "text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[10rem] xl:text-[14rem]";
      default:
        return "text-4xl sm:text-5xl md:text-6xl lg:text-7xl";
    }
  };

  return (
    <div
      className={`font-league-gothic ${getSizeClass()} font-semibold leading-none tracking-tight whitespace-nowrap ${
        className || ""
      }`}
    >
      SYNDIC
    </div>
  );
};

export default Logo;
