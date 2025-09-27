"use client";
import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui-elements/landing/navbar";
import {
  Home,
  Info,
  HelpCircle,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";
import Footer from "@/components/ui-elements/landing/footer";
import { HeroSection } from "@/components/ui-elements/landing/hero";
import FAQ from "@/components/ui-elements/landing/faq";
import Features from "@/components/ui-elements/landing/features";
import AboutSection from "@/components/ui-elements/landing/about";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", link: "#home", icon: Home },
  { name: "Features", link: "#features", icon: Sparkles },
  { name: "About", link: "#about", icon: Info },
  { name: "FAQ", link: "#faq", icon: HelpCircle },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<string | null>("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const computedNavItems = isLoggedIn
    ? [
        ...navItems,
        { name: "Dashboard", link: "/dashboard", icon: LayoutDashboard },
      ]
    : navItems;

  return (
    <>
      <main className="flex flex-col bg-white dark:bg-black">
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
        >
          <NavBody
            isLoggedIn={isLoggedIn}
            onLogin={handleLogin}
            onLogout={handleLogout}
          >
            <NavbarLogo />
            <NavItems
              items={computedNavItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
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
              isLoggedIn={isLoggedIn}
              onLogin={handleLogin}
              onLogout={handleLogout}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            >
              {computedNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.link}
                    onClick={() => {
                      setActiveTab(item.name);
                      toggleMobileMenu();
                    }}
                    className={cn(
                      "flex w-full max-w-xs items-center justify-center gap-4 rounded-lg px-4 text-lg font-medium transition-colors",
                      activeTab === item.name
                        ? "text-primary font-bold bg-primary/10 dark:bg-primary/20"
                        : "text-foreground hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/20"
                    )}
                  >
                    {Icon && <Icon size={20} />}
                    <span className="flex-1 text-center">{item.name}</span>
                  </Link>
                );
              })}
            </MobileNavMenu>
          </MobileNav>
        </Navbar>

        <section id="home" className="relative pt-28 pb-32 lg:pt-32 lg:pb-40">
          <div className="container mx-auto px-4">
            <HeroSection />
          </div>
        </section>

        <section id="features" className="py-28 lg:py-36">
          <div className="container mx-auto max-w-8xl px-4">
            <Features />
          </div>
        </section>

        <section id="about" className="py-28 lg:py-36">
          <div className="container mx-auto max-w-6xl px-4">
            <AboutSection />
          </div>
        </section>

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
