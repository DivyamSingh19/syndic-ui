"use client";
import React from "react";
import {
  Globe,
  Route,
  BarChart3,
  Send,
  Droplets,
  ShieldCheck,
} from "lucide-react";
import { motion, Variants, easeOut } from "framer-motion";

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: easeOut },
  }),
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const lineVariants: Variants = {
  hidden: { width: 0 },
  visible: {
    width: "85%",
    transition: { duration: 0.8, delay: 0.2, ease: easeOut },
  },
};

// --- Feature Items ---
const featureItems = [
  {
    icon: Globe,
    title: "Multi-Currency Payment Input & Live Rates",
    description:
      "Input payments in various currencies and get real-time exchange rates for complete transparency.",
  },
  {
    icon: Route,
    title: "Routing Preview & Transparent Fees",
    description:
      "Preview payment routes and see a detailed breakdown of all fees before confirming any transaction.",
  },
  {
    icon: BarChart3,
    title: "Real-time Transaction Tracking",
    description:
      "Monitor your payments every step of the way with our live tracking feature for full visibility.",
  },
  {
    icon: Send,
    title: "Optimized Micro-Remittances",
    description:
      "Send small value payments efficiently with our system optimized for low-cost micro-remittances.",
  },
  {
    icon: Droplets,
    title: "Smart Liquidity & Gas Management",
    description:
      "Our intelligent system manages liquidity and gas fees to ensure cost-effective and timely transactions.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable Delivery",
    description:
      "Trust in our robust security measures and reliable network for safe and guaranteed payment delivery.",
  },
];

// --- Main Component ---
const FeaturesSectionDemo: React.FC = () => {
  return (
    <>
      {/* Features Grid */}
      <motion.div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {featureItems.map((feature, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
          >
            <div className="mb-4 inline-block bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default FeaturesSectionDemo;
