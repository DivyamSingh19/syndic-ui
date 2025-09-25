"use client";
import * as React from "react";
import { IconSend, IconUsers, IconX, IconHistory } from "@tabler/icons-react";
import { NavMain } from "@/components/ui/ui-elements/sidebar/nav-main";
import { NavUser } from "@/components/ui/ui-elements/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Back from "../buttons/back";

const data = {
  user: {
    name: "morpheus",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Create Transaction",
      url: "/dashboard/create-transaction/step-1",
      icon: IconSend,
    },
    {
      title: "Failed Transactions",
      url: "/dashboard/failed-transactions",
      icon: IconX,
    },
    {
      title: "Transaction History",
      url: "/dashboard/transaction-history",
      icon: IconHistory,
    },
    {
      title: "Contacts",
      url: "/dashboard/contacts",
      icon: IconUsers,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Back />
        <a
          href="/dashboard"
          className="flex justify-center items-center py-2 hover:opacity-80 transition-opacity"
        >
          <span className="text-5xl font-semibold">Syndic</span>
        </a>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
