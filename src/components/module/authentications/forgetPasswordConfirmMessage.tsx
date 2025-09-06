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
import { useState } from "react";


export default function ForgetPasswordConfirmMessage({
  status, 
  setIsShowForm,
}: {
  status: true | false;
  setIsShowForm: ()=> void
}) {
  const [open, setOpen] = useState(true);

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
                ? "Password reset email Sent"
                : "Failed to Send reset email"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {status === true
              ? `We’ve sent a password reset link to your registered email. Please check your inbox (and spam folder).`
              : "Something went wrong while sending the reset link. Please try again later or contact support if the issue continues"}
          </DialogDescription>
        </DialogHeader>
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
