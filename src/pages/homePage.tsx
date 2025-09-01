import { Faq } from "@/components/module/homePage/faq";
import { Hero } from "@/components/module/homePage/hero";

const HomePage = () => {

  return (
    <>
     <Hero/>
     <div className="w-full">
      <Faq/>
     </div>
    </>
  );
};

export default HomePage;
