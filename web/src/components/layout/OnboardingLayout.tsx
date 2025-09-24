import React, { ReactNode } from "react";

interface OnboardingLayoutProps {
  children: ReactNode;
}

const OL: React.FC<OnboardingLayoutProps> = ({ children }) => {
  return (
    <div className="relative w-screen h-screen flex flex-col justify-between overflow-hidden">
      <main className="relative z-10 flex flex-1 items-center justify-center px-6">
        <div className="w-full  p-6 ">{children}</div>
      </main>
    </div>
  );
};

export default OL;
