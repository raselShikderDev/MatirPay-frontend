import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  onConfirm: () => void;
  action: "block" | "unblock" | "suspend" | "approve";
  type: "user" | "agent";
}

export function StatusChangeConfirmationModal({ children, onConfirm, action, type }: IProps) {

  const handleConfirm = () => {
    onConfirm();
  };

  const getModalText = () => {
    switch (action) {
      case "block":
        if (type === "user") {
          return {
            title: "Block User",
            description: "Are you sure you want to block this user? They will not be able to access their account until unblocked."
          };
        }
        break;

      case "unblock":
        if (type === "user") {
          return {
            title: "Unblock User",
            description: "Are you sure you want to unblock this user? They will regain access to their account immediately."
          };
        }
        break;

      case "suspend":
        if (type === "agent") {
          return {
            title: "Suspend Agent",
            description: "Are you sure you want to suspend this agent? They will temporarily lose access to agent functionalities."
          };
        }
        break;

      case "approve":
        if (type === "agent") {
          return {
            title: "Approve Agent",
            description: "Are you sure you want to approve this agent? They will gain access to all agent functionalities."
          };
        }
        break;

      default:
        return {
          title: "Confirm Action",
          description: "Are you sure you want to perform this action?"
        };
    }
  };

  const body = getModalText();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{body?.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {body?.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
