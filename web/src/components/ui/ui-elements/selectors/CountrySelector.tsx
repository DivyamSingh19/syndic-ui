import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countries = [
  { value: "ind", label: "India" },
  { value: "usa", label: "United States" },
  { value: "gbr", label: "United Kingdom" },
  { value: "can", label: "Canada" },
  { value: "aus", label: "Australia" },
  { value: "deu", label: "Germany" },
  { value: "fra", label: "France" },
  { value: "jpn", label: "Japan" },
  { value: "sgp", label: "Singapore" },
  { value: "are", label: "UAE" },
];

const CountrySelector = () => {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem value={country.value} key={country.value}>
            {country.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountrySelector;
