import LegalSection from "../components/module/legalTermsAndPrivacy/LegalSection";
import {termsContent} from "../assets/termsContent";

export default function TermsPage() {
  return (
    <LegalSection
      heading="Terms and Conditions"
      subHeading="Please read these terms carefully before using MatirPay."
      items={termsContent}
    />
  );
}
