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
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedFiatSymbol =
    fiats.find((f) => f.value === (value ?? defaultValue))?.label ||
    "Select Fiat";

  const filteredFiats = useMemo(() => {
    return fiats.filter((fiat) =>
      fiat.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSelect = (fiatValue: string) => {
    if (onValueChange) {
      onValueChange(fiatValue);
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
          {selectedFiatSymbol}
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card/90 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle>Select a Fiat Currency</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Search fiat currency..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-background/50 border-border/50"
        />
        <ScrollArea className="h-[300px] mt-4">
          <div className="flex flex-col gap-1 pr-2">
            {filteredFiats.map((fiat) => (
              <Button
                key={fiat.value}
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => handleSelect(fiat.value)}
              >
                {fiat.label}
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
    //     {fiats.map((fiat) => (
    //       <SelectItem
    //         value={fiat.value}
    //         key={fiat.value}
    //         className="focus:bg-blue-500 focus:text-white"
    //       >
    //         {fiat.label}
    //       </SelectItem>
    //     ))}
    //   </SelectContent>
    // </Select>
  );
};

export default FiatSelector;
