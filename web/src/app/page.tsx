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
} from "@/components/ui-elements/landing/navbar";
import { Home, Info, HelpCircle, Sparkles } from "lucide-react";
import Footer from "@/components/ui-elements/landing/footer";
import { HeroSection } from "@/components/ui-elements/landing/hero";
import FAQ from "@/components/ui-elements/landing/faq";
import Features from "@/components/ui-elements/landing/features";
import AboutSection from "@/components/ui-elements/landing/about";

const navItems = [
  { name: "Home", link: "#home", icon: Home },
  { name: "Features", link: "#features", icon: Sparkles },
  { name: "About", link: "#about", icon: Info },
  { name: "FAQ", link: "#faq", icon: HelpCircle },
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
      <main className="flex flex-col">
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
        >
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
              className="w-full"
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
                    className={`flex items-center gap-2 py-2 px-4 rounded-md transition-colors ${
                      item.name === activeTab
                        ? "text-primary font-bold bg-primary/10 dark:bg-primary/20"
                        : "text-foreground hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/20"
                    }`}
                  >
                    {Icon && <Icon size={20} />}
                    {item.name}
                  </a>
                );
              })}
            </MobileNavMenu>
          </MobileNav>
        </Navbar>

        {/* Hero Section */}
        <section id="home" className="relative pt-28 pb-32 lg:pt-32 lg:pb-40">
          <div className="container mx-auto px-4">
            <HeroSection />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-28 lg:py-36">
          <div className="container mx-auto max-w-8xl px-4">
            <Features />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-28 lg:py-36">
          <div className="container mx-auto max-w-6xl px-4">
            <AboutSection />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 lg:py-40">
          <div className="container mx-auto max-w-3xl px-4">
            <FAQ />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
