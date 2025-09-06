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
import type { IResetPassword } from "@/types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import PasswordUpdatedConfirmMessage from "@/components/module/authentications/passwordUpdatedConfirmMessage";
import { LoadingSpinner } from "@/components/loading";
import { PasswordChangedConfirmationModal } from "@/components/module/authentications/passwordUpdatedConfirmationModal";
import { resetPasswordFormZodSchema } from "@/schema/userSchmea";
import { useResetPasswordMutation } from "@/redux/features/auth/auth.api";
import { useSearchParams } from "react-router";

interface resetPasswordProps {
  heading?: string;
}

const ResetPasswordPage = ({
  heading = "Reset your password",
}: resetPasswordProps) => {
  const [confirmStatus, setConfirmStatus] = useState<boolean>(false);
  const [isShowForm, setIsShowForm] = useState<boolean>(true);

  // Hooks
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [payload, setPayload] = useState<IResetPassword | null>(null);
  const [searchParams] = useSearchParams();

 const resetToken = searchParams.get("resetToken");
    const id = searchParams.get("id");
  // default values
  const form = useForm<z.infer<typeof resetPasswordFormZodSchema>>({
    resolver: zodResolver(resetPasswordFormZodSchema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  //Handling onsubmit
  const onSubmit = async (
    value: z.infer<typeof resetPasswordFormZodSchema>
  ) => {
    setPayload({
      newPassword: value.newPassword,
      id: id as string,
    });
    console.log(value);
  };

  const handleUpdatePassword = async () => {
   
    if (!payload || !resetToken) {
      console.error("fullfill requirment first");

      return;
    }
    try {
      const res = await resetPassword({
        payload,
        resetToken: resetToken,
      }).unwrap();
      console.log(res.data);
      if (res.success) {
        const toastId = toast.loading("Reseting password..");
        toast.success("Successfully reset password", { id: toastId });
        setConfirmStatus(true);
        setIsShowForm(false);
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Reseting password is falied");
      console.error(error);
      setIsShowForm(false);
      setConfirmStatus(false);
    }
  };

  return (
    <section className="bg-muted h-screen dark:bg-blue-950/50">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-20 lg:justify-start">
          <div className="">
            <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-5 py-10 shadow-md dark:bg-gray-900">
              {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
              {isLoading && <LoadingSpinner />}
              {!isShowForm && (
                <PasswordUpdatedConfirmMessage
                  status={confirmStatus}
                  setIsShowForm={() => setIsShowForm(true)}
                />
              )}
              {isShowForm && !isLoading && (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="newPassword"
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
                    <PasswordChangedConfirmationModal
                      onConfirm={() => handleUpdatePassword()}
                    >
                      <Button
                        className="cursor-pointer dark:text-white"
                        type="submit"
                        variant={"default"}
                        disabled={!form.formState.isValid || isLoading}
                      >
                        Update
                      </Button>
                    </PasswordChangedConfirmationModal>
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

export default ResetPasswordPage;
