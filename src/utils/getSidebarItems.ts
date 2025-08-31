import { Roles } from "@/constrants/constrants";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { agentSidebarItems } from "@/routes/agentSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case Roles.user:
      return [...userSidebarItems];
    case Roles.admin:
      return [...adminSidebarItems];
    case Roles.superAdmin:
      return [...adminSidebarItems];
    case Roles.agent:
      return [...agentSidebarItems];

    default:
      return [];
      break;
  }
};

export default getSidebarItems;
