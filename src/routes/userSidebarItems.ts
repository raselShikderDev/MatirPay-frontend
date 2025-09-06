import type { ISidebarItems } from "@/types";
import { lazy } from "react";

const AllTransactions = lazy(() => import("@/pages/user/allTransaction"));
const CashOutPage = lazy(() => import("@/pages/user/userCashOutPage"));
const UserDashBoad = lazy(() => import("@/pages/user/userDashboad"));
const UserSendMoney = lazy(() => import("@/pages/user/userSendMoney"));

export const userSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        url: "dashboard",
        Component: UserDashBoad,
      },
      {
        title: "Cash Out",
        url: "cash-out",
        Component: CashOutPage,
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        Component: UserSendMoney,
      },
      {
        title: "History",
        url: "histroy",
        Component: AllTransactions,
      },
    ],
  },
];
