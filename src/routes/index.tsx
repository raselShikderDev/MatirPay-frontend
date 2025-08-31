import App from "@/App";
import DashboardLayout from "@/components/layout/dashboardLayout";
import AboutPage from "@/pages/aboutPage";
import AllUsers from "@/pages/admin/allUsers";
import Login from "@/pages/authentications/loginPage";
import SignupPage from "@/pages/authentications/SignupPage";
import VerifyPage from "@/pages/authentications/verifyPage";
import ContactPage from "@/pages/contactPage";
import HomePage from "@/pages/homePage";
import PricingPage from "@/pages/pricingPage";
import UnauthorizedPage from "@/pages/unauthorizedPage";
import AllTransactions from "@/pages/user/allTransaction";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        path: "about",
        Component: AboutPage,
      },
      {
        path: "contact",
        Component: ContactPage,
      },
      {
        path: "pricing",
        Component: PricingPage,
      },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [
      { Component: AllUsers, path: "all-user" },
    ],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      { Component: AllTransactions, path: "all-transactions" },
    ],
  },
  {
    path: "signin",
    Component: Login,
  },
  {
    path: "signup",
    Component: SignupPage,
  },
  {
    path: "verify",
    Component: VerifyPage,
  },
  {
    path: "unauthorized",
    Component: UnauthorizedPage,
  },
]);
