import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const platforms = [
  { value: "plaid", label: "Plaid" },
  { value: "razorpay", label: "Razorpay" },
  { value: "phonepe", label: "PhonePe" },
  { value: "paypal", label: "PayPal" },
  { value: "wise", label: "Wise (TransferWise)" },
  { value: "revolut", label: "Revolut" },
  { value: "coinbase", label: "Coinbase" },
  { value: "binance", label: "Binance Pay" },
];


interface PlatformSelectorProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  value,
  defaultValue,
  onValueChange,
  disabled,
}) => {
  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-auto inline-flex items-center gap-2 bg-[#0D0D0D] border-2 border-white/10 text-white font-semibold rounded-xl px-3 py-2 h-auto focus:ring-0 focus:ring-offset-0">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="bg-[#1C1C1E] text-white border-white/20">
        {platforms.map((platform) => (
          <SelectItem
            value={platform.value}
            key={platform.value}
            className="focus:bg-blue-500 focus:text-white"
          >
            {platform.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PlatformSelector;
