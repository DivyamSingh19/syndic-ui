"use client";
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { Shield } from "lucide-react";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PlatformPinProps {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  pinLength?: number;
  attemptsRemaining?: number;
  onForgotPin?: () => void;
}

const PlatformPin = ({
  value,
  onValueChange,
  className,
  pinLength = 6,
  attemptsRemaining = 3,
  onForgotPin,
}: PlatformPinProps) => {
  const router = useRouter();
  const [internalPin, setInternalPin] = useState<string[]>(
    Array(pinLength).fill("")
  );
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  
  useEffect(() => {
    if (value && value.length === pinLength) {
      setInternalPin(value.split(""));
    }
  }, [value, pinLength]);

  const updatePin = (newPin: string[]) => {
    setInternalPin(newPin);
    onValueChange?.(newPin.join(""));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) {
      updatePin([
        ...internalPin.slice(0, index),
        "",
        ...internalPin.slice(index + 1),
      ]);
      return;
    }

    const chars = val.split("").slice(0, pinLength - index);
    const newPin = [...internalPin];
    chars.forEach((c, i) => {
      newPin[index + i] = c;
    });

    updatePin(newPin);

    const nextIndex = index + chars.length;
    if (nextIndex < pinLength) {
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (internalPin[index]) {
        const newPin = [...internalPin];
        newPin[index] = "";
        updatePin(newPin);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < pinLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    inputRefs.current[index]?.select();
  };

  const fullPin = internalPin.join("");
  const isPinComplete = internalPin.every((digit) => digit !== "");

  const handleAuthorizeTransaction = async () => {
    if (!isPinComplete) {
      toast.error("Please enter a complete PIN.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pin: fullPin,
          // Add other transaction data here, like amount, recipient, etc.
        }),
      });

      if (response.ok) {
        // Transaction successful
        const result = await response.json();
        toast.success("Transaction authorized successfully!");
        // Navigate to step 4 with success status
        // router.push(`/step4?status=success&transactionId=${result.id}`);
        router.push("/dashboard/create-transaction/step-4")
      } else {
        // Transaction failed
        const errorData = await response.json();
        toast.error(errorData.message || "Transaction failed.");
        // Navigate to step 4 with failure status
        // router.push(
        //   `/step4?status=failed&error=${encodeURIComponent(errorData.message)}`
        // );
          router.push("/dashboard/create-transaction/step-4");
      }
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error("An unexpected error occurred. Please try again.");
      // Navigate to step 4 with a generic error status
      // router.push(
      //   `/step4?status=failed&error=${encodeURIComponent("Network Error")}`
      // );
        router.push("/dashboard/create-transaction/step-4");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 bg-background shadow-lg rounded-lg max-w-sm mx-auto ${
        className || ""
      }`}
    >
      <Shield size={48} className="text-indigo-600 mb-4" />
      <h2 className="text-xl font-semibold text-gray-100 mb-2">
        Enter your Platform PIN
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Enter your {pinLength}-digit PIN to authorize this payment.
      </p>
      <div className="flex space-x-2 mb-6">
        {internalPin.map((digit, index) => (
          <input
            key={index}
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1} 
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => handleFocus(index)}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className="w-10 h-10 text-center text-lg font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            autoComplete="off"
            aria-label={`Digit ${index + 1} of ${pinLength}`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500 mb-6">
        You have {attemptsRemaining} attempts remaining.
      </p>
      <Button
        onClick={handleAuthorizeTransaction}
        disabled={!isPinComplete || attemptsRemaining <= 0 || isLoading}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-md transition-colors"
      >
        {isLoading ? "Authorizing..." : "Authorize Transaction"}
      </Button>
      <button
        onClick={onForgotPin}
        className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
      >
        Forgot PIN?
      </button>
    </div>
  );
};

export default PlatformPin;
