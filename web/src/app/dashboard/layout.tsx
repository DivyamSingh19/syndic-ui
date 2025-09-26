import React, { ReactNode } from "react";
import DL from "@/components/layout/DashboardLayout"; // Assuming DL is your main dashboard structure with sidebar/header

interface DashProps {
  children: ReactNode;
}

const Dash: React.FC<DashProps> = ({ children }) => {
  return (
    // This is the root container for every page.
    // h-screen: Sets the height to 100% of the viewport height. This is the boundary.
    // w-full: Sets the width to 100% of the parent.
    // overflow-hidden: This is the key. It tells the browser to hide any content
    // that overflows this container's boundaries, preventing a scrollbar from ever appearing.
    <div className="h-screen w-full overflow-hidden bg-background text-white">
      {/* The DashboardLayout (DL) and its children are now forced to live within this 
        fixed-size, non-scrolling container.
      */}
      <DL className="h-full w-full">{children}</DL>
    </div>
  );
};

export default Dash;
