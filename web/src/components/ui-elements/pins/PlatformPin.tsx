"use client";
import React, { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PlatformPinProps {
  pinLength?: number;
  attemptsRemaining?: number;
}

const PlatformPin = ({
  pinLength = 6,
  attemptsRemaining = 3,
}: PlatformPinProps) => {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "").slice(0, pinLength);
    setPin(numericValue);
  };

  const handleAuthorizeTransaction = async () => {
    if (pin.length !== pinLength) {
      toast.error(`Please enter a complete ${pinLength}-digit PIN.`);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/authorize-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pin: pin,
        }),
      });

      if (response.ok) {
        toast.success("Transaction authorized successfully!");
        router.push("/dashboard/create-transaction/step-4");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Transaction failed.");
        router.push("/dashboard/create-transaction/step-4");
      }
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error("An unexpected error occurred. Please try again.");
      router.push("/dashboard/create-transaction/step-4");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPin = () => {
    router.push("/resetPin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <div className="flex w-full max-w-sm flex-col items-center rounded-lg bg-background p-8 shadow-lg">
        <Shield size={48} className="mb-4 text-indigo-600" />
        <h2 className="mb-2 text-2xl font-semibold text-gray-100">
          Enter Your Platform PIN
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          Enter your {pinLength}-digit PIN to authorize this payment.
        </p>

        {/* PIN Input with Eye Icon */}
        <div className="relative flex w-full items-center mb-6">
          <input
            type={showPin ? "text" : "password"}
            value={pin}
            onChange={handleInputChange}
            placeholder="Enter PIN"
            maxLength={pinLength}
            className="w-full rounded-lg border border-gray-300 py-2 pl-4 pr-12 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:outline-none bg-background text-gray-100"
            autoComplete="off"
          />
          <span
            className="absolute right-4 flex cursor-pointer items-center"
            onClick={() => setShowPin(!showPin)}
          >
            {showPin ? (
              <EyeOff size={20} className="text-gray-500" />
            ) : (
              <Eye size={20} className="text-gray-500" />
            )}
          </span>
        </div>

        <p className="mb-6 text-sm text-gray-500">
          You have {attemptsRemaining} attempts remaining.
        </p>

        <Button
          onClick={handleAuthorizeTransaction}
          disabled={
            pin.length !== pinLength || attemptsRemaining <= 0 || isLoading
          }
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-md transition-colors"
        >
          {isLoading ? "Authorizing..." : "Authorize Transaction"}
        </Button>
        <button
          onClick={handleForgotPin}
          className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
        >
          Forgot PIN?
        </button>
      </div>
    </div>
  );
};

export default PlatformPin;
