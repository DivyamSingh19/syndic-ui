"use client";
import React from "react";
import AL from "@/components/layout/AuthLayout";
import LoginForm from "@/components/ui/ui-elements/forms/LoginForm";

const Login = () => {
  return (
    <AL>
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Welcome Back!
        </h1>
        <h4 className="text-xs sm:text-sm font-medium text-gray-400 px-2">
          Let&apos;s get you signed in securely.
        </h4>
      </div>

      <div className="w-full flex justify-center mt-4">
        <LoginForm />
      </div>
    </AL>
  );
};

export default Login;
