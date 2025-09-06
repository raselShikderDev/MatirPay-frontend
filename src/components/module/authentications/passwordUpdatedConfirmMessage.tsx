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
import { useNavigate } from "react-router";


export default function PasswordUpdatedConfirmMessage({
  status, 
  setIsShowForm,
}: {
  status: true | false;
  setIsShowForm: ()=> void
}) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate()

  const handleCloseModal = () =>{
    setIsShowForm()
    setOpen(false)
    navigate("/")
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
                ? "Successfully password updated"
                : "Updating password Failed"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {status === true
              ? "Your password successfully updated by new details at your profile"
              : "Faild to update password"}
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
