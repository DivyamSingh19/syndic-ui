import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const currencies = [
  { value: "USDT", label: "USDT (Tether)" },
  { value: "USDC", label: "USDC (USD Coin)" },
  { value: "BTC", label: "BTC (Bitcoin)" },
  { value: "ETH", label: "ETH (Ethereum)" },
  { value: "BNB", label: "BNB (Binance Coin)" },
  { value: "BUSD", label: "BUSD (Binance USD)" },
];


interface CurrencySelectorProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
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
        {currencies.map((c) => (
          <SelectItem
            key={c.value}
            value={c.value}
            className="focus:bg-blue-500 focus:text-white"
          >
            {c.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};


export default CurrencySelector