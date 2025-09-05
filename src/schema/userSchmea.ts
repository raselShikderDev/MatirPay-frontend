import z from "zod";

export const userTransactionZodSchema = z
  .object({
    amount: z.string({ message: "amount must be number" }),
    toWallet: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid Wallet Id"),
  })
  .refine(({ amount }) => Number(amount) >= 100, {
    message: "Amount at least 100 tk",
    path: ["amount"],
  });

export const HistoryFilterFormSchema = z.object({
  filter: z.string(),
});

export const LoginformZodSchema = z.object({
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
});

export const signUpFormZodSchema = z
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

export const profileUpdateFormZodSchema = z.object({
  name: z
    .string({ message: "name must be a string" })
    .min(3, { message: "name must be at least three character" })
    .max(50, { message: "name should contain maximum 50 chacacter" }),
  phone: z
    .string({ message: "Invalid phone type" })
    .regex(
      /^(?:\+880|880|0)1[3-9]\d{8}$/,
      "Invalid Bangladeshi phone number format"
    ),
  address: z
    .string({ message: "Invalid address type" })
    .max(200, { message: "Addres must no more than 200 character" }),
});

export const updatePasswordFormZodSchema = z
  .object({
    oldPassword: z
      .string({ message: "Invalid password type" })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:;<>,.?~\\/-]).{8,}$/,
        "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character"
      ),
    newPassowrd: z
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
  })
  .refine((data) => data.newPassowrd === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export const resetPasswordFormZodSchema = z
  .object({
    newPassword: z
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
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });


  export const forgetPasswordFormZodSchema =z.object({
    email: z
      .string({ message: "Invalid email address formate" })
      .min(5, { message: "email should be at least 5 character" })
      .max(50, { message: "email should contain maximum 50 chacacter" })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  })