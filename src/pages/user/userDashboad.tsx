import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Send, Wallet } from "lucide-react"; // Lucide icons
import { useNavigate } from "react-router";

const transactions = [
  { id: "TXN001", type: "Received", amount: 500, date: "2025-09-01" },
  { id: "TXN002", type: "Sent", amount: 200, date: "2025-08-30" },
  { id: "TXN003", type: "Cash Out", amount: 1000, date: "2025-08-28" },
];

export default function UserDashboard() {
  const navigator = useNavigate();
  return (
    <div className="flex flex-col min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      {/* Balance Card */}
      <Card className="mx-auto w-full max-w-sm rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 bg-white dark:bg-gray-900 mb-6">
        <CardContent className="text-center">
          <CardTitle className="text-lg text-gray-700 dark:text-gray-500 font-medium">
            Your Balance
          </CardTitle>
          <p
            className="text-3xl font-extrabold mt-1"
            style={{ color: "oklch(0.488 0.243 264.376)" }}
          >
            $1,250
          </p>
          <CardDescription className="text-gray-400 dark:text-gray-500 text-sm mt-1">
            Updated just now
          </CardDescription>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 flex-wrap mb-6">
        <Button
          onClick={() => navigator("/user/send-money")}
          className="flex-1 cursor-pointer max-w-xs h-24 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex flex-row items-center justify-center gap-2"
          style={{
            backgroundColor: "oklch(0.488 0.243 264.376)",
            color: "white",
          }}
        >
          <h3 className="text-3xl">
            <Send className="w-20 h-20" />
          </h3>
          Send Money
        </Button>

        <Button
          onClick={() => navigator("/user/cash-out")}
          className="flex-1 cursor-pointer max-w-xs h-24 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex flex-row items-center justify-center gap-2"
          style={{
            backgroundColor: "oklch(0.488 0.243 264.376 / 0.80)",
            color: "white",
          }}
        >
          <h3 className="text-3xl">
            <Wallet className="w-20 h-20" />
          </h3>
          <h3>Cash Out</h3>
        </Button>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-300">
                Transaction ID
              </th>
              <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-300">
                Type
              </th>
              <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-300">
                Amount
              </th>
              <th className="py-2 px-4 text-left text-gray-600 dark:text-gray-300">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b last:border-b-0 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="py-2 px-4 font-mono text-gray-700 dark:text-gray-300">
                  {tx.id}
                </td>
                <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                  {tx.type}
                </td>
                <td className="py-2 px-4 font-semibold text-gray-900 dark:text-gray-100">
                  ${tx.amount}
                </td>
                <td className="py-2 px-4 text-gray-500 dark:text-gray-400 text-sm">
                  {tx.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
