import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MatirPayLogo } from "../module/logo";
import { Link } from "react-router";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Features", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Advertise", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="w-5 h-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="w-5 h-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const Footer = ({
  sections = defaultSections,
  description = "Empowering digital finance in every corner of Bangladesh",
  socialLinks = defaultSocialLinks,
  copyright = "© 2024 Shadcnblocks.com. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 pt-10 pb-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 lg:flex-row lg:justify-between lg:items-start">
        {/* Logo & Social */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <Link to="/">
            <MatirPayLogo />
          </Link>
          <p className="text-sm max-w-xs">{description}</p>
          <ul className="flex gap-4 mt-2">
            {socialLinks.map((social, idx) => (
              <li key={idx} className="hover:text-primary transition-colors">
                <Link to={social.href} aria-label={social.label}>
                  {social.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <div className="grid w-full gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 text-center lg:text-left">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="mb-4 font-bold text-gray-900 dark:text-white">{section.title}</h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx} className="hover:text-primary transition-colors">
                    <Link to={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Legal & Copyright */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm gap-4 text-center md:text-left">
        <p>{copyright}</p>
        <ul className="flex flex-col md:flex-row gap-4">
          {legalLinks.map((link, idx) => (
            <li key={idx} className="hover:text-primary transition-colors">
              <Link to={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export { Footer };
