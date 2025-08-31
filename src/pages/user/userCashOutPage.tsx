"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Wallet, DollarSign } from "lucide-react";



export default function CashOutPage() {
  const [walletId, setWalletId] = useState("");
  const [amount, setAmount] = useState("");

  const handleCashOut = () => {
    if (!walletId || !amount) {
      alert("Please fill in all fields!");
      return;
    }

    // Here you would call your API to perform cash out
    alert(`Cashed out $${amount} from Wallet ID: ${walletId}`);
    setWalletId("");
    setAmount("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Cash Out</CardTitle>
          <CardDescription>
            Enter your wallet ID and the amount you want to cash out.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Wallet ID Field */}
          <div className="flex flex-col gap-1 relative">
            <Label htmlFor="walletId">Wallet ID</Label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                id="walletId"
                placeholder="Enter your wallet ID"
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>

          {/* Amount Field */}
          <div className="flex flex-col gap-1 relative">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10"
              />
            </div>
          </div>

          {/* Cash Out Button */}
          <Button
            className="mt-2 w-full cursor-pointer h-12 transition"
            variant={"default"}
            onClick={handleCashOut}
          >
            Cash Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
