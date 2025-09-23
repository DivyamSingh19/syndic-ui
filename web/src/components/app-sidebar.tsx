"use client";
import * as React from "react";
import {
  IconSend,
  IconUsers,
  IconX,
  IconHistory,
  IconInnerShadowTop,
} from "@tabler/icons-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Back from "./ui/ui-elements/buttons/back";

const data = {
  user: {
    name: "morpheus",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Create Payment",
      url: "/dashboard/create-payment",
      icon: IconSend,
    },
    {
      title: "Contacts",
      url: "/dashboard/contacts",
      icon: IconUsers,
    },
    {
      title: "Failed Transactions",
      url: "/dashboard/failed-transactions",
      icon: IconX,
    },
    {
      title: "Past Transactions",
      url: "/dashboard/past-transactions",
      icon: IconHistory,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <Back/>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Syndic</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
