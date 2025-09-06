import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/loading";
import { ErrorAlert } from "@/components/error";
import { useEffect, useState } from "react";
import type { IUser, TRole } from "@/types";
import formatDate from "@/utils/dateFormate";
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
import {
  useApproveAgentMutation,
  useBlockUserMutation,
  useGetAllUserQuery,
  useSuspendAgentMutation,
  useUnblockUserMutation,
} from "@/redux/features/users/user.api";
import UsersRoleFilter from "@/components/module/usersRolefilter";
import { Roles, USER_STATUS } from "@/constrants/constrants";
import { Ban, MinusCircle, Power, UserCheck } from "lucide-react";
import { StatusChangeConfirmationModal } from "@/components/module/admin/statusChangeConfirmationModal";
import { toast } from "sonner";

export default function AllUsers() {
  const [meta, setMeta] = useState<{ totalpages: number; page: number }>({
    totalpages: 1,
    page: 1,
  });
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const role = searchParams.get("role") || undefined;
  const [currentpage, setCurrentpage] = useState(1);
  const queryArgs: { role?: TRole; page: number } = { page: currentpage };

  if (role) {
    queryArgs.role = role as TRole;
  }

  const { data, isLoading, isError } = useGetAllUserQuery(queryArgs);
  const [blockUser, { isLoading: blockUserloading }] = useBlockUserMutation();
  const [unlockUser, { isLoading: unblockUserloading }] =
    useUnblockUserMutation();
  const [approveAgent, { isLoading: approveAgentloading }] =
    useApproveAgentMutation();
  const [suspendAgent, { isLoading: suspendAgentloading }] =
    useSuspendAgentMutation();

  useEffect(() => {
    if (data?.data) {
      setAllUsers(data?.data ?? []);
      setMeta({
        totalpages: Math.ceil(
          (data?.meta?.total ?? 0) / (data?.meta?.limit ?? 10)
        ),
        page: data?.meta?.page || 1,
      });
    }
  }, [
    data?.data,
    data?.meta?.limit,
    data?.meta?.page,
    data?.meta?.total,
    data?.meta?.totalpage,
  ]);

  const handleFilterClear = () => {
    const params = new URLSearchParams();
    params.delete("type");
    setSearchParams(params);
    // eslint-disable-next-line no-console
    console.log("paramsa cleared");
  };

  // handling blcoking
  const handleBlockuserBtn = async (id: string) => {
    try {
      const res = await blockUser(id).unwrap();
      // eslint-disable-next-line no-console
      console.log(res);
      if (res.success) {
        const toastId = toast.loading("Blocking is under processing...");
        toast.success("Successfully Blocked", { id: toastId });
      }
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error("Blocking is falied");
    }
  };

  // handling unblcoking
  const handleUnBlockuserBtn = async (id: string) => {
    try {
      const res = await unlockUser(id).unwrap();
      // eslint-disable-next-line no-console
      console.log(res);
      if (res.success) {
        const toastId = toast.loading("Unblocking is under processing...");
        toast.success("Successfully unblocked", { id: toastId });
      }
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error("unblocking is falied");
    }
  };

  // handling approving agent
  const handleAgentApproveBtn = async (id: string) => {
    try {
      const res = await approveAgent(id).unwrap();
      // eslint-disable-next-line no-console
      console.log(res);
      if (res.success) {
        const toastId = toast.loading("Approving agent is processing...");
        toast.success("Agent approved", { id: toastId });
      }
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error("Approving is falied");
    }
  };

  // handling suspending agent
  const handleAgentSuspendBtn = async (id: string) => {
    try {
      const res = await suspendAgent(id).unwrap();
      // eslint-disable-next-line no-console
      console.log(res);
      if (res.success) {
        const toastId = toast.loading(
          "Suspending agent is under processing..."
        );
        toast.success("Agent Suspended", { id: toastId });
      }
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error("Suspending is falied");
    }
  };

  return (
    <div>
      <div className="p-4 w-full max-w-6xl mx-auto">
        <div className=" w-full flex justify-between">
          <div className="justify-items-start">
            <h2 className="text-2xl font-bold mb-4">All Users & Agents</h2>
          </div>
          <div className="flex gap-3">
            <UsersRoleFilter />
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
                <TableRow className="space-x-2">
                  <TableHead className="text-center">Name</TableHead>
                  <TableHead className="text-center">ID</TableHead>
                  <TableHead className="text-center">Role</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Last activities</TableHead>
                  <TableHead className="text-center">Block/Unblcok</TableHead>
                  <TableHead className="text-center">
                    Approve/Suspend{" "}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers.map(
                  (tx) =>
                    tx.role !== Roles.admin &&
                    tx.role !== Roles.superAdmin && (
                      <TableRow key={tx._id}>
                        <TableCell className="font-mono text-center text-xs text-gray-700 dark:text-gray-300">
                          {tx.name}
                        </TableCell>
                        <TableCell className="font-mono text-center text-xs text-gray-700 dark:text-gray-300">
                          {tx._id}
                        </TableCell>
                        <TableCell className="font-semibold text-center">
                          {tx.role}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="text-sm text-center">
                            <span className="block text-gray-700 text-center dark:text-gray-300">
                              {tx.status}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-center text-gray-600 dark:text-gray-400">
                          {formatDate(tx.updatedAt)}
                        </TableCell>
                        <TableCell className="text-center">
                          {tx.status !== USER_STATUS.blocked && (
                            <StatusChangeConfirmationModal
                              action="block"
                              type="user"
                              onConfirm={() => handleBlockuserBtn(tx._id)}
                            >
                              <Button
                                disabled={
                                  tx.status === USER_STATUS.blocked &&
                                  blockUserloading
                                }
                                variant={"ghost"}
                                className="cursor-pointer text-center"
                              >
                                <Ban
                                  size={50}
                                  className={`cursor-pointer font-bold text-center ${
                                    tx.status === USER_STATUS.blocked
                                      ? "text-foreground opacity-30"
                                      : "text-red-600 opacity-95"
                                  }`}
                                  aria-hidden="true"
                                />
                              </Button>
                            </StatusChangeConfirmationModal>
                          )}
                          {tx.status !== USER_STATUS.active && (
                            <StatusChangeConfirmationModal
                              action="unblock"
                              type="user"
                              onConfirm={() => handleUnBlockuserBtn(tx._id)}
                            >
                              <Button
                                disabled={
                                  tx.status === USER_STATUS.active &&
                                  unblockUserloading
                                }
                                variant={"ghost"}
                                className="cursor-pointer text-center"
                              >
                                <UserCheck
                                  size={50}
                                  className={`cursor-pointer font-bold text-center ${
                                    tx.status === USER_STATUS.active
                                      ? "text-foreground opacity-30"
                                      : "text-green-600 opacity-95"
                                  }`}
                                  aria-hidden="true"
                                />
                              </Button>
                            </StatusChangeConfirmationModal>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {tx.role === Roles.agent &&
                            tx.isAgentApproved === true && (
                              <StatusChangeConfirmationModal
                                action="suspend"
                                type="agent"
                                onConfirm={() => handleAgentSuspendBtn(tx._id)}
                              >
                                <Button
                                  disabled={suspendAgentloading}
                                  variant={"ghost"}
                                  className="cursor-pointer"
                                >
                                  <MinusCircle
                                    size={50}
                                    className={`cursor-pointer font-bold text-center text-red-600`}
                                    aria-hidden="true"
                                  />
                                </Button>
                              </StatusChangeConfirmationModal>
                            )}
                          {tx.role === Roles.agent &&
                            tx.isAgentApproved === false && (
                              <StatusChangeConfirmationModal
                                action="approve"
                                type="agent"
                                onConfirm={() => handleAgentApproveBtn(tx._id)}
                              >
                                <Button
                                  disabled={approveAgentloading}
                                  variant={"ghost"}
                                  className="cursor-pointer text-center"
                                >
                                  <Power
                                    size={50}
                                    className={`cursor-pointer text-center font-bold text-green-600`}
                                    aria-hidden="true"
                                  />
                                </Button>
                              </StatusChangeConfirmationModal>
                            )}
                        </TableCell>
                      </TableRow>
                    )
                )}
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
            {Array.from(
              { length: meta.totalpages },
              (_, index) => index + 1
            ).map((page) => {
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
            })}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className={`cursor-pointer ${
                  currentpage === meta.totalpages &&
                  "pointer-events-none text-gray-500"
                }`}
                onClick={() =>
                  setCurrentpage((prev) =>
                    prev < meta.totalpages ? prev + 1 : prev
                  )
                }
                aria-disabled={currentpage === meta.totalpages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
