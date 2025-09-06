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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ISignUp } from "@/types/auth.type";
import { toast } from "sonner";
import { useCreateUserMutation } from "@/redux/features/auth/auth.api";
import { signUpFormZodSchema } from "@/schema/userSchmea";

interface SignUpProps {
  heading?: string;
  buttonText?: string;
  googleText?: string;
  sinInText?: string;
  signInUrl?: string;
}

const SignupPage = ({
  heading = "Sign Up",
  sinInText = "Already have an account?",
  signInUrl = "/signin",
}: SignUpProps) => {
  // Hooks
  const navigator = useNavigate();
  const [singUp, { isLoading }] = useCreateUserMutation();

  // default values
  const form = useForm<z.infer<typeof signUpFormZodSchema>>({
    resolver: zodResolver(signUpFormZodSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "USER",
      phone: "",
      address: "",
    },
  });

  //Handling onsubmit
  const onSubmit = async (value: z.infer<typeof signUpFormZodSchema>) => {
    console.log(value);

    const payload: ISignUp = {
      name: value.name,
      email: value.email,
      password: value.password,
      role: value.role,
      phone: value.phone,
      address: value.address,
    };

    try {
      const res = await singUp(payload).unwrap();
      console.log(res.data);
      if (res.success) {
        const toastId = toast.loading("Signing up");
        toast.success("Successfully Signed up", { id: toastId });
        navigator("/verify", { state: res.data.email });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error("Sign up falied");
    }
  };

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <section className="bg-muted h-screen dark:bg-blue-950/50">
      <div className="flex h-full items-center justify-center">
        {/* Logo */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-20 lg:justify-start">
          <div className="w-full flex flex-col items-center text-center">
            {/* Logo centered */}
            <Link to={"/"} className="mb-4">
              <MatirPayLogo />
            </Link>

            {/* Text and link centered */}
            <div className="text-muted-foreground flex items-center gap-1 text-sm ">
              <p>{sinInText}</p>
              <Link
                to={signInUrl}
                className="text-primary font-medium hover:underline"
              >
                SignIn
              </Link>
            </div>
          </div>

          <div className="">
            <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center rounded-md border px-5 py-3 shadow-md dark:bg-gray-900">
              {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-2"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-muted-foreground text-sm">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input className="py-0" required placeholder="Full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground text-sm">
                          Email
                        </FormLabel>
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
                        <FormLabel className="text-muted-foreground text-sm">
                          Password
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
                        <FormLabel className="text-muted-foreground text-sm">
                          Confirm Password
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
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground text-sm">
                          Role
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select your Role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USER">USER</SelectItem>
                            <SelectItem value="AGENT">AGENT</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground text-sm">
                          Phone
                        </FormLabel>
                        <FormControl>
                          <Input required placeholder="Your Phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground text-sm">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            required
                            placeholder="Full address"
                            {...field}
                          />
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
                    SignUp
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
