"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Send, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Wallet,
    title: "Digital Wallet",
    description: "Create and manage secure wallets to store and transfer funds instantly.",
  },
  {
    icon: Send,
    title: "Instant Transfers",
    description: "Send and receive money in real time with detailed transaction history.",
  },
  {
    icon: Users,
    title: "Agent Support",
    description: "Approved agents can assist users with deposits, withdrawals, and payments.",
  },
  {
    icon: ShieldCheck,
    title: "Secure System",
    description: "Role-based access control and encrypted transactions for maximum safety.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features for Everyone
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full rounded-2xl shadow-sm hover:shadow-md transition">
                <CardContent className="p-6 text-center">
                  <feature.icon className="mx-auto h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
