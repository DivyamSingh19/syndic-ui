//@ts-nocheck
"use client";
import React from "react";
import PlatformPin from "@/components/ui-elements/pins/PlatformPin";

const Step3 = () => {
  return (
    // This wrapper takes up the full available space and centers the component.
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      
      <PlatformPin />
    </div>
  );
};

export default Step3;