import React from "react";

interface Props {
  className?: string;
  size?: "default" | "large" | "massive" | "responsive";
}

const Logo = ({ className, size = "default" }: Props) => {
  const getSizeClass = () => {
    switch (size) {
      case "large":
        return "text-[8rem] sm:text-[12rem] md:text-[15rem]";
      case "massive":
        return "text-[10rem] sm:text-[15rem] md:text-[20rem]";
      case "responsive":
        return "text-[6rem] sm:text-[8rem] md:text-[12rem] lg:text-[15rem] xl:text-[18rem]";
      default:
        return "text-6xl sm:text-7xl md:text-8xl lg:text-9xl";
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
