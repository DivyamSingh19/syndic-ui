import React from "react";
import { motion } from "framer-motion";
import { Iphone15Pro } from "@/components/magic-ui/iphone-15-pro";
import IncidentReportCard from "@/components/ui/incident-report";

const FeaturesFloating = () => {
  // Array of features
  const features = [
    {
      title: "Multi-Currency Payment Input & Live Rates",
      description:
        "Input payments in various currencies and get real-time exchange rates for complete transparency.",
    },
    {
      title: "Routing Preview & Transparent Fees",
      description:
        "Preview payment routes and see a detailed breakdown of all fees before confirming any transaction.",
    },
    {
      title: "Real-time Transaction Tracking",
      description:
        "Monitor your payments every step of the way with our live tracking feature for full visibility.",
    },
    {
      title: "Optimized Micro-Remittances",
      description:
        "Send small value payments efficiently with our system optimized for low-cost micro-remittances.",
    },
    {
      title: "Smart Liquidity & Gas Management",
      description:
        "Our intelligent system manages liquidity and gas fees to ensure cost-effective and timely transactions.",
    },
    {
      title: "Secure & Reliable Delivery",
      description:
        "Trust in our robust security measures and reliable network for safe and guaranteed payment delivery.",
    },
  ];

  // Improved positions accounting for the scaled iPhone
  // These positions create a nice circular orbit around the phone
  const featurePositions = [
    { top: "8%", left: "15%" }, // Top-left
    { top: "5%", right: "15%" }, // Top-right
    { top: "35%", left: "5%" }, // Middle-left
    { top: "35%", right: "5%" }, // Middle-right
    { bottom: "8%", left: "15%" }, // Bottom-left
    { bottom: "5%", right: "15%" }, // Bottom-right
  ];

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      {/* Floating feature divs */}
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="absolute bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-xl text-left w-72 border border-gray-200 dark:border-gray-700"
          style={featurePositions[index % featurePositions.length]}
          initial={{ opacity: 0, scale: 0.8, y: 20, rotate: -10 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
            rotate: 0,
          }}
          transition={{
            delay: 0.15 * index,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            y: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 3 + index * 0.5,
              ease: "easeInOut",
            },
          }}
          whileHover={{
            scale: 1.08,
            rotate: 2,
            boxShadow: "0 25px 40px rgba(0,0,0,0.2)",
            transition: {
              duration: 0.3,
              type: "spring",
              stiffness: 400,
            },
          }}
        >
          <motion.h3
            className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 * index + 0.2, duration: 0.5 }}
          >
            {feature.title}
          </motion.h3>
          <motion.p
            className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * index + 0.3, duration: 0.5 }}
          >
            {feature.description}
          </motion.p>
        </motion.div>
      ))}

      {/* iPhone + IncidentReportCard - positioned in center */}
      <div className="z-10">
        <Iphone15Pro
          style={{
            width: 200,
            height: 386,
            transform: "scale(1.8)",
            transformOrigin: "center",
          }}
        >
          <IncidentReportCard />
        </Iphone15Pro>
      </div>
    </div>
  );
};

export default FeaturesFloating;
