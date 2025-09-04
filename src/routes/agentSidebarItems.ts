import AgentAllTransactions from "@/pages/agent/agentAllHistory";
import AgentCashInPage from "@/pages/agent/agentCashInpage";
import AgentDashboard from "@/pages/agent/agentDashBoard";
import UpdateProfilePage from "@/pages/universelPages/profileUpdatePage";
import type { ISidebarItems } from "@/types";



export const agentSidebarItems:ISidebarItems[] = [
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
      {
        title: "Update Profile",
        url: "update-profile",
        Component: UpdateProfilePage,
      },
    ],
  },
];
