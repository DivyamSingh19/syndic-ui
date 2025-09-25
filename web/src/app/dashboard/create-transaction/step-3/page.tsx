//@ts-nocheck
"use client";
import React from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PlatformPin from "@/components/ui-elements/pins/PlatformPin";

const Step3 = () => {
  const router = useRouter();
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <PlatformPin />
    </div>
  );
};

export default Step3;
