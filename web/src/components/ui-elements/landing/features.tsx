import React from "react";
import FeaturesSectionDemo from "@/components/ui/features-section-demo-3";
import { motion } from "framer-motion";

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const lineVariants = {
  hidden: { width: 0 },
  visible: { width: "30%", transition: { duration: 0.8, delay: 0.2 } },
};

const Features = () => {
  return (
    <div>
      <motion.h3
        className="text-lg md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white relative"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        Innovative Payment Solutions
        <motion.span
          className="block h-[3px] bg-blue-400 mx-auto mt-2 rounded-full"
          variants={lineVariants}
        />
      </motion.h3>

      <FeaturesSectionDemo />
    </div>
  );
};

export default Features;
