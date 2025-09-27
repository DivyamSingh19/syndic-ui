import React, { ReactNode } from "react";
import DL from "@/components/layout/DashboardLayout";

interface DashProps {
  children: ReactNode;
}

const Dash: React.FC<DashProps> = ({ children }) => {
  return (
    // On mobile (default): Allow natural scrolling with min-h-screen
    // On lg screens and up: Lock to h-screen with overflow-hidden
    <div className="min-h-screen w-full overflow-y-auto bg-background text-white lg:h-screen lg:overflow-hidden">
      <DL className="h-full w-full">{children}</DL>
    </div>
  );
};

export default Dash;
