import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

interface IActionStatusModalProps {
  status: boolean; // true = success, false = failed
  action: "block" | "unblock" | "suspend" | "approve";
  type: "user" | "agent";
}

export default function StatusChangeConfirmation({
  status,
  action,
}: IActionStatusModalProps) {
  const [open, setOpen] = useState(true);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const getModalText = () => {
    if (status) {
      switch (action) {
        case "block":
          return {
            title: "User Successfully Blocked",
            description: "The user will no longer have access until unblocked.",
            buttonText: "Close",
          };
        case "unblock":
          return {
            title: "User Successfully Unblocked",
            description: "The user now has full access to their account.",
            buttonText: "Close",
          };
        case "suspend":
          return {
            title: "Agent Successfully Suspended",
            description: "The agent will temporarily lose access to agent functionalities.",
            buttonText: "Close",
          };
        case "approve":
          return {
            title: "Agent Successfully Approved",
            description: "The agent can now perform all allowed actions.",
            buttonText: "Close",
          };
        default:
          return {
            title: "Action Completed",
            description: "The request was successfully processed.",
            buttonText: "Close",
          };
      }
    } else {
      return {
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} Failed`,
        description: "Something went wrong. Please try again.",
        buttonText: "Try Again",
      };
    }
  };

  const { title, description, buttonText } = getModalText();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-2xl shadow-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {status ? (
              <CheckCircle2 className="text-green-500 w-6 h-6" />
            ) : (
              <XCircle className="text-red-500 w-6 h-6" />
            )}
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={status ? "default" : "destructive"}
            onClick={handleCloseModal}
            className="dark:text-white cursor-pointer"
          >
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
