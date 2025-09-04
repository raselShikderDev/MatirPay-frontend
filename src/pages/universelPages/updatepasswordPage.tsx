/* eslint-disable no-console */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordToggler from "@/components/passwordToggler";
import { toast } from "sonner";
import { updatePasswordFormZodSchema } from "@/schema/userSchmea";
import type { IUpdatePassword } from "@/types";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { useState } from "react";
import PasswordUpdatedConfirmMessage from "@/components/module/universal/passwordUpdatedConfirmMessage";
import { LoadingSpinner } from "@/components/loading";
import { PasswordChangedConfirmationModal } from "@/components/module/universal/passwordUpdatedConfirmationModal";

interface SignUpProps {
  heading?: string;
}

const UpdatePasswordPage = ({
  heading = "Change your password",
}: SignUpProps) => {
  const [confirmStatus, setConfirmStatus] = useState<boolean>(false);
  const [isShowForm, setIsShowForm] = useState<boolean>(true);
  // Hooks
  const [changePassword, { isLoading }] = useChangePasswordMutation();
    const [payload, setPayload] = useState<IUpdatePassword | null>(null);
  
  // default values
  const form = useForm<z.infer<typeof updatePasswordFormZodSchema>>({
    resolver: zodResolver(updatePasswordFormZodSchema),
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassowrd: "",
      confirmPassword: "",
    },
  });

  //Handling onsubmit
  const onSubmit = async (
    value: z.infer<typeof updatePasswordFormZodSchema>
  ) => {
    console.log(value);

    setPayload({
      oldPassword: value.oldPassword,
      newPassowrd: value.newPassowrd,
    });
  };

  const handleUpdatePassword = async ()=>{
    if (!payload) {
      return;
    }
    try {
      const res = await changePassword(payload).unwrap();
      console.log(res.data);
      if (res.success) {
        const toastId = toast.loading("Chnaging password..");
        toast.success("Successfully password change", { id: toastId });
        setConfirmStatus(true);
        setIsShowForm(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setIsShowForm(false);
      setConfirmStatus(true);
      toast.error("Changing password is falied");
    }
  }

  return (
    <section className="bg-muted h-screen dark:bg-blue-950/50">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-20 lg:justify-start">
          <div className="">
            <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-5 py-10 shadow-md dark:bg-gray-900">
              {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
              {isLoading && !isShowForm && <LoadingSpinner />}
              {!isShowForm && (
                <PasswordUpdatedConfirmMessage
                  status={confirmStatus}
                  setIsShowForm={() => setIsShowForm(true)}
                />
              )}
              {isShowForm && (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="oldPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Old Password
                          </FormLabel>
                          <FormControl>
                            <PasswordToggler {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassowrd"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            New Password
                          </FormLabel>
                          <FormControl>
                            <PasswordToggler {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <PasswordToggler {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {payload ? (
                      <PasswordChangedConfirmationModal
                        onConfirm={() => handleUpdatePassword()}
                      >
                        <Button
                          className="cursor-pointer dark:text-white"
                          type="submit"
                          variant={"default"}
                          disabled={isLoading}
                        >
                          Update
                        </Button>
                      </PasswordChangedConfirmationModal>
                    ) : (
                      <Button
                        disabled={isLoading}
                        className="cursor-pointer dark:text-white"
                        type="submit"
                        variant={"default"}
                      >
                        Update
                      </Button>
                    )}
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatePasswordPage;
