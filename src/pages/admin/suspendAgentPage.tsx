import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { userIdZodSchema } from "@/schema/adminSchema";
import { useState } from "react";
import { LoadingSpinner } from "@/components/loading";
import { useSuspendAgentMutation } from "@/redux/features/users/user.api";
import SuspendedMessage from "@/components/module/admin/suspendedMesseage";
import { SuspendConfirmationModal } from "@/components/module/admin/suspendConfirmatoinModal";

const AgentSuspendPage = () => {
  const [payload, setPayload] = useState<string | null>(null);
  const [confirmStatus, setConfirmStatus] = useState<boolean>(false);
  const [isShowForm, setIsShowForm] = useState<boolean>(true);
  const [suspendAgent] = useSuspendAgentMutation();
  const form = useForm<z.infer<typeof userIdZodSchema>>({
    resolver: zodResolver(userIdZodSchema),
    mode: "onChange",
    defaultValues: {
      userId: "",
    },
  });

  const isLoading = false;

  const handleApprove = async () => {
    if (!payload) return;
    try {
      const res = await suspendAgent(payload).unwrap();

      if (res.success) {
        form.reset();
        setIsShowForm(false);
        setConfirmStatus(res.success);
        const toastId = toast.loading("Agent suspening is processing...");
        toast.success("Agent successfully suspended", { id: toastId });
      }
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error);
      setIsShowForm(false);
      form.reset();
      toast.error("Suspending agent falied");
    }
  };

  const onHandleSubmit = (value: z.infer<typeof userIdZodSchema>) => {

    setPayload(value.userId);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 bg-white dark:bg-gray-800">
        {isLoading && !isShowForm && <LoadingSpinner />}
        {!isShowForm && (
          <SuspendedMessage
            status={confirmStatus}
            setIsShowForm={() => setIsShowForm(true)}
          />
        )}

        {isShowForm && (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Suspended agent</CardTitle>
              <CardDescription>
                Enter Agent ID you want to suspend as agent.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onHandleSubmit)}
                  className="w-full space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agent ID</FormLabel>
                        <div className="flex flex-col gap-1 relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <FormControl>
                            <Input
                              required
                              className="w-full pl-10"
                              placeholder="Agent ID"
                              {...field}
                            />
                          </FormControl>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {payload ? (
                    <SuspendConfirmationModal
                      onConfirm={() => handleApprove()}
                    >
                      <Button
                        className="cursor-pointer dark:text-white"
                        type="submit"
                        variant={"default"}
                        disabled={isLoading}
                      >
                        Suspend
                      </Button>
                    </SuspendConfirmationModal>
                  ) : (
                    <Button
                      disabled={isLoading}
                      className="cursor-pointer dark:text-white"
                      type="submit"
                      variant={"default"}
                    >
                      Suspend
                    </Button>
                  )}
                </form>
              </Form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default AgentSuspendPage;
