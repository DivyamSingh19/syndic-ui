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
import { Home, Info, Mail } from "lucide-react";
import Footer from "@/components/ui-elements/landing/footer";
import { HeroSection } from "@/components/ui-elements/landing/hero";
import FAQ from "@/components/ui-elements/landing/faq";
import { motion } from "framer-motion";

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const lineVariants = {
  hidden: { width: 0 },
  visible: { width: "85%", transition: { duration: 0.8, delay: 0.2 } },
};

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

        <section className="relative py-20 lg:py-24">
          <div className="container mx-auto px-4 pl-8">
            <HeroSection />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 lg:py-24">
          <div className="container mx-auto max-w-3xl px-4">
            <motion.h3
              className="text-lg md:text-4xl font-bold text-center mb-8 text-white  relative"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            >
              Frequently Asked Questions
              <motion.span
                className="block h-[3px] bg-blue-400 mx-auto mt-2 rounded-full"
                variants={lineVariants}
              />
            </motion.h3>
            <FAQ />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
