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
import type { TansactionType } from "@/types"
import type { ReactNode } from "react"


interface ISendMoneyCOnfirmationData{
  amount: number,
  walletId: string,
  type: TansactionType,
}

interface IProps{
    children:ReactNode,
    onConfirm:()=> void,
    data:ISendMoneyCOnfirmationData,
}


// How to send the function call
//  <ChildComponent onButtonClick={handleClick} />

export function SendConfirmationModal({children, onConfirm, data}:IProps) {
console.log("Data wating for confirmation", data)
  const handleConfrim = ()=>{
      onConfirm()
      // eslint-disable-next-line no-console
      console.log("Successfully send :", data)
  }
 
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
            <ul className="mt-4 space-y-1.5 text-sm text-left">
              <li><strong>Amount:</strong>{data.amount}</li>
              <li><strong>Payment Type:</strong>{data.type}</li>
              <li><strong>Receiver Wallet:</strong>{data.walletId}</li>
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
