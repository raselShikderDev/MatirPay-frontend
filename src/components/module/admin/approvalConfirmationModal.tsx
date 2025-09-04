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
}


// How to send the function call
//  <ChildComponent onButtonClick={handleClick} />

export function ApprovalConfirmationModal({children, onConfirm}:IProps) {

  const handleConfrim = ()=>{
      onConfirm()
      // eslint-disable-next-line no-console
      console.log("Successfully Approved Agent")
  }
 
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
           This action cannot be undone. This will grant approval and allow the agent to perform actions.
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
