"use client";
import React from "react";
import OtpForm from "@/components/ui/ui-elements/forms/OtpForm";
import Logo from "@/components/ui/logo";

const OTP = () => {
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
        <div className="lg:hidden"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 flex items-center justify-center overflow-hidden pointer-events-none">
        <Logo className="select-none" size="responsive" />
      </div>
    </div>
  );
};

export default OTP;
