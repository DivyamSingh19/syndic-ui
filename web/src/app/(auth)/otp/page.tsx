"use client";
import React from "react";
import OtpForm from "@/components/ui/ui-elements/forms/OtpForm";
import AL from "@/components/layout/AuthLayout";

const OTP = () => {
  return (
    <AL>
      <div className="flex flex-col gap-4 items-center text-center">
        <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold  max-w-fit mx-auto whitespace-nowrap">
          Verify Account
        </h1>
        <h4 className="text-xs sm:text-sm font-medium text-muted-foreground px-2">
          Enter the verification code sent to your device
        </h4>
        <div className="w-full flex justify-center mt-2">
          <OtpForm />
        </div>
      </div>
    </AL>
  );
};

export default OTP;
