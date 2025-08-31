import AllTransactions from "@/pages/user/allTransaction";
import type { ISidebarItems } from "@/types";



export const agentSidebarItems:ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Balance of Income",
        url: "balance",
        Component: AllTransactions,
      },
    ],
  },
  {
    title: "All Transactions",
    items: [
      {
        title: "Cash in",
        url: "cash-in",
        Component: AllTransactions,
      },
      {
        title: "Cash out",
        url: "cash-out",
        Component: AllTransactions,
      },
      {
        title: "Send money",
        url: "send-money",
        Component: AllTransactions,
      },
    ],
  },
];
