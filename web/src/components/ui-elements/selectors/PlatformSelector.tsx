"use client"
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
   const [isOpen, setIsOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");

   const selectedPlatformLabel =
     platforms.find((p) => p.value === (value ?? defaultValue))?.label ||
     "Select Platform";

   const filteredPlatforms = useMemo(() => {
     return platforms.filter((platform) =>
       platform.label.toLowerCase().includes(searchTerm.toLowerCase())
     );
   }, [searchTerm]);

   const handleSelect = (platformValue: string) => {
     if (onValueChange) {
       onValueChange(platformValue);
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
          {selectedPlatformLabel}
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card/90 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle>Select a Platform</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Search platforms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-background/50 border-border/50"
        />
        <ScrollArea className="h-[300px] mt-4">
          <div className="flex flex-col gap-1 pr-2">
            {filteredPlatforms.map((platform) => (
              <Button
                key={platform.value}
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => handleSelect(platform.value)}
              >
                {platform.label}
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
    //     {platforms.map((platform) => (
    //       <SelectItem
    //         value={platform.value}
    //         key={platform.value}
    //         className="focus:bg-blue-500 focus:text-white"
    //       >
    //         {platform.label}
    //       </SelectItem>
    //     ))}
    //   </SelectContent>
    // </Select>
  );
};

export default PlatformSelector;
