"use client"
import React, { useState } from "react";
import RegisterForm from "@/components/ui/ui-elements/forms/RegisterForm";
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
const page = () => {
  const [pin, setPin] = useState("");

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      {/* <RegisterForm /> */}
      {/* <OtpForm/> */}
      {/* <Logo /> */}
      <CountrySelector />
      <FiatSelector />
      <CurrencySelector />
      <PlatformSelector />
      <Wallet />
      <Back />
      <BestRoute />
      <PlatformPin
        selectedPlatform="paypal"
        value={pin}
        onValueChange={setPin}
      />
      <PaymentSuccess
        amount="1,500"
        currency="₹"
        recipient="Test Store"
        onComplete={() => console.log("Success animation completed!")}
      />
    </div>
  );
};

export default page;
