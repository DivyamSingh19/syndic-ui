//@ts-nocheck
"use client";
import React from "react";
import SelectorsCard from "@/components/ui-elements/selectors/SelectorsCard";

const Step1 = () => {
return (
  // This wrapper will stack and center the title and the card.
  <div className="flex flex-col items-center justify-center w-full h-full p-4">
    <SelectorsCard />
  </div>
);
};

export default Step1;
