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
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { LoadingSpinner } from "@/components/loading";
import { forgetPasswordFormZodSchema } from "@/schema/userSchmea";
import { Input } from "@/components/ui/input";
import type { IForgetPassword } from "@/types";
import { useForgetPasswordMutation } from "@/redux/features/auth/auth.api";
import { ForgetPasswordConfirmationModal } from "@/components/module/authentications/forgetPasswordConfirmationModal";
import ForgetPasswordConfirmMessage from "@/components/module/authentications/forgetPasswordConfirmMessage";

interface forgetPasswordProps {
  heading?: string;
}

const ForgetPasswordPage = ({
  heading = "Send me a password reset email",
}: forgetPasswordProps) => {
  const [confirmStatus, setConfirmStatus] = useState<boolean>(false);
  // const [timer, setTimer] = useState<number>(60 * 5);
  const [isShowForm, setIsShowForm] = useState<boolean>(true);
  // Hooks
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const [payload, setPayload] = useState<IForgetPassword | null>(null);

  // default values
  const form = useForm<z.infer<typeof forgetPasswordFormZodSchema>>({
    resolver: zodResolver(forgetPasswordFormZodSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  //Handling onsubmit
  const onSubmit = async (
    value: z.infer<typeof forgetPasswordFormZodSchema>
  ) => {
    setPayload({
      email: value.email,
    });
  };

  const handleForgetPassword = async () => {
    if (!payload || !payload.email) {
      return;
    }
    try {
      const res = await forgetPassword(payload).unwrap();
   
      if (res.success) {
        const toastId = toast.loading("Sending forget password email..");
        toast.success("Successfully sent forget password email", {
          id: toastId,
        });
        setConfirmStatus(true);
        setIsShowForm(false);
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Sending email is falied");
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
              {heading && <h1 className="text-xl pb-4 font-semibold">{heading}</h1>}
              {isLoading && <LoadingSpinner />}
              {!isShowForm && (
                <ForgetPasswordConfirmMessage
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              required
                              placeholder="Your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <ForgetPasswordConfirmationModal
                      onConfirm={() => handleForgetPassword()}
                      email={payload?.email as string}
                    >
                      <Button
                        className="cursor-pointer dark:text-white"
                        variant={"default"}
                        type="submit"
                         disabled={!form.formState.isValid || isLoading}
                      >
                        Send
                      </Button>
                    </ForgetPasswordConfirmationModal>
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

export default ForgetPasswordPage;
