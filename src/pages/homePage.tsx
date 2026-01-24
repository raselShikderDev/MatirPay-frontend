import { termsContent } from "@/assets/termsContent";
import { Faq } from "@/components/module/homePage/faq";
import FeaturesSection from "@/components/module/homePage/feature";
import { Hero } from "@/components/module/homePage/hero";
import { HowItWorks } from "@/components/module/homePage/HowItWorks";
import { RoleComparison } from "@/components/module/homePage/RoleComparison";
import RoleCTABanner from "@/components/module/homePage/RoleCTABanner";
import { SecuritySection } from "@/components/module/homePage/SecuritySection";
import LegalSection from "@/components/module/legalTermsAndPrivacy/LegalSection";

const HomePage = () => {

  return (
    <>
      <Hero />
      <FeaturesSection />
      <SecuritySection />
      <RoleComparison />
      <HowItWorks />
      <RoleCTABanner/>
      <LegalSection
      heading="Transparency & Trust"
      subHeading="We believe in clear policies and responsible data handling."
      items={termsContent.slice(0, 3)}
      compact
    />
      <div className="w-full">
        <Faq />
      </div>
    </>
  );
};

export default HomePage;
