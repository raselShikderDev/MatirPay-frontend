import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { MatirPayLogo } from "../module/logo";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { ModeToggle } from "../mode-toggle";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import { Roles } from "@/constrants/constrants";
import React from "react";
import AvatarOptionsIcon from "../avatarsOptionsicon";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/pricing", label: "Pricing", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: Roles.admin },
  { href: "/admin", label: "Dashboard", role: Roles.superAdmin },
  { href: "/user", label: "Dashboard", role: Roles.user },
  { href: "/agent", label: "Dashboard", role: Roles.agent },
];

export default function Navbar() {
  const { data } = useGetMeQuery(null);
  const userRole = data?.data?.role;

  const filterLinks = navigationLinks.filter((item) => {
    if (item.role === "PUBLIC") {
      return true;
    }
    if (userRole && item.role === userRole) {
      return true;
    }
    return false;
  });

  return (
    <header className="border-b px-4">
      <div className="mx-auto container flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {filterLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink asChild className="py-1.5">
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <MatirPayLogo />

            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {filterLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    <NavigationMenuItem>
                      <>
                        {link.role === "PUBLIC" && (
                          <NavigationMenuLink
                            asChild
                            className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                          >
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuLink>
                        )}
                        {data?.data.role && link.role === data?.data.role && (
                          <NavigationMenuLink
                            asChild
                            className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                          >
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuLink>
                        )}
                      </>
                    </NavigationMenuItem>
                  </React.Fragment>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2 h-10">
          {/* Mode Toggle */}
          <ModeToggle />

          {/* User Avatar / Log In */}
          {data?.data.email ? (
            <div className="flex items-center h-8">
              <div className="flex items-center h-8 w-8">
                <AvatarOptionsIcon />
              </div>
            </div>
          ) : (
            <Button asChild size="sm" className="h-8 flex items-center">
              <Link to="/signin">Log In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
