"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import React, { useRef, useState } from "react";
import { LucideIcon } from "lucide-react";

// --- INTERFACES ---

interface NavItemType {
  name: string;
  link: string;
  icon?: LucideIcon;
}

interface NavItemsProps {
  items: NavItemType[];
  className?: string;
  onItemClick?: () => void;
  activeTab: string | null;
  setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
}

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  activeTab: string | null;
  setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

// --- MAIN NAVBAR WRAPPER ---

export const Navbar = ({
  children,
  className,
  isLoggedIn,
  onLogin,
  onLogout,
}: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    offset: ["start start", "end start"],
  });

  const [visible, setVisible] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const propsToPass: any = { visible };

        if (child.type === NavBody || child.type === MobileNav) {
          propsToPass.visible = visible;
        }

        if (child.type === NavBody || child.type === MobileNavMenu) {
          propsToPass.isLoggedIn = isLoggedIn;
          propsToPass.onLogin = onLogin;
          propsToPass.onLogout = onLogout;
        }

        if (child.type === NavItems || child.type === MobileNavMenu) {
          propsToPass.activeTab = activeTab;
          propsToPass.setActiveTab = setActiveTab;
        }

        return React.cloneElement(child, propsToPass);
      })}
    </motion.div>
  );
};

// --- NAV BODY (DESKTOP NAV) ---
export const NavBody = ({
  children,
  className,
  visible,
  isLoggedIn,
  onLogin,
  onLogout,
}: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05)"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      style={{ minWidth: "800px" }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 py-2 lg:flex",
        visible ? "bg-white dark:bg-neutral-950" : "bg-transparent",
        className
      )}
    >
      {/* Children (Logo and NavItems) go here */}
      <div className="flex flex-1 items-center">{children}</div>

      {/* Login/Logout/Profile Buttons are now handled inside this component */}
      <div className="flex items-center space-x-2">
        {isLoggedIn ? (
          <>
            <NavbarButton
              onClick={() => console.log("Profile clicked")}
              variant="primary"
            >
              Profile
            </NavbarButton>
            <NavbarButton onClick={onLogout} variant="primary">
              Logout
            </NavbarButton>
          </>
        ) : (
          <NavbarButton onClick={onLogin} variant="primary">
            Login
          </NavbarButton>
        )}
      </div>
    </motion.div>
  );
};

// --- NAV ITEMS (TUBELIGHT EFFECT) ---

export const NavItems = ({
  items,
  className,
  onItemClick,
  activeTab,
  setActiveTab,
}: NavItemsProps) => {
  return (
    <motion.div
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => {
        const isActive = activeTab === item.name;
        return (
          <Link
            key={idx}
            href={item.link}
            onClick={() => {
              setActiveTab(item.name);
              onItemClick?.();
            }}
            className={cn(
              "relative px-4 py-2 text-neutral-600 dark:text-neutral-300 transition-colors rounded-full",
              isActive && "text-black dark:text-white font-bold"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="nav-item-tubelight"
                className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </div>
              </motion.div>
            )}
            <span className="relative z-20">{item.name}</span>
          </Link>
        );
      })}
    </motion.div>
  );
};

// --- MOBILE NAV (TOP WRAPPER) ---
export const MobileNav = ({ children, className }: MobileNavProps) => {
  return (
    <div
      className={cn(
        "sticky top-0 z-50 mx-auto flex w-full flex-col items-center justify-between px-4 py-2 lg:hidden", // Added px-4
        "bg-white dark:bg-neutral-950 shadow-sm", // always solid
        className
      )}
    >
      {children}
    </div>
  );
};

// --- MOBILE NAV HEADER ---

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => (
  <div
    className={cn(
      "flex w-full flex-row items-center justify-between",
      className
    )}
  >
    {children}
  </div>
);

// --- MOBILE NAV MENU (SIDEBAR) ---
export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
  isLoggedIn,
  onLogin,
  onLogout,
}: MobileNavMenuProps) => {
  const BackDrop = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-40"
      onClick={onClose}
    />
  );

  return (
    <>
      <AnimatePresence>{isOpen && <BackDrop />}</AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={cn(
          // w-full on small screens, w-1/2 on md+ screens
          "fixed top-0 right-0 z-50 flex h-full flex-col px-6 py-6 shadow-lg w-full md:w-1/2",
          "bg-white dark:bg-neutral-950",
          className
        )}
      >
        {/* Header with close button + border */}
        <div className="flex items-center justify-end pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <button onClick={onClose}>
            <IconX size={24} className="text-foreground" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 flex flex-col items-center justify-center py-10 gap-4 space-y-5">
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child;
            const el = child as React.ReactElement<any>;
            return React.cloneElement(el, {
              className: cn(
                el.props.className,
                "w-full flex justify-center items-center text-left px-4 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              ),
            });
          })}
        </div>

        {/* Bottom Section - profile + login/logout */}
        <div className="flex flex-col gap-4 mt-auto border-t border-neutral-200 dark:border-neutral-800 pt-6">
          <NavbarButton
            onClick={() => {
              console.log("Profile clicked");
              onClose();
            }}
          >
            Profile
          </NavbarButton>

          {isLoggedIn ? (
            <NavbarButton
              onClick={() => {
                onLogout();
                onClose();
              }}
            >
              Logout
            </NavbarButton>
          ) : (
            <NavbarButton
              onClick={() => {
                onLogin();
                onClose();
              }}
            >
              Login
            </NavbarButton>
          )}
        </div>
      </motion.div>
    </>
  );
};

// --- TOGGLE (HAMBURGER / CLOSE) ---

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => <button onClick={onClick}>{isOpen ? <IconX /> : <IconMenu2 />}</button>;

// --- LOGO ---

export const NavbarLogo = () => (
  <Link
    href="/"
    className="relative z-20 flex items-center space-x-2 text-sm font-normal"
  >
    <span className="font-medium text-black dark:text-white">Syndic</span>
  </Link>
);

// --- NAVBAR BUTTON ---

export const NavbarButton = ({
  href,
  children,
  className,
  variant = "primary",
  onClick,
  ...rest
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  onClick?: () => void;
}) => {
  const baseStyles =
    "px-4 py-2 rounded-full text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";
  const variantStyles = {
    primary:
      "bg-black text-white dark:bg-white dark:text-black shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05)]",
    secondary: "bg-transparent text-black dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05)]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  const classes = cn(baseStyles, variantStyles[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
};
