
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

export default function UserSendMoney() {
  const [walletId, setWalletId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSendMoney = () => {
    if (!walletId || !amount) {
      alert("Please fill in all fields!");
      return;
    }

    // Here you would call your API to send money
    alert(`Sent $${amount} to Wallet ID: ${walletId}`);

    setWalletId("");
    setAmount("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl">Send Money</CardTitle>
          <CardDescription>
            Enter wallet ID and amount to send money securely.
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
                placeholder="Enter recipient wallet ID"
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

          {/* Send Button */}
          <Button
            onClick={handleSendMoney}
            className="mt-2 w-full cursor-pointer h-12 transition"
            variant={"default"}
          >
            Send Money
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
