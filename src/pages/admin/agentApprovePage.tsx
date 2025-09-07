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
import { useApproveAgentMutation } from "@/redux/features/users/user.api";
import { ApprovalConfirmationModal } from "@/components/module/admin/approvalConfirmationModal";
import ApprovedMessage from "@/components/module/admin/approvedMessage";
import { LoadingSpinner } from "@/components/loading";

const AgentApprovePage = () => {
  const [payload, setPayload] = useState<string | null>(null);
  const [confirmStatus, setConfirmStatus] = useState<boolean>(false);
  const [isShowForm, setIsShowForm] = useState<boolean>(true);
  const [approveAgent] = useApproveAgentMutation();
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
      const res = await approveAgent(payload).unwrap();

      if (res.success) {
        form.reset();
        setIsShowForm(false);
        setConfirmStatus(res.success);
        const toastId = toast.loading("Approving agent is processing...");
        toast.success("Agent successfully Approved", { id: toastId });
      }
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error);
      setIsShowForm(false);
      form.reset();
      toast.error("Approving agent falied");
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
          <ApprovedMessage
            status={confirmStatus}
            setIsShowForm={() => setIsShowForm(true)}
          />
        )}

        {isShowForm && (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Approve agent</CardTitle>
              <CardDescription>
                Enter Agent ID you want to aprrove as agent.
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
