import { ErrorAlert } from "@/components/error";
import { LoadingSpinner } from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyRecentTransactionQuery } from "@/redux/features/transaxtions/transactions.api";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import type { TransactionDetails } from "@/types";
import formatDate from "@/utils/dateFormate";
import formatTrxId from "@/utils/trxIdTransfrom";
import { Send, Wallet } from "lucide-react"; // Lucide icons
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function AgentDashboard() {
  const navigator = useNavigate();
  const { data, isLoading, isError } = useGetMyRecentTransactionQuery(null);
    const { data:myWallet} = useGetMyWalletQuery(null);

  const [alltransactions, setAlltransactions] = useState<TransactionDetails[]>(
    []
  );

    // need to get my wallet balance to update balance and status and need create api


  useEffect(() => {
    if (data) {
      setAlltransactions(data ?? []);
    }
  }, [data]);

   // eslint-disable-next-line no-console
  alltransactions.map((transaction) => console.log(transaction));

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
            <span>&#2547; </span>{myWallet?.data.balance || 0}
          </p>
          <CardDescription className="text-gray-400 dark:text-gray-500 text-sm mt-1">
            Updated just now
          </CardDescription>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 flex-wrap mb-6">
        <Button
          onClick={() => navigator("/agent/cash-in")}
          className="flex-1 cursor-pointer max-w-xs h-24 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex flex-row items-center justify-center gap-2"
          style={{
            backgroundColor: "oklch(0.488 0.243 264.376)",
            color: "white",
          }}
        >
          <h3 className="text-3xl">
            <Send className="w-20 h-20" />
          </h3>
          Cash In
        </Button>

        <Button
          onClick={() => navigator("#")}
          className="flex-1 cursor-pointer max-w-xs h-24 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 flex flex-row items-center justify-center gap-2"
          style={{
            backgroundColor: "oklch(0.488 0.243 264.376 / 0.80)",
            color: "white",
          }}
        >
          <h3 className="text-3xl">
            <Wallet className="w-20 h-20" />
          </h3>
          <h3>View commisions</h3>
        </Button>
      </div>

      {/* Transaction Table */}
      <div className="p-4 mt-3 w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4"> Recent Recived transaction </h2>
        <div className="rounded-md border">
          {isError && <ErrorAlert />}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trx ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Wallet Involved</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alltransactions.map((tx) => (
                  <TableRow key={tx._id}>
                    <TableCell className="font-mono text-xs text-gray-700 dark:text-gray-300">
                      {formatTrxId(tx._id)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          tx.type === "CASH_IN"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : tx.type === "CASH_OUT"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : "bg-blue-100 text-blue-700 border-blue-200"
                        }
                      >
                        {tx.type === "CASH_IN" && "Cash In"}
                        {tx.type === "CASH_OUT" && "Cash Out"}
                        {tx.type === "SEND_MONEY" && "Send Money"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${tx.amount}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="block text-gray-700 dark:text-gray-300">
                          {tx.fromWallet === tx._id
                            ? tx.toWallet
                            : tx.fromWallet}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(tx.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
