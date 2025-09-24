"use client";
import React from "react";
import OtpForm from "@/components/ui/ui-elements/forms/OtpForm";

const OTP = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:gap-6 items-center text-center max-w-md w-full">
        <h1 className="font-inter text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Verify Account
        </h1>
        <p className="font-inter text-muted-foreground text-sm sm:text-base text-balance max-w-sm">
          Enter the verification code sent to your device
        </p>
        <div className="w-full flex justify-center mt-2 sm:mt-4">
          <OtpForm />
        </div>
      </div>
    </div>
  );
};

export default OTP;
