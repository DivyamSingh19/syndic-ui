import React, { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DL: React.FC<DashboardLayoutProps> = ({ children }) => {
  return <div>DashboardLayout</div>;
};

export default DL;
