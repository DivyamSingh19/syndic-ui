"use client";
import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "../button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SetupPinProps {
  pinLength?: number;
  onPinCreated?: (pin: string) => void;
  className?: string;
}

const SetupPin = ({
  pinLength = 6,
  onPinCreated,
  className,
}: SetupPinProps) => {
  const router = useRouter();

  const [createPin, setCreatePin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showCreatePin, setShowCreatePin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const numericValue = e.target.value.replace(/\D/g, "").slice(0, pinLength);
    setter(numericValue);
    setError(null);
  };

  const handleCreatePin = async () => {
    if (createPin.length !== pinLength) {
      setError(`Please create a ${pinLength}-digit PIN.`);
      return;
    }
    if (confirmPin.length !== pinLength) {
      setError(`Please confirm your ${pinLength}-digit PIN.`);
      return;
    }
    if (createPin !== confirmPin) {
      setError("PINs do not match. Please try again.");
      return;
    }

    // You can add your API call here to save the new PIN
    // const response = await fetch('/api/set-pin', { ... });
    // if (!response.ok) {
    //   setError('Failed to set PIN. Please try again.');
    //   return;
    // }

    setError(null);
    onPinCreated?.(createPin);

    toast.success("PIN created successfully!");
    router.push("/dashboard");
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 bg-background shadow-lg rounded-lg max-w-sm mx-auto ${
        className || ""
      }`}
    >
      {/* Icon and Header */}
      <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
        <Lock size={24} className="text-indigo-600" />
      </div>

      <h2 className="text-xl font-semibold text-gray-100 mb-2">
        Set Up Your PIN
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6 max-w-xs">
        Your PIN adds an extra layer of security to your account.
      </p>

      {/* Create PIN Input */}
      <div className="w-full relative mb-4">
        <label
          htmlFor="create-pin"
          className="block text-sm font-medium text-gray-100 mb-2"
        >
          Create a {pinLength}-digit PIN
        </label>
        <div className="relative flex items-center">
          <input
            id="create-pin"
            type={showCreatePin ? "text" : "password"}
            value={createPin}
            onChange={(e) => handleInputChange(e, setCreatePin)}
            placeholder="Enter PIN"
            maxLength={pinLength}
            className="w-full rounded-lg border border-gray-300 py-3 pl-4 pr-12 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none bg-transparent"
          />
          <span
            className="absolute right-4 flex cursor-pointer items-center"
            onClick={() => setShowCreatePin(!showCreatePin)}
          >
            {showCreatePin ? (
              <EyeOff size={20} className="text-gray-500" />
            ) : (
              <Eye size={20} className="text-gray-500" />
            )}
          </span>
        </div>
      </div>

      {/* Confirm PIN Input */}
      <div className="w-full relative mb-6">
        <label
          htmlFor="confirm-pin"
          className="block text-sm font-medium text-gray-100 mb-2"
        >
          Confirm PIN
        </label>
        <div className="relative flex items-center">
          <input
            id="confirm-pin"
            type={showConfirmPin ? "text" : "password"}
            value={confirmPin}
            onChange={(e) => handleInputChange(e, setConfirmPin)}
            placeholder="Confirm PIN"
            maxLength={pinLength}
            className="w-full rounded-lg border border-gray-300 py-3 pl-4 pr-12 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none bg-transparent"
          />
          <span
            className="absolute right-4 flex cursor-pointer items-center"
            onClick={() => setShowConfirmPin(!showConfirmPin)}
          >
            {showConfirmPin ? (
              <EyeOff size={20} className="text-gray-500" />
            ) : (
              <Eye size={20} className="text-gray-500" />
            )}
          </span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
      )}

      {/* Button */}
      <Button
        onClick={handleCreatePin}
        disabled={
          createPin.length !== pinLength || confirmPin.length !== pinLength
        }
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded-md transition-colors"
      >
        Create PIN
      </Button>

      <p className="text-xs text-gray-500 text-center mt-6 max-w-xs">
        This PIN will be used to authorize important actions on your account.
      </p>
    </div>
  );
};

export default SetupPin;
