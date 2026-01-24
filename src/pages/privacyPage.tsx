import LegalSection from "../components/module/legalTermsAndPrivacy/LegalSection";
import { privacyContent } from "../assets//privacyContent";

export default function PrivacyPage() {
  return (
    <LegalSection
      heading="Privacy Policy"
      subHeading="Your privacy is important to us. This policy explains how we handle your data."
      items={privacyContent}
    />
  );
}
