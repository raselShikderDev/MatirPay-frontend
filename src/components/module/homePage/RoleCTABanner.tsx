"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function RoleCTABanner() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold">Choose How You Want to Use MatirPay</h2>
                    <p className="text-muted-foreground mt-3">
                        Different roles, one powerful digital payment platform.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* User Card */}
                    <Card className="p-8 rounded-2xl hover:shadow-md transition">
                        <User className="h-10 w-10 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-3">For Users</h3>
                        <p className="text-muted-foreground mb-6">
                            Create your wallet, send and receive money instantly, and monitor
                            every transaction with full transparency.
                        </p>
                        <Button className="w-full" asChild>
                            <Link to={"/signup"}>
                                Get Started as User
                            </Link>
                        </Button>
                    </Card>

                    {/* Agent Card */}
                    <Card className="p-8 rounded-2xl hover:shadow-md transition">
                        <Users className="h-10 w-10 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-3">For Agents</h3>
                        <p className="text-muted-foreground mb-6">
                            Apply for approval, assist customers, manage balances, and perform
                            transactions under admin supervision.
                        </p>
                        <Button variant="outline" className="w-full" asChild>
                            <Link to={"/login"}>
                                Apply as Agent
                            </Link>
                        </Button>
                    </Card>
                </div>
            </div>
        </section>
    );
}
