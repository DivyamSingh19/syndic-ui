"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";

// --- INTERFACES ---

// The NavItem structure now also includes the icon
interface NavItemType {
  name: string;
  link: string;
  icon?: LucideIcon;
}

// Updated NavItemsProps to include link properties and active state management
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
  // Pass active state to the mobile menu to render Tubelight effect
  activeTab: string | null;
  setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
  // Pass auth state to mobile menu
  isLoggedIn: boolean;
  onLogin: () => void; // Added onLogin to mobile menu
  onLogout: () => void;
}

// --- MAIN NAVBAR COMPONENT (FIXED SCROLL DETECTION) ---

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
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-0 md:top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const propsToPass: {
          visible?: boolean;
          activeTab?: string | null;
          setActiveTab?: React.Dispatch<React.SetStateAction<string | null>>;
          isLoggedIn?: boolean;
          onLogin?: () => void;
          onLogout?: () => void;
        } = { visible };

        if (child.type === NavBody || child.type === MobileNav) {
          propsToPass.visible = visible;
        }

        if (child.type === NavBody) {
          propsToPass.isLoggedIn = isLoggedIn;
          propsToPass.onLogout = onLogout;
        }

        if (child.type === NavItems || child.type === MobileNavMenu) {
          propsToPass.activeTab = activeTab;
          propsToPass.setActiveTab = setActiveTab;
        }

        if (child.type === MobileNavMenu) {
          propsToPass.isLoggedIn = isLoggedIn;
          propsToPass.onLogin = onLogin;
          propsToPass.onLogout = onLogout;
        }

        return React.cloneElement(
          child as React.ReactElement<any>,
          propsToPass
        );
      })}
    </motion.div>
  );
};

// --- NAV BODY COMPONENT (RESIZE ANIMATION) ---

export const NavBody = ({
  children,
  className,
  visible,
  isLoggedIn,
  onLogout,
}: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-neutral-950/80",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// --- NAV ITEMS COMPONENT (TUBELIGHT EFFECT) ---

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
            onClick={() => {
              setActiveTab(item.name);
              if (onItemClick) onItemClick();
            }}
            href={item.link}
            key={`link-${idx}`}
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

// --- MOBILE COMPONENTS (SIDEBAR and ICONS) ---

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {" "}
      {children}{" "}
    </div>
  );
};

// Updated to be a sidebar
export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  isLoggedIn,
  onLogin,
  onLogout,
}: MobileNavMenuProps) => {
  const BackDrop = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-40 "
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
          "fixed top-0 right-0 z-50 flex h-full w-full max-w-xs flex-col px-6 py-8 shadow-lg",
          "bg-white dark:bg-neutral-950",
          className
        )}
      >
        <button className="absolute top-4 right-4" onClick={onClose}>
          <IconX size={24} className="text-foreground" />
        </button>
        {/* Added flex and gap for proper spacing */}
        <div className="flex flex-col gap-10 py-10">
          {children}
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
export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-black dark:text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black dark:text-white" onClick={onClick} />
  );
};
export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      {/* <img
        src="https://assets.aceternity.com/logo-dark.png"
        alt="logo"
        width={30}
        height={30}
      /> */}
      <span className="font-medium text-black dark:text-white">Syndic</span>
    </a>
  );
};
export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";
  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,255,0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,255,0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };
  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {" "}
      {children}{" "}
    </Tag>
  );
};
