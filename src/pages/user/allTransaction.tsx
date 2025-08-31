"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const demoTransactions = [
  {
    _id: "68b1b4c4b564846848b2070f",
    amount: 104,
    type: "CASH_OUT",
    fromWallet: "68b1a8811e18e5ddce1eab2d",
    toWallet: "68b19cd5665d89e46e21fce0",
    createdAt: "2025-08-29T14:10:12.318Z",
  },
  {
    _id: "68b1b43bb564846848b20700",
    amount: 104,
    type: "CASH_IN",
    fromWallet: "68b19cd5665d89e46e21fce0",
    toWallet: "68b1b380b564846848b206ec",
    createdAt: "2025-08-29T14:07:55.400Z",
  },
  {
    _id: "68b1b1e0b564846848b206e1",
    amount: 108,
    type: "SEND_MONEY",
    fromWallet: "68b1a8811e18e5ddce1eab2d",
    toWallet: "68b19b03f73449ae56b166c2",
    createdAt: "2025-08-29T13:57:52.419Z",
  },
];

// Format TrxID: first 10 chars + last 14 chars
const formatTrxId = (id: string) => {
  if (!id) return "";
  const firstPart = id.slice(0, 10);
  const lastPart = id.slice(-14);
  return `TrxID: ${firstPart}${lastPart}`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function AllTransactions() {
  return (
    <div className="p-4 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trx ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>From → To</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoTransactions.map((tx) => (
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
                    {tx.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold">${tx.amount}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <span className="block text-gray-700 dark:text-gray-300">
                      {tx.fromWallet}
                    </span>
                    <span className="block text-xs text-gray-500">↓</span>
                    <span className="block text-gray-700 dark:text-gray-300">
                      {tx.toWallet}
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
      </div>
    </div>
  );
}
