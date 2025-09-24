"use client";
import React, { useState } from "react";
import OtpForm from "@/components/ui/ui-elements/forms/OtpForm";
import Logo from "@/components/ui/ui-elements/logo";
import CountrySelector from "@/components/ui/ui-elements/selectors/CountrySelector";
import FiatSelector from "@/components/ui/ui-elements/selectors/FiatSelector";
import PlatformSelector from "@/components/ui/ui-elements/selectors/PlatformSelector";
import CurrencySelector from "@/components/ui/ui-elements/selectors/CurrencySelector";
import Wallet from "@/components/ui/ui-elements/buttons/wallet";
import Back from "@/components/ui/ui-elements/buttons/back";
import BestRoute from "@/components/ui/ui-elements/buttons/bestroute";
import PlatformPin from "@/components/ui/ui-elements/PlatformPin";
import PaymentSuccess from "@/components/ui/ui-elements/Success";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import PhoneCodeSelector from "@/components/ui/ui-elements/selectors/PhoneCodeSelector";
import EditProfileForm from "@/components/ui/ui-elements/forms/EditProfileForm";
import Retry from "@/components/ui/ui-elements/buttons/retry";
import InitializePayment from "@/components/ui/ui-elements/buttons/initializeTransaction";
import SetupPin from "@/components/ui/ui-elements/SetupPin";
import LocationForm from "@/components/ui/ui-elements/forms/LocationForm";
import { RegisterForm } from "@/components/ui/ui-elements/forms/RegisterForm";

const page = () => {
  // const [pin, setPin] = useState("  ");

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <RegisterForm />

      {/* <LocationForm/> */}
      {/* <SetupPin/> */}
      {/* <InitializePayment/>
      <Retry/> */}
      {/* <RegisterForm />
      <OtpForm />
      <Logo /> */}
      {/* <EditProfileForm/> */}

      {/* <div className="flex justify-center gap-3">
        <CountrySelector />
        <FiatSelector />
        <CurrencySelector />

        <PhoneCodeSelector />
      </div> */}
      {/* 
      <Wallet />
      <Back />
      <BestRoute />
      <PlatformSelector /> */}
      {/* <PlatformPin/> */}
      {/* <PaymentSuccess
        amount="1,500"
        currency="₹"
        recipient="Test Store"
        onComplete={() => console.log("Success animation completed!")}
      /> */}
      {/* <SidebarProvider>
        <AppSidebar />
      </SidebarProvider> */}
    </div>
  );
};

export default page;
