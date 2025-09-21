"use client";
import React from "react";
import OtpForm from "@/components/ui/forms/OtpForm";
import Logo from "@/components/ui/logo";

const OTP = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col relative">
      <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 items-center justify-start pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24">
        <div className="flex flex-col gap-1 sm:gap-1 md:gap-2 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Verify Your Account
          </h1>
          <p className="text-xs sm:text-sm font-medium text-gray-400 px-2">
            Enter the verification code sent to your device
          </p>
        </div>
        <div className="w-full flex justify-center mt-1 sm:mt-2">
          <OtpForm />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 flex items-center justify-center overflow-hidden pointer-events-none">
        <Logo className="select-none" size="responsive" />
      </div>
    </div>
  );
};

export default OTP;
