export const Roles = {
  user: "USER",
  admin: "ADMIN",
  superAdmin: "SUPER_ADMIN",
  agent: "AGENT",
};

export const transactionTypeText = {
  sendMoney: "Send Money", // when user send money to another user
  cashOut: "Cash Out", // when user cash out it will be cash out for usser but Agent actually reciveing for agent CASH_OUT == receiving cash
  cashIn: "Cash In",
};

export const TtransactionTypeValueBackend = {
    sendMoney:"SEND_MONEY", 
    cashOut: "CASH_OUT",
    cashIn: "CASH_IN", 
}
