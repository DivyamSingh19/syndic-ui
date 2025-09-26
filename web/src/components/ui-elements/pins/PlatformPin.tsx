"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
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
    toast.info("Authorizing transaction...");
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // MOCK SUCCESS
      toast.success("Transaction authorized successfully!");
      router.push("/dashboard/create-transaction/step-4");
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPin = () => {
    router.push("/reset-pin");
  };

  return (
    // The component is now just the card, without the full-screen wrapper.
    <div className="flex w-full max-w-sm flex-col items-center rounded-2xl bg-card/80 border border-border/50 p-8 shadow-2xl backdrop-blur-xl">
      <Shield size={48} className="mb-4 text-blue-500" />
      <h2 className="mb-2 text-2xl font-semibold text-foreground">
        Enter Your PIN
      </h2>
      <p className="mb-6 text-center text-sm text-muted-foreground">
        Authorize this payment with your secure {pinLength}-digit PIN.
      </p>

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

      <p className="mb-6 text-sm text-red-500">
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
  );
};

export default PlatformPin;
