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
import type { IUser } from "@/types";
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
import { useGetAllUserQuery } from "@/redux/features/users/user.api";
import UsersRoleFilter from "@/components/module/usersRolefilter";
import { Roles } from "@/constrants/constrants";

export default function AllUsers() {
  const [meta, setMeta] = useState<{ totalPages: number; page: number }>({
    totalPages: 1,
    page: 1,
  });
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const role = searchParams.get("type") || undefined;
  const [currentpage, setCurrentpage] = useState(1);
  const queryArgs: { role?: string; page: number } = { page: currentpage };

  if (role) {
    queryArgs.role = role;
  }

  const { data, isLoading, isError } = useGetAllUserQuery(queryArgs);

  useEffect(() => {
    if (data?.data) {
      setAllUsers(data?.data ?? []);
      setMeta({
        totalPages: data?.meta?.totalPage || 1,
        page: data?.meta?.page || 1,
      });
    }
  }, [data?.data, data?.meta?.page, data?.meta?.totalPage]);

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
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last activities</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUsers.map(
                  (tx) =>
                    tx.role === Roles.agent ||
                    (Roles.user && (
                      <TableRow key={tx._id}>
                        <TableCell className="font-mono text-xs text-gray-700 dark:text-gray-300">
                          {tx.name}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ${tx.role}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <span className="block text-gray-700 dark:text-gray-300">
                              {tx.role}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(tx.updatedAt)}
                        </TableCell>
                      </TableRow>
                    ))
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
              { length: meta.totalPages },
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
                  currentpage === meta.totalPages &&
                  "pointer-events-none text-gray-500"
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
