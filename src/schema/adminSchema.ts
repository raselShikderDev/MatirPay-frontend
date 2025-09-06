import z from "zod";

export const walletIdZodSchema = z
  .object({
    WalletId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid Wallet Id"),
  })


export const userIdZodSchema = z
  .object({
    userId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid Wallet Id"),
  })


  export const usersFilterFormSchema = z.object({
    filter: z.string(),
  });