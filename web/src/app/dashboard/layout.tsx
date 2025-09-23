import React, { ReactNode } from "react";
import DL from "@/components/layout/DashboardLayout";
interface DashProps {
  children: ReactNode;
}

const Dash: React.FC<DashProps> = ({ children }) => {
  return <DL>{children}</DL>;
};

export default Dash;
