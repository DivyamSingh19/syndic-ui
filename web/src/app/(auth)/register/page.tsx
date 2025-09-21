"use client";
import React from "react";
import RegisterForm from "@/components/ui/ui-elements/forms/RegisterForm";
import Logo from "@/components/ui/logo";

const Register = () => {
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
      <div className="lg:hidden h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pb-24 sm:pb-32 md:pb-40">
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 items-center">
          <div className="flex flex-col gap-1 sm:gap-1 md:gap-2 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Create an account
            </h1>
            <h4 className="text-xs sm:text-sm font-medium text-gray-400 px-2">
              Join thousands of users managing their finances with ease
            </h4>
          </div>
          <div className="w-full flex justify-center mt-1 sm:mt-2">
            <RegisterForm />
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col gap-4 items-center pt-8 px-8">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-5xl font-bold leading-tight">
            Create an account
          </h1>
          <h4 className="text-sm font-medium text-gray-400 px-2">
            Join thousands of users managing their finances with ease
          </h4>
        </div>
        <div className="w-full flex justify-center mt-2">
          <RegisterForm />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 flex items-center justify-center overflow-hidden pointer-events-none">
        <Logo className="select-none" size="responsive" />
      </div>
    </div>
  );
};

export default Register;
