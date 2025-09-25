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
  { name: "Home", link: "#", icon: Home },
  { name: "About", link: "#", icon: Info },
  { name: "Features", link: "#", icon: Mail },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <>
      <main style={{ height: "300vh" }}>
        {/* Added style to allow scrolling */}
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
        >
          {/* Desktop Navbar (Resizes on scroll) */}
          <NavBody isLoggedIn={isLoggedIn} onLogout={handleLogout}>
            <NavbarLogo />
            <NavItems
              items={navItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {isLoggedIn ? (
              <NavbarButton onClick={handleLogout}>Logout</NavbarButton>
            ) : (
              <NavbarButton onClick={handleLogin}>Login</NavbarButton>
            )}
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
            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={toggleMobileMenu}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isLoggedIn={isLoggedIn}
              onLogin={handleLogin} 
              onLogout={handleLogout}
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.link}
                    onClick={() => {
                      setActiveTab(item.name);
                      toggleMobileMenu();
                    }}
                    className={
                      item.name === activeTab
                        ? "text-primary font-bold flex items-center gap-2"
                        : "text-foreground flex items-center gap-2"
                    }
                  >
                    {Icon && <Icon size={20} />}
                    {item.name}
                  </a>
                );
              })}
            </MobileNavMenu>
          </MobileNav>
        </Navbar>

        {/* <p style={{ textAlign: "center", marginTop: "20px" }}>
          {isLoggedIn ? "You are logged in." : "You are logged out."}
        </p> */}
      </main>
      <Footer />
    </>
  );
}
