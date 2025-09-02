import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/loading";
import { useGetMyTransactionQuery } from "@/redux/features/transaxtions/transactions.api";
import { ErrorAlert } from "@/components/error";
import { useEffect, useState } from "react";
import type { TransactionDetails } from "@/types";
import formatTrxId from "@/utils/trxIdTransfrom";
import formatDate from "@/utils/dateFormate";



export default function AllTransactions() {
  const { data, isLoading, isError } = useGetMyTransactionQuery(null);
  const [alltransactions, setAlltransactions] = useState<TransactionDetails[]>(
    []
  );

  useEffect(() => {
    if (data) {
      setAlltransactions(data ?? []);
    }
  }, [data]);

  if (isError) {
    return <ErrorAlert />;
  }

  // eslint-disable-next-line no-console
  alltransactions.map((transaction) => console.log(transaction));

  return (
    <div className="p-4 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <div className="rounded-md border">
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
                  <TableCell className="font-semibold">${tx.amount}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="block text-gray-700 dark:text-gray-300">
                        {tx.fromWallet === tx._id ? tx.toWallet : tx.fromWallet}
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
  );
}
