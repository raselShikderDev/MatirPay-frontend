import App from "@/App";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";
import { agentSidebarItems } from "./agentSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import { Roles } from "@/constrants/constrants";
import type { TRole } from "@/types";
import { lazy } from "react";
import FeaturePage from "@/pages/featurePage";

const DashboardLayout = lazy(
  () => import("@/components/layout/dashboardLayout")
);
const AboutPage = lazy(() => import("@/pages/aboutPage"));
const FaqPage = lazy(() => import("@/pages/faqPage"));
const Login = lazy(() => import("@/pages/authentications/loginPage"));
const VerifyPage = lazy(() => import("@/pages/authentications/verifyPage"));
const ContactPage = lazy(() => import("@/pages/contactPage"));
const HomePage = lazy(() => import("@/pages/homePage"));
const PricingPage = lazy(() => import("@/pages/pricingPage"));
const UnauthorizedPage = lazy(() => import("@/pages/unauthorizedPage"));
const SignupPage = lazy(() => import("@/pages/authentications/signupPage"));
const UpdatePasswordPage = lazy(
  () => import("@/pages/universelPages/updatepasswordPage")
);
const UpdateProfilePage = lazy(
  () => import("@/pages/universelPages/profileUpdatePage")
);
const ResetPasswordPage = lazy(
  () => import("@/pages/authentications/resetPasswordPage")
);
const ForgetPasswordPage = lazy(
  () => import("@/pages/authentications/forgetPasswordPage")
);



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
      {
        path: "features",
        Component: FeaturePage,
      },
      {
        path: "faq",
        Component: FaqPage,
      },
      {
        path: "forget-password",
        Component: ForgetPasswordPage,
      },
      
      {
        path: "update-password",
        Component: withAuth(UpdatePasswordPage),
      },
      {
        path: "update-profile",
        Component: withAuth(UpdateProfilePage),
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
      { index: true, element: <Navigate to={"/agent/dashboard"} /> },
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
  {
    path: "reset-password",
    Component: ResetPasswordPage,
  },
]);
