import {
  BoltIcon,
  ChevronDownIcon,
  LogOutIcon,
  User,
} from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  authApi,
  useGetMeQuery,
  useLogOutMutation,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "sonner";

export default function AvatarOptionsIcon() {
  const [logOut] = useLogOutMutation();
  const dispatch = useAppDispatch();
  const { data } = useGetMeQuery(null);
  const user = data?.data;

  const handleLogout = async () => {
    try {
      const res = await logOut(null).unwrap();
      if (res.success) {
        const toastId = toast.loading("Logging Out");
        toast.success("Successfully logged out", { id: toastId });
        dispatch(authApi.util.resetApiState());
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);

      toast.error("Logout failed");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className="h-auto cursor-pointer p-0 hover:bg-transparent flex items-center justify-center gap-1">
          <Avatar>
            <User size={40} className="opacity-90" aria-hidden="true" />
          </Avatar>
          <ChevronDownIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {user?.name ? user.name : "User"}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {user?.email ? user.email : "user@mail.com"}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>
              <Link to="/update-info">Update user</Link>
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <Button onClick={handleLogout} variant={"ghost"}>
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
