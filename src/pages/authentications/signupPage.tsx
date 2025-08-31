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

interface Login1Props {
  heading?: string;
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const formZodSchema = z
  .object({
    name: z
      .string({ message: "name must be a string" })
      .min(3, { message: "name must be at least three character" })
      .max(50, { message: "name should contain maximum 50 chacacter" }),
    email: z
      .string({ message: "Invalid email address formate" })
      .min(5, { message: "email should be at least 5 character" })
      .max(50, { message: "email should contain maximum 50 chacacter" })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password: z
      .string({ message: "Invalid password type" })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:;<>,.?~\\/-]).{8,}$/,
        "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character"
      ),
    confirmPassword: z
      .string({ message: "Invalid password type" })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:;<>,.?~\\/-]).{8,}$/,
        "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character"
      ),
    role: z
      .enum(["USER", "AGENT"])
      .refine((val) => val === "USER" || val === "AGENT", {
        message: "Role is required",
      }),
    phone: z
      .string({ message: "Invalid phone type" })
      .regex(
        /^(?:\+880|880|0)1[3-9]\d{8}$/,
        "Invalid Bangladeshi phone number format"
      ),
    address: z
      .string({ message: "Invalid address type" })
      .max(200, { message: "Addres must no more than 200 character" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

const SignupPage = ({
  heading = "Sign Up",
  signupText = "Already have an account?",
  signupUrl = "/signin",
}: Login1Props) => {
  // Hooks
  const navigator = useNavigate();
  const [singUp, { isLoading }] = useCreateUserMutation();

  // default values
  const form = useForm<z.infer<typeof formZodSchema>>({
    resolver: zodResolver(formZodSchema),
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
  const onSubmit = async (value: z.infer<typeof formZodSchema>) => {
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
        navigator("/verify", { state: res.data.email});
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
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        {/* Logo */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-20 lg:justify-start">
          <div className="w-full flex flex-col items-center text-center">
            {/* Logo centered */}
            <Link to={"/"} className="mb-4">
              <MatirPayLogo />
            </Link>

            {/* Text and link centered */}
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <p>{signupText}</p>
              <Link
                to={signupUrl}
                className="text-primary font-medium hover:underline"
              >
                SignIn
              </Link>
            </div>
          </div>

          <div className="">
            <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-5 py-10 shadow-md">
              {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input required placeholder="Full name" {...field} />
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
                        <FormControl>
                          <PasswordToggler {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
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
                  <Button disabled={isLoading} className="cursor-pointer" type="submit">
                    Submit
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
