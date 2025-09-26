"use client";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Zap, Shield, Users } from "lucide-react";

const headingVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const lineVariants = {
  hidden: { width: 0 },
  visible: { width: "40%", transition: { duration: 0.8, delay: 0.2 } },
};

const AboutSection = () => {
  const stats = [
    { number: "150+", label: "Countries Connected" },
    { number: "<1s", label: "Average Transfer Time" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Global Support" },
  ];

  const values = [
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Connecting every corner of the world through seamless payments",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant transfers that move at the speed of your business",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Military-grade encryption protecting every transaction",
    },
    {
      icon: Users,
      title: "Human-Centered",
      description: "Built for people, powered by cutting-edge technology",
    },
  ];

  return (
    <>
      <motion.h3
        className="text-lg md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white relative"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        Built on principles that matter
        <motion.span
          className="block h-[3px] bg-blue-400 mx-auto mt-2 rounded-full"
          variants={lineVariants}
        />
      </motion.h3>
      {/* Hero Text + Stats */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
        {/* Text Column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight text-center sm:text-left">
            Redefining{" "}
            <span className="text-blue-600 dark:text-blue-400 block">
              Global Payments
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed text-center sm:text-left">
            Syndic is the bridge between traditional finance and the future of
            money, delivering seamless, transparent, and instant payments for
            everyone, everywhere.
          </p>
        </motion.div>

        {/* Stats Column */}
        <div className="relative grid grid-cols-2 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Core Values Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-25"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * idx, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative text-center space-y-4 p-6 rounded-3xl bg-white dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700 shadow hover:shadow-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-950 dark:hover:to-gray-800 transition-all duration-300 cursor-pointer"
              >
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Icon size={28} />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default AboutSection;
