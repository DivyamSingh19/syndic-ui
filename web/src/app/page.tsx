// In /c:/hacks/syndic-ui/web/src/app/page.tsx

"use client";

import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/ui-elements/landing/navbar";
import { Home, Info, Mail } from "lucide-react";
import Footer from "@/components/ui/ui-elements/landing/footer"; 


const navItems = [
  { name: "Home", link: "/", icon: Home },
  { name: "About", link: "#", icon: Info },
  { name: "Features", link: "#", icon: Mail },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState(navItems[0].name);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <>
    <main style={{ height: "300vh", paddingTop: "150px" }}>
      {" "}
      {/* Added style to allow scrolling */}
      <Navbar>
        {/* Desktop Navbar (Resizes on scroll) */}
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={navItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <NavbarButton href="/register">Get Started</NavbarButton>
        </NavBody>

        {/* Mobile Navbar */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu}>
            {/* Render mobile links */}
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => {
                  setActiveTab(item.name);
                  toggleMobileMenu();
                }}
                className={
                  item.name === activeTab
                    ? "text-primary font-bold"
                    : "text-foreground"
                }
              >
                {item.name}
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </main>
    <Footer/>
    </>
  );
}
