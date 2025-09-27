"use client";
import React from "react";
import OtpForm from "@/components/ui-elements/forms/OtpForm";

const OTP = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold">Verify Account</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Enter the verification code sent to your device
            </p>
          </div>
          <OtpForm />
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/images/vo.png"
          alt="Image"
          width={500}
          height={300}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-start justify-center pt-20 text-center">
          <h1 className="text-5xl font-mono text-white drop-shadow-lg">
            Secure By Design
          </h1>
        </div>
      </div>
    </div>
  );
};

export default OTP;
