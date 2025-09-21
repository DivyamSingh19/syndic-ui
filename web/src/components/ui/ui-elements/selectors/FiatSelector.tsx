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
const FiatSelector = () => {
  return (
     <Select>
         <SelectTrigger className="w-[280px]">
           <SelectValue placeholder="Select receiver's form of currency" />
         </SelectTrigger>
         <SelectContent>
           {fiats.map((fiat) => (
             <SelectItem value={fiat.value} key={fiat.value}>
               {fiat.label}
             </SelectItem>
           ))}
         </SelectContent>
       </Select>
  )
}

export default FiatSelector