"use client";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedCurrencyLabel =
    currencies.find((c) => c.value === (value ?? defaultValue))?.label ||
    "Select Currency";

  const filteredCurrencies = useMemo(() => {
    return currencies.filter((c) =>
      c.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSelect = (currencyValue: string) => {
    if (onValueChange) {
      onValueChange(currencyValue);
    }
    setIsOpen(false);
    setSearchTerm("");
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-auto inline-flex items-center gap-2 bg-[#0D0D0D] border-2 border-white/10 text-white font-semibold rounded-xl px-3 py-2 h-auto focus:ring-0 focus:ring-offset-0"
          disabled={disabled}
        >
          <span>{selectedCurrencyLabel}</span>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card/90 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle>Select a Currency</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Search currency or symbol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-background/50 border-border/50"
        />
        <ScrollArea className="h-[300px] mt-4">
          <div className="flex flex-col gap-1 pr-2">
            {filteredCurrencies.map((currency) => (
              <Button
                key={currency.value}
                variant="ghost"
                className="w-full justify-start text-left h-auto py-2"
                onClick={() => handleSelect(currency.value)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">{currency.label}</span>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
    // <Select
    //   value={value}
    //   defaultValue={defaultValue}
    //   onValueChange={onValueChange}
    //   disabled={disabled}
    // >
    //   <SelectTrigger className="w-auto inline-flex items-center gap-2 bg-[#0D0D0D] border-2 border-white/10 text-white font-semibold rounded-xl px-3 py-2 h-auto focus:ring-0 focus:ring-offset-0">
    //     <SelectValue placeholder="Select" />

    //   </SelectTrigger>
    //   <SelectContent className="bg-[#1C1C1E] text-white border-white/20">
    //     {currencies.map((c) => (
    //       <SelectItem
    //         key={c.value}
    //         value={c.value}
    //         className="focus:bg-blue-500 focus:text-white"
    //       >
    //         {c.label}
    //       </SelectItem>
    //     ))}
    //   </SelectContent>
    // </Select>
  );
};

export default CurrencySelector;
