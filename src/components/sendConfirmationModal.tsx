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
    data:unknown,
}


// How to send the function call
//  <ChildComponent onButtonClick={handleClick} />

export function SendConfirmationModal({children, onConfirm, data}:IProps) {
  const handleConfrim = ()=>{
      onConfirm()
      // eslint-disable-next-line no-console
      console.log("Successfully send :", data)
  }
        // eslint-disable-next-line no-console
  console.log("children", children)
 
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to send this payment?
            <ul className="mt-4 space-y-1 text-sm text-left">
              <li><strong>Amount:</strong></li>
              <li><strong>Payment Type:</strong> cash out</li>
              <li><strong>Receiver Wallet:</strong>757973276jdkhdg</li>
            </ul>
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
