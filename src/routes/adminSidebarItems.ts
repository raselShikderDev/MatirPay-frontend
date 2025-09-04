// import AllUsers from "@/pages/admin/allUsers";
import AgentApprovePage from "@/pages/admin/agentApprovePage";
import AllUsers from "@/pages/admin/allUsers";
import { DashboardAdmin } from "@/pages/admin/dashboardAdmin";
import UpdateProfilePage from "@/pages/universelPages/profileUpdatePage";
import AllTransactions from "@/pages/user/allTransaction";
import type { ISidebarItems } from "@/types";



export const adminSidebarItems:ISidebarItems[] = [
  {
    title: "Admin Options",
    items: [
      {
        title: "dashboard",
        url: "dashboard",
        Component: DashboardAdmin,
      },
      {
        title: "Users & Agents",
        url: "users",
        Component: AllUsers,
      },
      {
        title: "Agent approvals",
        url: "approve-agent",
        Component: AgentApprovePage,
      },
      {
        title: "Transactions",
        url: "transactions",
        Component: AllTransactions,
      },
      {
        title: "Update Profile",
        url: "update-profile",
        Component: UpdateProfilePage,
      },
    ],
  },
];
