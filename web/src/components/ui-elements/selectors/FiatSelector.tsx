import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fiats = [
  { value: "inr", label: "INR (Indian Rupee)" },
  { value: "usd", label: "USD (US Dollar)" },
  { value: "eur", label: "EUR (Euro)" },
  { value: "gbp", label: "GBP (British Pound)" },
  { value: "cad", label: "CAD (Canadian Dollar)" },
  { value: "aud", label: "AUD (Australian Dollar)" },
  { value: "jpy", label: "JPY (Japanese Yen)" },
  { value: "sgd", label: "SGD (Singapore Dollar)" },
  { value: "aed", label: "AED (UAE Dirham)" },
];


interface FiatSelectorProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const FiatSelector: React.FC<FiatSelectorProps> = ({
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
        {fiats.map((fiat) => (
          <SelectItem
            value={fiat.value}
            key={fiat.value}
            className="focus:bg-blue-500 focus:text-white"
          >
            {fiat.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FiatSelector