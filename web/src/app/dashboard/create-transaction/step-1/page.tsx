//@ts-nocheck
"use client";
import React, { useState } from "react";
import CountrySelector from "@/components/ui/ui-elements/selectors/CountrySelector";
import CurrencySelector from "@/components/ui/ui-elements/selectors/CurrencySelector";
import FiatSelector from "@/components/ui/ui-elements/selectors/FiatSelector";
import PlatformSelector from "@/components/ui/ui-elements/selectors/PlatformSelector";
import BestRoute from "@/components/ui/ui-elements/buttons/bestroute";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Step1 = () => {
  const router = useRouter(); 
  const [isLoading, setIsLoading] = useState(false);

  const handleBestRoute = async () => {
    try {
      setIsLoading(true);
      // const response = await optimizer({currency,platform,country,receiverCurrency});
      // const data = response.data;
      toast.success("Transaction info submitted successfully!");
      router.push("/dashboard/create-transaction/step-2");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error getting the best route"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full p-6 flex flex-col">
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-6xl font-semibold">Create Transactions</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details to initiate transaction
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-8">
        <CurrencySelector />
        <PlatformSelector />
        <CountrySelector />
        <FiatSelector />
        <BestRoute onClick={handleBestRoute} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Step1;
