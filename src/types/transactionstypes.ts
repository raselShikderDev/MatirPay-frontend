export const transactionTypeText = {
  sendMoney: "Send Money", // when user send money to another user
  cashOut: "Cash Out", // when user cash out it will be cash out for usser but Agent actually reciveing for agent CASH_OUT == receiving cash
  cashIn: "Cash In",
};

export type TInitiatedByType = "USER" | "AGENT";

export type TansactionType = "Send Money" | "Cash Out" | "Cash In";

export interface TransactionDetails {
  _id: string;
  user: string;
  amount: number;
  type: "SEND_MONEY" | "CASH_OUT" | "CASH_IN";
  initiatedBy: TInitiatedByType;
  fromWallet: string;
  toWallet: string;
  createdAt: string;
  updatedAt: string;
}
