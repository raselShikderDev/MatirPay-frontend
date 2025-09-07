/* eslint-disable no-console */
import { useEffect, useState, type ReactNode } from "react";
import { Footer } from "./footer";
import Navbar from "./navbar";
import GuidedTour from "../tourguideJoyride";
import {
  useGetMeQuery,
  useTourGuideDoneMutation,
} from "@/redux/features/users/user.api";
import { toast } from "sonner";

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  const { data: currentUser } = useGetMeQuery(null);
  const [tourGuideDone] = useTourGuideDoneMutation();
  const [showGuideTour, setShowGuideTour] = useState<boolean>(false);

  useEffect(() => {
    console.log("Started checking tour guide completion");

    if (currentUser?.success && currentUser.data.email) {
      if (currentUser.data.isTourGuideShown === false) {
        setShowGuideTour(true);
        console.log("Tour guide not completed yet! will start soon");
      } else {
        setShowGuideTour(false);
        console.log("Tour already guide completed");
      }
    }
    console.log(`Checking tour guide completion is successfully completed `);
  }, [currentUser]);

  const handleTourCompleted = async () => {
    try {
      const res = await tourGuideDone(null).unwrap();
      console.log(res.data);
      if (res.success) {
        const toastId = toast.loading("Completing tour guide..");
        toast.success("Tour guide completed", { id: toastId });
        setShowGuideTour(false);
      } else {
        setShowGuideTour(true);
        console.log("Tour guide already completed");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Completion of tour guide is falied");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {showGuideTour && <GuidedTour onComplete={handleTourCompleted} />}

      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
