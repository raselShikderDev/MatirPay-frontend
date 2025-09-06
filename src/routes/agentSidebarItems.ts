import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const AgentAllTransactions = lazy(
  () => import("@/pages/agent/agentAllHistory")
);
const AgentCashInPage = lazy(() => import("@/pages/agent/agentCashInpage"));
const AgentDashboard = lazy(() => import("@/pages/agent/agentDashBoard"));

export const agentSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "dashboard",
        Component: AgentDashboard,
      },
      {
        title: "Cash in",
        url: "cash-in",
        Component: AgentCashInPage,
      },
      {
        title: "Transactions",
        url: "transactions",
        Component: AgentAllTransactions,
      },
    ],
  },
];
