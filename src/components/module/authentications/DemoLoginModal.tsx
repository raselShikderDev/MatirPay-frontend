"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Users, Shield, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";
import type { ILogin } from "@/types";
import { useState } from "react";

type DemoRole = "user" | "agent" | "admin";

const DEMO_CREDENTIALS: Record<DemoRole, ILogin> = {
  user: {
    email: "user@matirpay.com",
    password: "User@123",
  },
  agent: {
    email: "agent@matirpay.com",
    password: "Agent@123",
  },
  admin: {
    email: "admin@matirpay.com",
    password: "Admin@123",
  },
};

export default function DemoLoginModal() {
  const [logIn] = useLoginMutation();
  const [loadingRole, setLoadingRole] = useState<DemoRole | null>(null);
  const navigate = useNavigate();

  const handleDemoLogin = async (role: DemoRole) => {
    const payload = DEMO_CREDENTIALS[role];
    const toastId = toast.loading("Logging in...");

    try {
      setLoadingRole(role);

      const res = await logIn(payload).unwrap();
      if (res.success) {
        toast.success("Successfully logged in", { id: toastId });
        navigate("/", { replace: true });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.dismiss(toastId);

      if (error?.data?.message === "User is not verified") {
        toast.error("Your account is not verified.");
        return;
      }

      if (error?.data?.message === "Password is invalid") {
        toast.error("Your password is not valid");
        return;
      }

      toast.error("Login failed");
    } finally {
      setLoadingRole(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Try Demo
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            Login as Demo Account
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Button
            className="w-full justify-start gap-3"
            onClick={() => handleDemoLogin("user")}
            disabled={loadingRole !== null}
          >
            {loadingRole === "user" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Users className="h-4 w-4" />
            )}
            Demo User
          </Button>

          <Button
            className="w-full justify-start gap-3"
            onClick={() => handleDemoLogin("agent")}
            disabled={loadingRole !== null}
          >
            {loadingRole === "agent" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Users className="h-4 w-4" />
            )}
            Demo Agent
          </Button>

          <Button
            className="w-full justify-start gap-3"
            onClick={() => handleDemoLogin("admin")}
            disabled={loadingRole !== null}
          >
            {loadingRole === "admin" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Shield className="h-4 w-4" />
            )}
            Demo Admin
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
