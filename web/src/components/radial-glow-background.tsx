"use client"
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
  className?: string;
}

const Gradient = ({ className }: Props) => {
  const [count, setCount] = useState(0);

  return (
    <div
      className={`min-h-screen w-full bg-[#b9592d] relative ${className || ""}`}
    >
      {/* Dark Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)`,
        }}
      />
      {/* Your Content/Components */}
    </div>
  );
};

export default Gradient;
