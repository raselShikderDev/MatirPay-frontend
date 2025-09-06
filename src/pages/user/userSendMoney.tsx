import { useState } from "react";
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
import { userTransactionZodSchema } from "@/schema/userSchmea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserSendMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { SendConfirmationModal } from "@/components/module/universal/sendConfirmationModal";
import { transactionTypeText } from "@/constrants/constrants";
import { DollarSign, Wallet } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { TansactionType } from "@/types";
import ConfirmationMessage, {
  type TransactionDetails,
} from "@/components/module/universal/confrimMessage";
import { LoadingSpinner } from "@/components/loading";

interface IPayload {
  amount: number;
  toWallet: string;
}

const UserSendMoney = () => {
  const [userSendMoney, { isLoading }] = useUserSendMoneyMutation();
  const [payload, setPayload] = useState<IPayload | null>(null);
  const [confirmMessage, setConfirmMessage] =
    useState<TransactionDetails | null>(null);
  const [confirmStatus, setConfirmStatus] = useState<boolean>(false);
  const [isShowForm, setIsShowForm] = useState<boolean>(true);

  const form = useForm<z.infer<typeof userTransactionZodSchema>>({
    resolver: zodResolver(userTransactionZodSchema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      toWallet: "",
    },
  });

  const handleSendMoney = async () => {
    if (!payload) return;
    try {
      const res = await userSendMoney(payload).unwrap();
      // eslint-disable-next-line no-console
      console.log(...res.data);
      if (res.success) {
        setConfirmMessage(res.data[0]);
        setConfirmStatus(res.success);
        setIsShowForm(false);
        form.reset();
        const toastId = toast.loading("Sending Money processing...");
        toast.success("Send Money successfully processed", { id: toastId });
      }
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(error);
      form.reset();
      setIsShowForm(false);
      toast.error("Send Money falied");
    }
  };

  const onsubmit = (value: z.infer<typeof userTransactionZodSchema>) => {
    // eslint-disable-next-line no-console
    console.log(value);
    const payload: IPayload = {
      amount: Number(value.amount),
      toWallet: value.toWallet,
    };
    setPayload(payload);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 bg-white dark:bg-gray-800">
        {isLoading && !isShowForm && <LoadingSpinner />}
        {!isShowForm && (
          <ConfirmationMessage
            transaction={confirmStatus ? confirmMessage : null}
            status={confirmStatus}
            setIsShowForm={() => setIsShowForm(true)}
          />
        )}

        {isShowForm && (
          <>
            <CardHeader>
              <CardTitle className="text-xl">Send Money</CardTitle>
              <CardDescription>
                Enter recipient wallet ID and amount to Send money.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onsubmit)}
                  className="w-full space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="toWallet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wallet ID</FormLabel>
                        <div className="relative">
                          <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <FormControl>
                            <Input
                              required
                              className="w-full pl-10"
                              placeholder="Enter recipient wallet ID"
                              {...field}
                            />
                          </FormControl>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <div className="flex flex-col gap-1 relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <FormControl>
                            <Input
                              required
                              className="w-full pl-10"
                              placeholder="Enter amount"
                              {...field}
                            />
                          </FormControl>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {payload ? (
                    <SendConfirmationModal
                      onConfirm={() => handleSendMoney()}
                      data={{
                        amount: payload.amount,
                        walletId: payload.toWallet,
                        type: transactionTypeText.sendMoney as TansactionType,
                      }}
                    >
                      <Button
                        className="cursor-pointer dark:text-white"
                        type="submit"
                        variant={"default"}
                        disabled={isLoading}
                      >
                        Send Money
                      </Button>
                    </SendConfirmationModal>
                  ) : (
                    <Button
                      disabled={isLoading}
                      className="cursor-pointer dark:text-white"
                      type="submit"
                      variant={"default"}
                    >
                      Send Money
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

export default UserSendMoney;
