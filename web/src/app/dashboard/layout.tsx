import React, { ReactNode } from "react";
import DL from "@/components/layout/DashboardLayout";

interface DashProps {
  children: ReactNode;
}

const Dash: React.FC<DashProps> = ({ children }) => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <DL className="h-full w-full overflow-hidden">{children}</DL>
    </div>
  );
};

export default Dash;
