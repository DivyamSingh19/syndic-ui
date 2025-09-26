"use client";
import React, { useState } from "react";
import OtpForm from "@/components/ui-elements/forms/OtpForm";
import Logo from "@/components/ui-elements/logo";
import CountrySelector from "@/components/ui-elements/selectors/CountrySelector";
import FiatSelector from "@/components/ui-elements/selectors/FiatSelector";
import PlatformSelector from "@/components/ui-elements/selectors/PlatformSelector";
import CurrencySelector from "@/components/ui-elements/selectors/CurrencySelector";
import Wallet from "@/components/ui-elements/buttons/wallet";
import Back from "@/components/ui-elements/buttons/back";
import BestRoute from "@/components/ui-elements/buttons/bestroute";
import PlatformPin from "@/components/ui-elements/pins/PlatformPin";
import PaymentSuccess from "@/components/ui-elements/Success";
import { AppSidebar } from "@/components/ui-elements/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import PhoneCodeSelector from "@/components/ui-elements/selectors/PhoneCodeSelector";
import EditProfileForm from "@/components/ui-elements/forms/EditProfileForm";
import Retry from "@/components/ui-elements/buttons/retry";
import InitializePayment from "@/components/ui-elements/buttons/initializeTransaction";
import SetupPin from "@/components/ui-elements/pins/SetupPin";
import LocationForm from "@/components/ui-elements/forms/LocationForm";
import { RegisterForm } from "@/components/ui-elements/forms/RegisterForm";
import ResetPin from "@/components/ui-elements/pins/ResetPlatformPin";
// import Navbar from "@/components/ui/ui-elements/landing/navbar";
import Footer from "@/components/ui-elements/landing/footer";
// import {
//   Navbar,
//   NavBody,
//   NavItems,
//   NavbarLogo,
//   NavbarButton,
//   MobileNav,
//   MobileNavHeader,
//   MobileNavMenu,
//   MobileNavToggle,
// } from "@/components/ui/resizable-navbar";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Home, Settings, User } from "lucide-react";
import { Globe } from "@/components/magic-ui/globe";
import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";
import Features from "@/components/ui-elements/landing/features";
import { AboutSection } from "@/components/ui-elements/landing/about";

const page = () => {
  // const [pin, setPin] = useState("  ");
  const navItems = [
    { name: "Home", url: "#", icon: Home },
    { name: "Profile", url: "#", icon: User },
    { name: "Settings", url: "#", icon: Settings },
  ];
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <AboutSection/>
      <Features/>
      {/* <WorldMap
        dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            }, // Alaska (Fairbanks)
            end: {
              lat: 34.0522,
              lng: -118.2437,
            }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
        ]}
      /> */}
      {/* <Globe/> */}
      {/* <NavBar items={navItems} /> */}
      {/* <Navbar /> */}
      {/* <Footer/> */}
      {/* <ResetPin /> */}
      {/* <RegisterForm /> */}

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
      {/* <PlatformPin /> */}
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

{
  /* <Navbar>
  <NavBody>
    {/* Your navbar content here */
}
// <NavbarLogo />
// <NavItems
//   items={[
//     { name: "Home", link: "#" },
//     { name: "About", link: "#about" },
//     { name: "Contact", link: "#contact" },
//   ]}
// />
// <NavbarButton href="#cta">Get Started</NavbarButton>
// </NavBody>
// </Navbar>; */}
