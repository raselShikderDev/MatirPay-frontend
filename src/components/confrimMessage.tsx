import { useState } from "react";
import { format } from "date-fns";
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

export type TransactionDetails = {
  user: string;
  amount: number;
  type: string;
  initiatedBy: string;
  fromWallet: string;
  toWallet: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export default function ConfirmationMessage({
  transaction,
  status, 
  setIsShowForm,
}: {
  transaction: TransactionDetails | null;
  status: true | false;
  setIsShowForm: ()=> void
}) {
  const [open, setOpen] = useState(true);

  if (!transaction && status === true) return null;


  const handleCloseModal = () =>{
    setIsShowForm()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-2xl shadow-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {status === true ? (
              <CheckCircle2 className="text-green-500 w-6 h-6" />
            ) : (
              <XCircle className="text-red-500 w-6 h-6" />
            )}
            <DialogTitle>
              {status === true
                ? "Transaction Successful"
                : "Transaction Failed"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {status === true
              ? "Your money has been sent securely via MatriPay 🚀"
              : "Something went wrong. Your transaction could not be processed."}
          </DialogDescription>
        </DialogHeader>

        {status === true && transaction && (
          <div className="space-y-3 py-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">TRX ID:</span>
              <span className="font-mono font-medium">{transaction._id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-semibold text-green-600">
                ৳ {transaction.amount}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">From Wallet:</span>
              <span className="font-mono">{transaction.fromWallet}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">To Wallet:</span>
              <span className="font-mono">{transaction.toWallet}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date:</span>
              <span>
                {format(new Date(transaction.createdAt), "PPP p")}
              </span>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant={status === false ? "destructive" : "default"}
            onClick={handleCloseModal}
            className="dark:text-white cursor-pointer"
          >
            {status === false ? "Try Again" : "Close"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
