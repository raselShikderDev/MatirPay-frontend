import {
  Table,
  TableBody,
  TableCell,
  // TableBody,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { ErrorAlert } from "@/components/error";
import { LoadingSpinner } from "@/components/loading";
import {
  useGetAllUserQuery,
  useGetApprovedAgentCountQuery,
} from "@/redux/features/users/user.api";
import { useGetAllTransactionQuery } from "@/redux/features/transaxtions/transactions.api";
import { useEffect, useState } from "react";
import formatTrxId from "@/utils/trxIdTransfrom";
import { Badge } from "@/components/ui/badge";
import formatDate from "@/utils/dateFormate";
import { ErrorAlert } from "@/components/error";
import { Roles } from "@/constrants/constrants";




export default function DashboardAdmin() {
  const { data: users } = useGetAllUserQuery({ role: "USER" });
  const { data: approvedAgent } = useGetApprovedAgentCountQuery(null);
  const { data: alltransactions, isLoading:allTransactionLoading, isError:allTransactionIsError } = useGetAllTransactionQuery(null);
  const {
    data: allUsers,
    isLoading: allUsersLoading,
    isError: allUsersIsError,
  } = useGetAllUserQuery({ page: 1 });

  const [approvedAgentCount, setApprovedAgentCount] = useState<number>(0);
  const [activeUsersCount, setActiveUsersCount] = useState<number>(0);


  useEffect(() => {
    if (approvedAgent?.data) {
      setApprovedAgentCount(approvedAgent?.data);
    }
    if (users?.meta?.total) {
      setActiveUsersCount(users?.meta?.total);
    }
  }, [approvedAgent?.data, users?.meta?.total]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Active User</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl active-user">
              {activeUsersCount}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Approved Agents</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl approved-agent">
              {approvedAgentCount}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>total Transactions</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl">
              {alltransactions?.meta?.total ? alltransactions?.meta?.total : 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription> Transactions Growth Rate</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl">
              4.5%
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="p-4 mt-3 w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4"> Recent transaction History</h2>
        <div className="rounded-md border">
          {allTransactionIsError && <ErrorAlert />}
          {allTransactionLoading ? (
            <LoadingSpinner />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trx ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Sender Wallet</TableHead>
                  <TableHead>Reciver Wallet</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alltransactions?.data.map((tx) => (
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
                          {tx.fromWallet}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
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
          )}
        </div>
      </div>
      <div className="p-4 mt-3 w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Recenet registed Users & Agents</h2>
        <div className="rounded-md border">
          {allUsersIsError && <ErrorAlert />}
          {allUsersLoading ? (
            <LoadingSpinner />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registed By</TableHead>
                  <TableHead>Last activities</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers?.data.map(
                  (tx) =>
                    tx.role !== Roles.admin &&
                    tx.role !== Roles.superAdmin && (
                      <TableRow key={tx._id}>
                        <TableCell className="font-mono text-xs text-gray-700 dark:text-gray-300">
                          {tx.name}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {tx.role}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <span className="block text-gray-700 dark:text-gray-300">
                              {tx.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {tx.auths[0].provider}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(tx.updatedAt)}
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
