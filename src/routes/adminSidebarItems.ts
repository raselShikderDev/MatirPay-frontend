// import AgentApprovePage from "@/pages/admin/agentApprovePage";
// import AllUsers from "@/pages/admin/allUsers";
// import { DashboardAdmin } from "@/pages/admin/dashboardAdmin";
// import AgentSuspendPage from "@/pages/admin/suspendAgentPage";
// import AllTransactions from "@/pages/user/allTransaction";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const AgentApprovePage = lazy(() => import("@/pages/admin/agentApprovePage"));
const AllUsers = lazy(() => import("@/pages/admin/allUsers"));
const DashboardAdmin = lazy(() => import("@/pages/admin/dashboardAdmin"));
const AgentSuspendPage = lazy(() => import("@/pages/admin/suspendAgentPage"));
const AllTransactions = lazy(() => import("@/pages/user/allTransaction"));

export const adminSidebarItems: ISidebarItems[] = [
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
        title: "Suspend Agent",
        url: "suspend-agent",
        Component: AgentSuspendPage,
      },
      {
        title: "Transactions",
        url: "transactions",
        Component: AllTransactions,
      },
    ],
  },
];
