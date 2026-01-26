import { CheckCircle } from "lucide-react";

const steps = [
  "Create your account in minutes",
  "Add balance to your digital wallet",
  "Send or receive money instantly",
  "Track transactions in real time",
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-muted/10">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          How MatirPay Works
        </h2>

        <ul className="space-y-6">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-4">
              <CheckCircle className="text-primary mt-1" />
              <span className="text-lg">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
