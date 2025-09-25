"use client";
import React, { ReactNode } from "react";
import { AppSidebar } from "@/components/ui-elements/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "../ui-elements/site-header";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DL: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DL;
