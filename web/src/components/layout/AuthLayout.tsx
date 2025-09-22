import React, { ReactNode } from "react";
import Logo from "../ui/ui-elements/logo";
import Gradient from "../ui/ui-elements/gradient";

interface AuthLayoutProps {
  children: ReactNode;
}

const AL: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="relative w-screen h-screen flex flex-col justify-between bg-[#160f0d] overflow-hidden">
      <Gradient />
      <main className="relative z-10 flex flex-1 items-center justify-center px-6">
        <div className="w-full  p-6 ">{children}</div>
      </main>
      <footer className="relative z-10 flex justify-center pb-8">
        <Logo size="responsive" className="text-white" />
      </footer>
    </div>
  );
};

export default AL;
