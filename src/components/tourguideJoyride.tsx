import React, { useState } from "react";
import Joyride, { STATUS } from "react-joyride";
import type { CallBackProps, Step } from "react-joyride";


interface GuidedTourProps {
  onComplete: () => void;
}

const GuidedTour: React.FC<GuidedTourProps>= ({onComplete}) => {
  const [run, setRun] = useState<boolean>(true); 
  const steps: Step[] = [
    {
      target: ".logo",
      content: "This is the logo and you can use it as buton to back to home.",
    },
    { target: ".navbar", content: "This is your main navigation menu to navigate pages." },
    {
      target: ".dark-mode-toggle",
      content: "Use this button to switch between light and dark mode.",
    },
    {
      target: ".avatar-menu",
      content: "Manage your profile's information and password here.",
    },
    {
      target: ".view-dashboard",
      content: "Use this navbar option to access your dashboard actions.",
    },
  ];

  // For stopping run and inform commonlayout
  const handleCallback = (data: CallBackProps) => {
    if (data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED) {
      setRun(false);
      onComplete(); 
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true} 
      showSkipButton={true}
      showProgress={true} 
      styles={{
        options: {
          arrowColor: "#fff",
          backgroundColor: "#333",
          textColor: "#fff",
          primaryColor: "#4ade80",
          zIndex: 10000,
        },
      }}
      callback={handleCallback}
      // callback={(data) => {
      //   if (data.status === "finished" || data.status === "skipped") {
      //     setRun(false);
      //   }
      // }}
    />
  );
};

export default GuidedTour;




// { target: ".navbar", content: "This is your main navigation menu." },
// { target: ".dark-mode-toggle", content: "Use this button to switch between light and dark mode." },
// { target: ".avatar-menu", content: "Manage your profile and password here." },
//       { target: ".password-chnage", content: "Use this button to chnage your password." },
//       { target: ".view-dashboard", content: "Use this options to use your actions and use dashboard." },

