"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck, Landmark, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function TrustBanner() {
  return (
    <section className="">
      <section className="py-16 bg-gradient-to-r from-primary/10 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border p-10 shadow-sm"
          >
            <div className="grid gap-8 md:grid-cols-2 items-center">
              {/* Left Content */}
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Built for Secure Digital Payments in Bangladesh
                </h2>
                <p className="text-muted-foreground mb-6">
                  MatirPay follows a role-based, approval-driven architecture to
                  ensure safe wallet operations, transparent transactions, and
                  reliable agent services.
                </p>

                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-primary" />
                    <span>Secure wallet & transaction system</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Landmark className="text-primary" />
                    <span>Agent operations with admin approval</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-primary" />
                    <span>Real-time transaction tracking</span>
                  </div>
                </div>

                <Button size="lg" asChild>
                  <Link to={"/signup"}>create Your Wallet</Link>
                </Button>
              </div>

              {/* Right Highlight */}
              <div className="rounded-xl p-6 text-center">
                <p className="text-lg font-semibold mb-2">
                  Designed with Scalability & Compliance in Mind
                </p>
                <p className="text-sm text-muted-foreground">
                  Whether you are a user, agent, or admin — MatirPay provides
                  controlled access, clear logs, and system transparency.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </section>
  );
}
