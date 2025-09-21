"use client";
import React from "react";
import AL from "@/components/layout/AuthLayout";
import RegisterForm from "@/components/ui/ui-elements/forms/RegisterForm";

const Register = () => {
  return (
    <AL>
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          Create an account
        </h1>
        <h4 className="text-xs sm:text-sm font-medium text-gray-400 px-2">
          Join thousands of users managing their finances with ease
        </h4>
      </div>

      <div className="w-full flex justify-center mt-4">
        <RegisterForm />
      </div>
    </AL>
  );
};

export default Register;
