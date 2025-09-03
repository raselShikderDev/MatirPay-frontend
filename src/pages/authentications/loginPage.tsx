/* eslint-disable no-console */
import { MatirPayLogo } from "@/components/module/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordToggler from "@/components/passwordToggler";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import type { ILogin } from "@/types";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/loading";
import { LoginformZodSchema } from "@/schema/userSchmea";

interface Login1Props {
  heading?: string;
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}




const Login = ({
  heading = "Login",
  signupText = "Need an account?",
  signupUrl = "/signup",
}: Login1Props) => {
  // Hooks
  const [logIn, { isLoading }] = useLoginMutation();
  const navigator = useNavigate();

  // default values
  const form = useForm<z.infer<typeof LoginformZodSchema>>({
    resolver: zodResolver(LoginformZodSchema),
    mode:"onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //Handling onsubmit
  const onSubmit = async (value: z.infer<typeof LoginformZodSchema>) => {
    console.log(value);
    const payload: ILogin = {
      email: value.email,
      password: value.password,
    };
    try {
      const res = await logIn(payload).unwrap();
      console.log(res.data);
      if (res.success) {
        const toastId = toast.loading("Logging in");
        toast.success("Successfully logged in", { id: toastId });
        navigator(`/`);
      }

      // console.log("res.data?.message: ", res.data?.message);
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("In my error block", error);
      
      if (error.data.message === "User is not verified") {
        toast.error("Your account is not verified.");
        navigator("/verify", { state: value.email });
      }

      if (error.data.message === "Password is invalid") {
        toast.error("Your password is not valid");
        return;
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner/>
  }

  return (
    <section className="bg-muted h-screen dark:bg-blue-950/50">
      <div className="flex h-full items-center justify-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <Link to={"/"}>
            <MatirPayLogo />
          </Link>
          <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-5 py-8 shadow-md dark:bg-gray-900">
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input required placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordToggler {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoading}
                  className="cursor-pointer"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <Link
              to={signupUrl}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
