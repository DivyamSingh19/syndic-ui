import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Globe,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "Pricing", href: "#pricing" },
    { name: "Documentation", href: "#docs" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "Security", href: "#security" },
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@syndic.in", href: "mailto:hello@syndic.in" },
    { icon: Phone, text: "+91 5551234567", href: "tel:+91551234567" },
    { icon: MapPin, text: "Mumbai, India", href: "#" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-background text-white overflow-hidden border-t border-white/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c9cf0]/10 to-[#6fd6ff]/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(28,156,240,0.1),transparent)]"></div>
      </div>

      {/* Floating orbs (scaled down on mobile) */}
      <div className="absolute top-20 left-6 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#6fd6ff]/20 to-[#1c9cf0]/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-6 w-28 h-28 sm:w-40 sm:h-40 bg-gradient-to-tl from-[#1c9cf0]/15 to-[#0066cc]/15 rounded-full blur-2xl"></div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Syndic
              </h3>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              Making global payments simple, transparent, and affordable.
              Connecting families and businesses worldwide, one transfer at a
              time.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-[#6fd6ff] hover:to-[#1c9cf0] rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg backdrop-blur-sm border border-white/10"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#6fd6ff] to-[#1c9cf0] rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm flex items-center gap-3 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 text-[#1c9cf0]" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300 relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#6fd6ff] to-[#1c9cf0] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative">
              Legal
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#6fd6ff] to-[#1c9cf0] rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm flex items-center gap-3 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 text-[#1c9cf0]" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300 relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#6fd6ff] to-[#1c9cf0] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#6fd6ff] to-[#1c9cf0] rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  <a
                    href={contact.href}
                    className="flex items-center gap-4 text-sm text-gray-300 hover:text-white group"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#6fd6ff]/20 group-hover:to-[#1c9cf0]/20 transition-all duration-300 backdrop-blur-sm border border-white/10">
                      <contact.icon className="w-4 h-4 group-hover:text-[#1c9cf0] transition-colors duration-300" />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {contact.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-300 text-sm">
                Get the latest updates and insights delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-64 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#1c9cf0] focus:ring-2 focus:ring-[#1c9cf0]/20 backdrop-blur-sm transition-all duration-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#6fd6ff] to-[#1c9cf0] text-white font-semibold rounded-lg hover:from-[#1c9cf0] hover:to-[#0066cc] transition-all transform hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} Syndic. All rights reserved. | Crafted with passion
            and innovation.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#1c9cf0] text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span>All Systems Operational</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <Globe className="w-3 h-3" />
              <span>Global Reach</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6fd6ff] via-[#1c9cf0] to-[#0066cc]"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-tl from-[#1c9cf0]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#6fd6ff]/10 to-transparent rounded-full blur-2xl"></div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      ></div>
    </footer>
  );
};

export default Footer;
