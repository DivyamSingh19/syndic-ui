"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    setIsAuthenticated(!!email);
  }, []);

  const clearAuth = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/login");
    setSidebarOpen(false);
  };

  const handleRegister = () => {
    router.push("/register");
    setSidebarOpen(false);
  };

  const handleDashboard = () => {
    router.push("/dashboard");
    setSidebarOpen(false);
  };

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#about", label: "About" },
  ];

  return (
    <>
      <nav className="w-full bg-background backdrop-blur-sm px-6 py-4 fixed top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span
              onClick={() => router.push("/")}
              className="cursor-pointer text-white font-bold text-xl tracking-tight"
            >
              Syndic
            </span>
          </div>

          {/* Centered navLinks */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white hover:text-[#1e9df1] font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1da1f2] transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleDashboard}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#6fd6ff] via-[#1c9cf0] to-[#0066cc]  text-white font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Dashboard
                </button>
                <button
                  onClick={clearAuth}
                  className="px-5 py-2 rounded-xl bg-destructive border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="px-5 py-2 rounded-xl border bg-primary-foreground border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#6fd6ff] via-[#1c9cf0] to-[#0066cc] text-white font-semibold shadow-md hover:shadow-lg  hover:from-[#1c9cf0] hover:via-[#147fc1] hover:to-[#0d5f91] transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100/10 transition-all duration-300 relative z-60"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-sidebar bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full  bg-background backdrop-blur-sm shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header*/}
        <div className="flex items-center justify-end p-6 border-b border-gray-200/20">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white hover:text-blue-400 p-2 rounded-lg hover:bg-gray-100/10 transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col justify-between h-[calc(100%-64px)]">
          {/* Navigation Links */}
          <div className="px-6 py-4 space-y-5 overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-center  text-sidebar-foreground hover:text-[#1c9cf0] font-medium text-lg py-2 px-4 rounded-lg  transition-all duration-200 hover:border-[#1c9cf0]"
                onClick={() => setSidebarOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="px-6 py-10 space-y-3 border-t border-gray-200/20 bg-background/80">
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleDashboard}
                  className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-[#6fd6ff] via-[#1c9cf0] to-[#0066cc] text-white font-semibold shadow-md hover:shadow-lg hover:from-[#1c9cf0] hover:via-[#147fc1] hover:to-[#0d5f91] transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Dashboard
                </button>
                <button
                  onClick={clearAuth}
                  className="w-full px-4 py-2 
                  bg-destructive rounded-xl border border-gray-300/30 text-destructive-foreground hover:bg-gray-50/5 hover:border-gray-400/50 hover:text-white transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="w-full px-4 py-2 rounded-xl  bg-primary-foreground border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-[#6fd6ff] via-[#1c9cf0] to-[#0066cc] text-white font-semibold shadow-md hover:shadow-lg hover:from-[#1c9cf0] hover:via-[#147fc1] hover:to-[#0d5f91] transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
