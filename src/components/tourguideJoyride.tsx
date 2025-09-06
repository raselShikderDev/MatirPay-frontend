import React, { useState } from "react";
import Joyride from "react-joyride";
import type { Step } from "react-joyride";

const GuidedTour: React.FC = () => {
  const [run, setRun] = useState(true); // Start tour immediately
  const steps: Step[] = [
    {
      target: ".logo",
      content: "This is the logo and you can use it as buton to back to home.",
    },
    { target: ".navbar", content: "This is your main navigation menu." },
    {
      target: ".dark-mode-toggle",
      content: "Use this button to switch between light and dark mode.",
    },
    {
      target: ".avatar-menu",
      content: "Manage your profile and password here.",
    },
    // {
    //   target: ".password-chnage",
    //   content: "Use this button to change your password.",
    // },
    {
      target: ".view-dashboard",
      content: "Use this option to access your dashboard actions.",
    },
  ];

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true} // Automatically moves to the next step
      showSkipButton={true} // Allow user to skip
      showProgress={true} // Show step number
      styles={{
        options: {
          arrowColor: "#fff",
          backgroundColor: "#333",
          textColor: "#fff",
          primaryColor: "#4ade80",
          zIndex: 10000,
        },
      }}
      callback={(data) => {
        if (data.status === "finished" || data.status === "skipped") {
          setRun(false); // Stop tour
        }
      }}
    />
  );
};

export default GuidedTour;




// { target: ".navbar", content: "This is your main navigation menu." },
// { target: ".dark-mode-toggle", content: "Use this button to switch between light and dark mode." },
// { target: ".avatar-menu", content: "Manage your profile and password here." },
//       { target: ".password-chnage", content: "Use this button to chnage your password." },
//       { target: ".view-dashboard", content: "Use this options to use your actions and use dashboard." },

