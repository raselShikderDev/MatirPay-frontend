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


interface IUpdateProfileConfirmationData{
  name: number,
  phone: string,
  address: string,
}

interface IProps{
    children:ReactNode,
    onConfirm:()=> void,
    data:IUpdateProfileConfirmationData,
}




export function ProfileUpdateConfirmationModal({children, onConfirm, data}:IProps) {
// eslint-disable-next-line no-console
console.log("Data wating for confirmation", data)
  const handleConfrim = ()=>{
      onConfirm()
      // eslint-disable-next-line no-console
      console.log("Successfully Updated :", data)
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
            Are you sure you want to update profile by following details?
            <ul className="mt-4 space-y-1.5 text-sm text-left">
              <li><strong>Name: </strong>{data.name}</li>
              <li><strong>Phone: </strong>{data.phone}</li>
              <li><strong>Address: </strong>{data.address}</li>
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
