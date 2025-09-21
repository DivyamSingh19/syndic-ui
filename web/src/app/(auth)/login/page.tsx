"use client";
import React from "react";
import LoginForm from "@/components/ui/ui-elements/forms/LoginForm";
import Logo from "@/components/ui/logo";

const Login = () => {
  return (
    <div className="h-screen overflow-hidden relative">
      <div
        className="absolute top-0 right-0 pointer-events-none z-0"
        style={{
          width: "750px",
          height: "550px",
          background: `
      radial-gradient(ellipse at top right, rgba(255, 100, 40, 0.35) 0%, transparent 70%),
      radial-gradient(ellipse at 60% 30%, rgba(255, 140, 60, 0.22) 0%, transparent 85%)
    `,
          filter: "blur(95px)",
          transform: "translate(15%, -25%)",
          mixBlendMode: "screen",
        }}
      />
      <div className="h-full grid grid-rows-[1fr_auto] lg:grid-rows-1 lg:flex lg:flex-col">
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 items-center justify-center lg:justify-start lg:pt-16 xl:pt-20 px-4 sm:px-6 md:px-8">
          <div className="flex flex-col gap-1 sm:gap-1 md:gap-2 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Welcome Back!
            </h1>
            <h4 className="text-xs sm:text-sm font-medium text-gray-400 px-2">
              Let's get you signed in securely.
            </h4>
          </div>
          <div className="w-full flex justify-center mt-1 sm:mt-2">
            <LoginForm />
          </div>
        </div>

        <div className="lg:hidden"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 flex items-center justify-center overflow-hidden pointer-events-none">
        <Logo className="select-none" size="responsive" />
      </div>
    </div>
  );
};

export default Login;
