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
const PlatformSelector = () => {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select Platform" />
      </SelectTrigger>
      <SelectContent side="bottom">
        {platforms.map((platform) => (
          <SelectItem value={platform.value} key={platform.value}>
            {platform.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PlatformSelector;
