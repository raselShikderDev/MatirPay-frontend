import type { ReactNode } from "react";
import { Footer } from "./footer";
import Navbar from "./navbar";
import GuidedTour from "../tourguideJoyride";
// import { useGetMeQuery } from "@/redux/features/users/user.api";

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
    // const { data:currentuser } = useGetMeQuery(null);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* {currentuser?.data.email && !currentuser?.data.isTourGuideShown && <GuidedTour />} */}
      <GuidedTour/>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
