/* eslint-disable no-console */
import { MatirPayLogo } from "@/components/module/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import PasswordToggler from "@/components/passwordToggler";



interface Login1Props {
  heading?: string;
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

// const formZodSchema = z.object({
//   name: z
//     .string({ message: "name must be a string" })
//     .min(3, { message: "name must be at least three character" })
//     .max(50, { message: "name should contain maximum 50 chacacter" }),
//   email: z
//     .string({ message: "Invalid email address formate" })
//     .min(5, { message: "email should be at least 5 character" })
//     .max(50, { message: "email should contain maximum 50 chacacter" })
//     .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
//   password: z
//     .string({ message: "Invalid password type" })
//     .regex(
//       /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:;<>,.?~\\/-]).{8,}$/,
//       "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character",
//     ),
//   role: z
//     .enum(["USER", "AGENT"])
//     .refine((val) => val === "USER" || val === "AGENT", {
//       message: "Role is required",
//     }),
//   phone: z
//     .string({ message: "Invalid phone type" })
//     .regex(
//       /^(?:\+880|880|0)1[3-9]\d{8}$/,
//       "Invalid Bangladeshi phone number format",
//     )
//     .optional(),
//   address: z
//     .string({ message: "Invalid address type" })
//     .max(200, { message: "Addres must no more than 200 character" })
//     .optional(),
// });

const formZodSchema = z.object({
  email: z
    .string({ message: "Invalid email address formate" })
    .min(5, { message: "email should be at least 5 character" })
    .max(50, { message: "email should contain maximum 50 chacacter" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  password: z
    .string({ message: "Invalid password type" })
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:;<>,.?~\\/-]).{8,}$/,
      "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character",
    )
});


const Login = ({
  heading = "Login",
  signupText = "Need an account?",
  signupUrl = "/sign-up",
}: Login1Props) => {


const form = useForm({
    resolver: zodResolver(formZodSchema),
    defaultValues:{
        email:"",
        password:"Type your email"
    }
})


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSubmit = async (value:any)=>{
    console.log(value);
    
}



  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <Link to={"/"}>
            <MatirPayLogo/>
          </Link>
          <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
          name="email"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
          </div>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <a
              href={signupUrl}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login
