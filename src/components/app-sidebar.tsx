import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import getSidebarItems from "@/utils/getSidebarItems";
import type { TRole } from "@/types";
import { useGetMeQuery } from "@/redux/features/users/user.api";

// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
const { data } = useGetMeQuery(null);

const getsidebar = {
  navMain: getSidebarItems(data?.data.role as TRole)
};

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {getsidebar.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
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
