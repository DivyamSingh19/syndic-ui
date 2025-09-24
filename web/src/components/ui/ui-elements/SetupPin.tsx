"use client";
import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
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

  const [createPin, setCreatePin] = useState<string[]>(
    Array(pinLength).fill("")
  );
  const [confirmPin, setConfirmPin] = useState<string[]>(
    Array(pinLength).fill("")
  );
  const [showCreatePin, setShowCreatePin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPinRefs = useRef<(HTMLInputElement | null)[]>([]);
  const confirmPinRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePinChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    pinState: string[],
    setPinState: React.Dispatch<React.SetStateAction<string[]>>,
    refs: React.MutableRefObject<(HTMLInputElement | null)[]>
  ) => {
    const val = e.target.value.replace(/\D/g, "");
    const newPin = [...pinState];
    if (val.match(/^[0-9]$/) || val === "") {
      newPin[index] = val;
      setPinState(newPin);
      setError(null);

      if (val !== "" && index < pinLength - 1) {
        refs.current[index + 1]?.focus();
      }
    }
  };

  const handlePinKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number,
    pinState: string[],
    refs: React.MutableRefObject<(HTMLInputElement | null)[]>
  ) => {
    if (e.key === "Backspace" && pinState[index] === "" && index > 0) {
      refs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      refs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < pinLength - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleCreatePin = () => {
    const newPin = createPin.join("");
    const confirmedPin = confirmPin.join("");

    if (newPin.length !== pinLength) {
      setError(`Please create a ${pinLength}-digit PIN.`);
      return;
    }
    if (confirmedPin.length !== pinLength) {
      setError(`Please confirm your ${pinLength}-digit PIN.`);
      return;
    }
    if (newPin !== confirmedPin) {
      setError("PINs do not match. Please try again.");
      return;
    }

    setError(null);
    onPinCreated?.(newPin);

    // Show success toast before redirecting
    toast.success("PIN created successfully!");

    // Redirect to the dashboard page
    router.push("/dashboard");
  };

  const renderPinInputs = (
    pinState: string[],
    setPinState: React.Dispatch<React.SetStateAction<string[]>>,
    refs: React.MutableRefObject<(HTMLInputElement | null)[]>,
    showPin: boolean,
    toggleShowPin: () => void,
    label: string
  ) => (
    <div className="w-full mb-6">
      <label className="block text-sm font-medium text-gray-100 mb-2">
        {label}
      </label>
      <div className="flex items-center justify-between space-x-3">
        {/* Inputs */}
        <div className="flex space-x-2">
          {pinState.map((digit, index) => (
            <input
              key={index}
              type={showPin ? "text" : "password"}
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handlePinChange(e, index, pinState, setPinState, refs)
              }
              onKeyDown={(e) => handlePinKeyDown(e, index, pinState, refs)}
              onFocus={(e) => e.target.select()}
              ref={(el) => {
                refs.current[index] = el;
              }}
              className="w-10 h-10 text-center text-lg font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-background text-gray-100"
              autoComplete="new-password"
            />
          ))}
        </div>

        {/* Eye icon */}
        <button
          type="button"
          onClick={toggleShowPin}
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label={showPin ? "Hide PIN" : "Show PIN"}
        >
          {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );

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

      {/* Create PIN */}
      {renderPinInputs(
        createPin,
        setCreatePin,
        createPinRefs,
        showCreatePin,
        () => setShowCreatePin(!showCreatePin),
        `Create a ${pinLength}-digit PIN`
      )}

      {/* Confirm PIN */}
      {renderPinInputs(
        confirmPin,
        setConfirmPin,
        confirmPinRefs,
        showConfirmPin,
        () => setShowConfirmPin(!showConfirmPin),
        "Confirm PIN"
      )}

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
      )}

      {/* Button */}
      <Button
        onClick={handleCreatePin}
        disabled={
          createPin.join("").length !== pinLength ||
          confirmPin.join("").length !== pinLength
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
