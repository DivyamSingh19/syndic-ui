"use client";
import React from "react";
import AL from "@/components/layout/AuthLayout";
import RegisterForm from "@/components/ui/ui-elements/forms/RegisterForm";

const Register = () => {
  return (
    <AL>
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-bold max-w-fit mx-auto whitespace-nowrap">
          Create an account
        </h1>
        <h4 className="text-xs sm:text-sm font-medium text-muted-foreground px-2">
          Join thousands of users managing their finances with ease
        </h4>
      </div>

      <div className="w-full flex justify-center mt-8">
        <RegisterForm />
      </div>
    </AL>
  );
};

export default Register;
