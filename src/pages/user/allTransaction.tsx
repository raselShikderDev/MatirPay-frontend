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
import TransactionTypeFilter from "@/components/module/transactionTypeFilter";
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AllTransactions() {
  const [meta, setMeta] = useState<{ totalPages: number; page: number }>({
    totalPages: 1,
    page: 1,
  });
  const [alltransactions, setAlltransactions] = useState<TransactionDetails[]>(
    []
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type") || undefined;
  const [currentpage, setCurrentpage] = useState(1);
  const queryArgs: { type?: string; page: number } = { page: currentpage };

  if (type) {
    queryArgs.type = type;
  }

  const { data, isLoading, isError } = useGetMyTransactionQuery(queryArgs);

  useEffect(() => {
    if (data?.data) {
      setAlltransactions(data?.data ?? []);
      setMeta({
        totalPages: data?.meta?.totalpage || 1,
        page: data?.meta?.page || 1,
      });
    }
  }, [data?.data, data?.meta?.page, data?.meta?.totalpage]);

  const handleFilterClear = () => {
    const params = new URLSearchParams();
    params.delete("type");
    setSearchParams(params);
    // eslint-disable-next-line no-console
    console.log("paramsa cleared");
  };

  // console.log(currentpage);
  // console.log(alltransactions);

  return (
    <div>
      <div className="p-4 w-full max-w-6xl mx-auto">
        <div className=" w-full flex justify-between">
          <div className="justify-items-start">
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
          </div>
          <div className="flex gap-3">
            <TransactionTypeFilter />
            <div>
              <Button
                className="cursor-pointer"
                variant={"destructive"}
                onClick={handleFilterClear}
              >
                clear
              </Button>
            </div>
          </div>
        </div>
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
                            ? "bg-green-50 text-green-700 border-green-200"
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
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`cursor-pointer ${
                  currentpage === 1 && "pointer-events-none text-gray-500"
                }`}
                onClick={() => setCurrentpage((prev) => Math.max(prev - 1, 1))}
                href="#"
              />
            </PaginationItem>
            {Array.from({ length: meta.totalPages }, (_, index) => index + 1).map(
              (page) => {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      className={`cursor-pointer`}
                      isActive={currentpage === page}
                      onClick={() => setCurrentpage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
            )}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={`cursor-pointer ${
                  currentpage === meta.totalPages && "pointer-events-none text-gray-500"
                }`}
                onClick={() =>
                  setCurrentpage((prev) =>
                    prev < meta.totalPages ? prev + 1 : prev
                  )
                }
                aria-disabled={currentpage === meta.totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
