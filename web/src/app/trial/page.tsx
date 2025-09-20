import React from "react";
import RegisterForm from "@/components/ui/forms/RegisterForm";
import OtpForm from "@/components/ui/forms/OtpForm";
const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* <RegisterForm /> */}
      <OtpForm/>
    </div>
  );
};

export default page;
