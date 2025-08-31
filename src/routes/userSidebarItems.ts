import AllTransactions from "@/pages/user/allTransaction";
import CashOutPage from "@/pages/user/userCashOutPage";
import UserDashBoad from "@/pages/user/userDashboad";
import UserSendMoney from "@/pages/user/userSendMoney";
import type { ISidebarItems } from "@/types";

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
