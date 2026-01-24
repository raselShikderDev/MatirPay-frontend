import { Lock, Server, FileCheck } from "lucide-react";

const securityItems = [
  {
    icon: Lock,
    text: "Encrypted wallet and transaction data",
  },
  {
    icon: Server,
    text: "Scalable and modern backend architecture",
  },
  {
    icon: FileCheck,
    text: "Complete transaction logs and admin oversight",
  },
];

export function SecuritySection() {
  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-3xl font-bold mb-8">Security You Can Trust</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {securityItems.map((item, index) => (
            <div key={index} className="p-6 rounded-2xl bg-background shadow-sm">
              <item.icon className="mx-auto mb-4 text-primary" />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
