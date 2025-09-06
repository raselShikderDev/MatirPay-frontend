import type { TRole } from "@/types";
import React, { useState, } from "react";
import Joyride from "react-joyride";
import type { Step, CallBackProps } from "react-joyride";

interface GuidedTourProps {
  role: TRole;
}

const GuidedTour: React.FC<GuidedTourProps> = ({ role }) => {
  const [run, setRun] = useState<boolean>(() => {
    return localStorage.getItem(`${role}-guidedTourDone`) !== "true";
  });

  const stepsByRole: Record<string, Step[]> = {
    user: [
      { target: ".navbar", content: "This is your main navigation menu." },
      { target: ".avatar-menu", content: "Manage your profile and password here." },
      { target: ".dark-mode-toggle", content: "Use this button to switch between light and dark mode." },
      //   { target: ".user-balance", content: "Here you can see your wallet balance." },
    //   { target: ".send-money-btn", content: "Click here to send money to other users." },
    //   { target: ".recent-transaction", content: "Your recent transaction history is shown here." },
    //   { target: ".sidebar-trigger", content: "Click this button to open/close the sidebar and navigate sections." },
    ],
    agent: [
      { target: ".navbar", content: "This is the navigation bar for Agents." },
      { target: ".avatar-menu", content: "Manage your profile and password here." },
      { target: ".dark-mode-toggle", content: "Use this button to switch between light and dark mode." },
      //   { target: ".agent-balance", content: "Here you can see your wallet balance." },
    //   { target: ".cash-in-btn", content: "Click here to add money to users' wallets." },
    //   { target: ".agent-recent-transactions", content: "This table shows all your recent handled transactions." },
    //   { target: ".sidebar-trigger", content: "Click this button to open/close the sidebar and navigate sections." },
    ],
    admin: [
      { target: ".navbar", content: "This is the navigation bar for Admins." },
      { target: ".avatar-menu", content: "Manage your profile and password here." },
      { target: ".dark-mode-toggle", content: "Use this button to switch between light and dark mode." },
    //   { target: ".active-user", content: "View total active users here." },
    //   { target: ".approved-agent", content: "View total Approved agents here." },
    //   { target: ".sidebar-trigger", content: "Click this button to open/close the sidebar and navigate sections." },
    //   { target: ".manage-user-and-agent", content: "View and manage all users here." },
    //   { target: ".view-all-transactions", content: "View all transactions in this table." },
    ],
  };

  const steps = stepsByRole[role];

  const handleJoyrideCallback = (data: CallBackProps) => {
    if (data.status === "finished" || data.status === "skipped") {
      localStorage.setItem(`${role}-guidedTourDone`, "true");
      setRun(false);
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      showSkipButton={true}
      showProgress={true}
      styles={{ options: { zIndex: 10000 } }}
      callback={handleJoyrideCallback}
    />
  );
};

export default GuidedTour;
;




//   user: [
//       { target: ".navbar", content: "This is your main navigation menu." },
//       { target: ".user-balance", content: "Here you can see your wallet balance." },
//       { target: ".avatar-menu", content: "Manage your profile and password here." },
//       { target: ".dark-mode-toggle", content: "Use this button to switch between light and dark mode." },
//       { target: ".send-money-btn", content: "Click here to send money to other users." },
//       { target: ".recent-transaction", content: "Your recent transaction history is shown here." },
//       { target: ".sidebar-trigger", content: "Click this button to open/close the sidebar and navigate sections." },
//     ],
//     agent: [
//       { target: ".navbar", content: "This is the navigation bar for Agents." },
//       { target: ".agent-balance", content: "Here you can see your wallet balance." },
//       { target: ".avatar-menu", content: "Manage your profile and password here." },
//       { target: ".dark-mode-toggle", content: "Use this button to switch between light and dark mode." },
//       { target: ".cash-in-btn", content: "Click here to add money to users' wallets." },
//       { target: ".agent-recent-transactions", content: "This table shows all your recent handled transactions." },
//       { target: ".sidebar-trigger", content: "Click this button to open/close the sidebar and navigate sections." },
//     ],
//     admin: [
//       { target: ".navbar", content: "This is the navigation bar for Admins." },
//       { target: ".avatar-menu", content: "Manage your profile and password here." },
//       { target: ".dark-mode-toggle", content: "Use this button to switch between light and dark mode." },
//       { target: ".active-user", content: "View total active users here." },
//       { target: ".approved-agent", content: "View total Approved agents here." },
//       { target: ".sidebar-trigger", content: "Click this button to open/close the sidebar and navigate sections." },
//       { target: ".manage-user-and-agent", content: "View and manage all users here." },
//       { target: ".view-all-transactions", content: "View all transactions in this table." },
//     ],
