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
