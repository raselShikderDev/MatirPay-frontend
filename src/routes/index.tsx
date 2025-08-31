import App from "@/App";
import DashboardLayout from "@/components/layout/dashboardLayout";
import AboutPage from "@/pages/aboutPage";
import Login from "@/pages/authentications/loginPage";
import VerifyPage from "@/pages/authentications/verifyPage";
import ContactPage from "@/pages/contactPage";
import HomePage from "@/pages/homePage";
import PricingPage from "@/pages/pricingPage";
import UnauthorizedPage from "@/pages/unauthorizedPage";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";
import { agentSidebarItems } from "./agentSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import SignupPage from "@/pages/authentications/signupPage";
import { withAuth } from "@/utils/withAuth";
import { Roles } from "@/constrants/constrants";
import type { TRole } from "@/types";

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
    Component: withAuth(DashboardLayout, Roles.superAdmin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to={"/admin/dashboard"} /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, Roles.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to={"/user/dashboard"} /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, Roles.agent as TRole),
    path: "/agent",
    children: [
      { index: true, element: <Navigate to={"/agent/balance"} /> },
      ...generateRoutes(agentSidebarItems),
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
