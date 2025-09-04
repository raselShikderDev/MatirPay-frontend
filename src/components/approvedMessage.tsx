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


export default function ApprovedMessage({
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
                ? "Transaction Successful"
                : "Transaction Failed"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {status === true
              ? "From now on, the agent will be allowed to perform actions."
              : "Something went wrong. Your approval request could not be processed."}
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
