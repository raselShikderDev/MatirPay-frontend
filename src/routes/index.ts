import App from "@/App";
import AboutPage from "@/pages/aboutPage";
import Login from "@/pages/authentications/loginPage";
import VerifyPage from "@/pages/authentications/verifyPage";
import ContactPage from "@/pages/contactPage";
import HomePage from "@/pages/homePage";
import PricingPage from "@/pages/pricingPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        Component:App,
        path:"/",
        children:[
            {
                Component:HomePage,
                index:true,
            },
            {
                path:"about",
                Component:AboutPage
            },
            {
                path:"contact",
                Component:ContactPage
            },
            {
                path:"pricing",
                Component:PricingPage
            },
        ]
    },
    {
        path:"signin",
        Component:Login
    },
    {
        path:"signup",
        Component:Login
    },
    {
        path:"verify",
        Component:VerifyPage
    },
])