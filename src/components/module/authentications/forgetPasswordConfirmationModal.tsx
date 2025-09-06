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
} from "@/components/ui/alert-dialog"
import type { ReactNode } from "react"


interface IProps{
    children:ReactNode,
    onConfirm:()=> void,
    email:string,
}


export function ForgetPasswordConfirmationModal({children, onConfirm, email}:IProps) {

  const handleConfrim = ()=>{
      onConfirm()
  }
 
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Email Address</AlertDialogTitle>
          <AlertDialogDescription>
            We will send a password reset link to your email: <strong>{email}</strong> <br/> 
            Please confirm this is correct before proceeding.

          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleConfrim}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
