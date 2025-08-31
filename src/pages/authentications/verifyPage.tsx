import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { useSendVerifyOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import type { ISendOtp, verifyOTP } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

const VerifyPage = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const [email] = useState(location.state);
  const [confrimed, setConfrimed] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(5);

  const [sendOtp, { isLoading }] = useSendVerifyOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  // OTP zod schema
  const formSchema = z.object({
    otp: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  // Default value of otp
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // handling send otp timer
  useEffect(() => {
    if (email && confrimed) {
      const timerId = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [email, confrimed]);

  // Handing send OTP
  const handleSendOtp = async () => {
    const data: ISendOtp = {
      email: email,
    };
    try {
      const res = await sendOtp(data).unwrap();
      // eslint-disable-next-line no-console
      console.log(res);
      
      if (res.success) {
        const toastId = toast.loading("Sending OTP");
        toast.success("OTP successfully sent", { id: toastId });
        setTimer(5);
        setConfrimed(true);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error("OTP sending failed");
    }
  };

  // Protecting route by checikng email
  useEffect(() => {
    if (!email) {
      navigator("/signin");
    }
  }, [email, navigator]);

  // handling otp verification by handleOtpSubmit
  const handleOtpSubmit = async (data: z.infer<typeof formSchema>) => {
    
    const paylaod: verifyOTP = {
      email: email,
      otp: data.otp,
    };
        // eslint-disable-next-line no-console
console.log(paylaod);
    try {
      const res = await verifyOtp(paylaod).unwrap();
      // eslint-disable-next-line no-console
      console.log(res);
      
      if (res.success) {
        const toastId = toast.loading("Verifying OTP");
        toast.success("OTP successfully verified", { id: toastId });
        navigator("/")
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error("OTP verifying failed");
    }
  };

  return (
    <div className="grid place-content-center h-screen">
      {confrimed ? (
        <Card>
          <CardHeader>
            <CardTitle>Verify your account</CardTitle>
            <CardDescription>
              Send 6 digit OTP code to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleOtpSubmit)}
                className=" space-y-6"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="w-fit">
                        Please enter the one-time password sent to your phone.
                      </FormDescription>
                      <div className="text-center">
                        <Button
                          onClick={handleSendOtp}
                          disabled={timer !== 0}
                          className={cn("p-0, m-0", {
                            "cursor-pointer": timer === 0,
                            "text-gray-500": timer !== 0,
                          })}
                          type="button"
                          variant={"link"}
                        >
                          Resend OTP :
                        </Button>
                        {timer}
                      </div>
                    </FormItem>
                  )}
                />
                <div className="text-right">
                  <Button className="cursor-pointer" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              We will send you an OTP at <br /> {email}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button
              disabled={isLoading}
              onClick={handleSendOtp}
              className="w-[300px] cursor-pointer"
            >
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default VerifyPage;
