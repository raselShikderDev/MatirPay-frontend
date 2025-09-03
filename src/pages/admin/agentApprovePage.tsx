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
import { Wallet } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { walletIdZodSchema } from "@/schema/adminSchema";
import { useState } from "react";
import { useApproveAgentMutation } from "@/redux/features/users/user.api";
import { ApprovalConfirmationModal } from "@/components/approvalConfirmationModal";

const AgentApprovePage = () => {
  const [payload, setPayload] = useState<string | null>(null);
  const [isShowForm, setIsShowForm] = useState<boolean>(true);
  const [approveAgent] = useApproveAgentMutation();
  const form = useForm<z.infer<typeof walletIdZodSchema>>({
    resolver: zodResolver(walletIdZodSchema),
    mode: "onChange",
    defaultValues: {
      WalletId: "",
    },
  });

  const isLoading = false;

  const handleApprove = async () => {
    if (!payload) return;
    try {
      const res = await approveAgent(payload).unwrap();
      // eslint-disable-next-line no-console
      console.log(res);
      if (res.success) {
        form.reset();
        setIsShowForm(false)
        const toastId = toast.loading("Approving agent is processing...");
        toast.success("Agent successfully Approved", { id: toastId });
      }
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error);
      setIsShowForm(false)
      form.reset();
      toast.error("Approving agent falied");
    }
  };

  const onHandleSubmit = (value: z.infer<typeof walletIdZodSchema>) => {
    // eslint-disable-next-line no-console
    console.log(value);
    setPayload(value.WalletId);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 bg-white dark:bg-gray-800">
        {!isShowForm && (
          <ApprovedMessage
            status={confirmStatus}
            setIsShowForm={() => setIsShowForm(true)}
          />
        )}

        {isShowForm && (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Cash In</CardTitle>
              <CardDescription>
                Enter recipient wallet ID and the amount you want to cash In.
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
                    name="WalletId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wallet ID</FormLabel>
                        <div className="flex flex-col gap-1 relative">
                          <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <FormControl>
                            <Input
                              required
                              className="w-full pl-10"
                              placeholder="Wallet ID"
                              {...field}
                            />
                          </FormControl>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {payload ? (
                    <ApprovalConfirmationModal
                      onConfirm={() => handleApprove()}
                    >
                      <Button
                        className="cursor-pointer dark:text-white"
                        type="submit"
                        variant={"default"}
                        disabled={isLoading}
                      >
                        Approve
                      </Button>
                    </ApprovalConfirmationModal>
                  ) : (
                    <Button
                      disabled={isLoading}
                      className="cursor-pointer dark:text-white"
                      type="submit"
                      variant={"default"}
                    >
                      Approve
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

export default AgentApprovePage;
