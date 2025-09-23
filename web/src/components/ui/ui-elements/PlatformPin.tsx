"use client"
import React, { useState } from "react";
import { Eye, EyeOff, Shield, Lock } from "lucide-react";

const platformConfig = {
  plaid: { requiresPin: false, name: "Plaid" },
  razorpay: { requiresPin: true, name: "Razorpay" },
  phonepe: { requiresPin: true, name: "PhonePe" },
  paypal: { requiresPin: true, name: "PayPal" },
  wise: { requiresPin: false, name: "Wise (TransferWise)" },
  revolut: { requiresPin: true, name: "Revolut" },
  coinbase: { requiresPin: true, name: "Coinbase" },
  binance: { requiresPin: true, name: "Binance Pay" },
} as const;

type PlatformKey = keyof typeof platformConfig;

interface PlatformPinProps {
  selectedPlatform?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const PlatformPin = ({
  selectedPlatform,
  value,
  onValueChange,
  className,
}: PlatformPinProps) => {
  const [showPin, setShowPin] = useState(false);

  const platformData = selectedPlatform
    ? platformConfig[selectedPlatform as PlatformKey]
    : undefined;

  if (!selectedPlatform || !platformData) {
    return null;
  }

  if (!platformData.requiresPin) {
    return (
      <div
        className={`w-[280px] p-3 bg-green-50 border border-green-200 rounded-md ${
          className || ""
        }`}
      >
        <div className="flex items-center gap-2 text-green-800 text-sm">
          <Shield size={14} />
          <span className="font-medium">No PIN Required</span>
        </div>
        <p className="text-xs text-green-700 mt-1">
          {platformData.name} uses secure authentication
        </p>
      </div>
    );
  }

  return (
    <div className={`w-[280px] ${className || ""}`}>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <Shield size={16} className="text-orange-600" />
        {platformData.name} PIN
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-4 w-4 text-gray-400" />
        </div>

        <input
          type={showPin ? "text" : "password"}
          value={value || ""}
          onChange={(e) => onValueChange?.(e.target.value)}
          placeholder="Enter your PIN"
          maxLength={6}
          className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center tracking-widest"
        />

        <button
          type="button"
          onClick={() => setShowPin(!showPin)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div className="mt-1 text-xs text-gray-500">
        Required for {platformData.name} transactions
      </div>
    </div>
  );
};

export default PlatformPin;
