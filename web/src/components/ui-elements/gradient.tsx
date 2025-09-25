import React from "react";

const Gradient = () => {
  return (
    <div>
      <div
        className="absolute top-0 right-0 pointer-events-none z-0"
        style={{
          width: "1550px",
          height: "650px",
          background: `
      radial-gradient(ellipse at top right, rgba(255, 100, 40, 0.35) 0%, transparent 70%),
      radial-gradient(ellipse at 60% 30%, rgba(255, 140, 60, 0.22) 0%, transparent 85%)
    `,
          filter: "blur(95px)",
          transform: "translate(15%, -25%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
};

export default Gradient;
