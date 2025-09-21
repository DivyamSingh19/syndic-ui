"use client";
import React from "react";
import RegisterForm from "@/components/ui/forms/RegisterForm";
import Logo from "@/components/ui/logo";

const Register = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col  relative">
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 items-center justify-start pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col gap-1 sm:gap-1 md:gap-2 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
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
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 flex items-center justify-center overflow-hidden pointer-events-none">
        <Logo className="select-none" size="responsive" />
      </div>
    </div>
  );
};

export default Register;
