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

const CurrencySelector = () => {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select Currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem value={currency.value} key={currency.value}>
            {currency.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CurrencySelector