import {
  Table,
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
} from "@/components/ui/card"
// import { ErrorAlert } from "@/components/error";
import { LoadingSpinner } from "@/components/loading";
import { useGetAllUserQuery } from "@/redux/features/users/user.api"
import { useGetAllTransactionQuery } from "@/redux/features/transaxtions/transactions.api"

export function DashboardAdmin() {
  const {data:users} = useGetAllUserQuery({role:"USER"})
  const {data:approvedAgent} = useGetAllUserQuery({isAgentApproved: true})
  const {data:alltransactions} = useGetAllTransactionQuery(null)

  const isLoading = false
  // need to customize in api for gettin glimitation in all tractiontions 
  

  return (
    <div>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active User</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl">
            {users?.meta.totalUser ? users?.meta.totalUser : 0}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Approved Agents</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl">
           {approvedAgent?.meta.totalUser ? approvedAgent?.meta.totalUser : 0}
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
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums sm:text-3xl">
            4.5%
          </CardTitle>
        </CardHeader>
      </Card>
     </div>
      <div className="p-4 mt-3 w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4"> Recent transaction History</h2>
        <div className="rounded-md border">
          {/* {isError && <ErrorAlert />} */}
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
              {/* <TableBody>
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
              </TableBody> */}
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
