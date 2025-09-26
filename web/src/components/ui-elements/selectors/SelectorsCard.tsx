"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import CountrySelector from "@/components/ui-elements/selectors/CountrySelector";
import FiatSelector from "@/components/ui-elements/selectors/FiatSelector";
import PlatformSelector from "@/components/ui-elements/selectors/PlatformSelector";
import CurrencySelector from "@/components/ui-elements/selectors/CurrencySelector";
import BestRoute from "../buttons/bestroute";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SelectorProps {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

interface SelectorBlockProps {
  label: string;
  subLabel: string;
  SelectorComponent: React.ElementType<SelectorProps>;
}

const SelectorBlock: React.FC<SelectorBlockProps> = ({
  label,
  subLabel,
  SelectorComponent,
}) => (
  <div className="bg-muted/30 rounded-2xl p-4 border border-border/30">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm text-muted-foreground">{subLabel}</span>
    </div>
    <div className="mt-1">
      <SelectorComponent />
    </div>
  </div>
);

export default function SelectorsCard() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // State for the form data
  const [country, setCountry] = useState("ind");
  const [currency, setCurrency] = useState("USDT");
  const [fiat, setFiat] = useState("inr");
  const [platform, setPlatform] = useState("razorpay");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFindBestRoute = async () => {
    setIsLoading(true);
    setError(null);

    const payload = { country, currency, fiat, platform };

    try {
      // Step 1: Submit details to your API
      const response = await fetch("/api/find-route", {
        // <-- REPLACE WITH YOUR API ENDPOINT
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to find a route. Please try again.");
      }

      const result = await response.json();
      console.log("API Success:", result);

      // Step 2: Navigate to the next step on success
      router.push("/dashboard/create-transaction/step-2");
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    if (isHovering) document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isHovering]);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 400, damping: 28, mass: 0.6 },
    },
  };

  const glowVariants: Variants = {
    idle: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
   
      <motion.div
        ref={containerRef}
        className="relative w-full max-w-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Glow background */}
        <motion.div
          className="absolute inset-0 rounded-3xl blur-xl pointer-events-none"
          variants={glowVariants}
          animate={isHovering ? "hover" : "idle"}
          style={{
            background: isHovering
              ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)`
              : undefined,
          }}
        />

        {/* Main card */}
        <motion.div
          className="relative bg-card/80 backdrop-blur-xl border border-border/50  rounded-3xl p-3 shadow-2xl"
          variants={itemVariants}
        >
          {/* Selector blocks */}
          <div className="space-y-5">
            <motion.div variants={itemVariants}>
              <SelectorBlock
                label="Country"
                subLabel="Sender's Region"
                SelectorComponent={CountrySelector}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SelectorBlock
                label="You Pay"
                subLabel="Select Asset"
                SelectorComponent={CurrencySelector}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SelectorBlock
                label="Receiver Gets"
                subLabel="Select Fiat"
                SelectorComponent={FiatSelector}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SelectorBlock
                label="Platform"
                subLabel="Select Service"
                SelectorComponent={PlatformSelector}
              />
            </motion.div>
          </div>

          <motion.button
            onClick={handleFindBestRoute}
            disabled={isLoading}
            className="w-full mt-10 py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={itemVariants}
          >
            <BestRoute isLoading={isLoading} />
          </motion.button>

          {error && (
            <p className="text-red-500 text-sm text-center mt-4">{error}</p>
          )}
        </motion.div>
      </motion.div>
   
  );
}
