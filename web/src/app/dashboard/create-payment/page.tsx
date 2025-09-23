"use client";
import React from "react";
import CountrySelector from "@/components/ui/ui-elements/selectors/CountrySelector";
import CurrencySelector from "@/components/ui/ui-elements/selectors/CurrencySelector";
import FiatSelector from "@/components/ui/ui-elements/selectors/FiatSelector";
import PlatformSelector from "@/components/ui/ui-elements/selectors/PlatformSelector";
import BestRoute from "@/components/ui/ui-elements/buttons/bestroute";

const CreatePayment = () => {
  return (
    <div className="h-full p-6 space-y-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-6xl font-semibold">Create Payments</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details to initiate payment
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <CurrencySelector />
        <PlatformSelector />
        <CountrySelector />
        <FiatSelector />

        <BestRoute />
      </div>
    </div>
  );
};

export default CreatePayment;
