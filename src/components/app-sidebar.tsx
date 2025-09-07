import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import getSidebarItems from "@/utils/getSidebarItems";
import type { TRole } from "@/types";
import { useGetMeQuery } from "@/redux/features/users/user.api";
import { MatirPayLogo } from "./module/logo";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useGetMeQuery(null);

  const getsidebar = {
    navMain: getSidebarItems(data?.data.role as TRole),
  };

  return (
    <Sidebar className="sidebar-menu" {...props}>
      <SidebarHeader className="flex flex-row justify-between">
        <div>
          <Link to={"/"} className="mb-4">
            <MatirPayLogo />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {getsidebar.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title} className={`${item.url === "users" && "manage-user-and-agent"} ${item.url === "transactions" && "view-all-transactions"} `}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
