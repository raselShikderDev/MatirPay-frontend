"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface InsufficientBalanceModalProps {
  requiredAmount?: number;
  currentBalance?: number;
  setIsShowForm?: () => void;
  setIsBalanceAvailable?: () => void;
}

export const InsufficientBalanceModal: React.FC<
  InsufficientBalanceModalProps
> = ({
  requiredAmount,
  currentBalance,
  setIsShowForm,
  setIsBalanceAvailable,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  // Close modal and call callback
  const handleClose = () => {
    setIsOpen(false);
    if (setIsShowForm) {
      setIsShowForm();
    }
    if (setIsBalanceAvailable) {
      setIsBalanceAvailable();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center gap-2 text-center">
          <AlertTriangle className="text-red-500 w-12 h-12" />
          <DialogTitle>Insufficient Balance</DialogTitle>
          <DialogDescription>
            {currentBalance !== undefined && requiredAmount !== undefined ? (
              <span>
                Your current balance is <b>{currentBalance}</b>, but you need{" "}
                <b>{requiredAmount}</b> to complete this transaction.
              </span>
            ) : (
              <span>
                You do not have enough balance to complete this transaction.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <Button variant="destructive" className="cursor-pointer" onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
