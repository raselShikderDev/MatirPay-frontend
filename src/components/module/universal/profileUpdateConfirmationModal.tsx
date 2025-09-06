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
} from "@/components/ui/alert-dialog";
import type { ReactNode } from "react";

interface IUpdateProfileConfirmationData {
  name: string;
  phone: string;
  address: string;
}

interface IProps {
  children: ReactNode;
  onConfirm: () => void;
  data: IUpdateProfileConfirmationData;
}

export function ProfileUpdateConfirmationModal({
  children,
  onConfirm,
  data,
}: IProps) {
  const handleConfrim = () => {
    onConfirm();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Update</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure you want to update
            profile by following details?
            <ul className="mt-4 space-y-1.5 text-sm text-left">
              <li>
                <strong>Name: </strong>
                {data.name}
              </li>
              <li>
                <strong>Phone: </strong>
                {data.phone}
              </li>
              <li>
                <strong>Address: </strong>
                {data.address}
              </li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleConfrim}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
