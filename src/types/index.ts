import type { ComponentType } from "react";

export type {
  ISendOtp,
  ILogin,
  IVerifyOtp,
  ILogInRespone,
  TRole,
  IUser,
} from "@/types/auth.type";
export type {
  TansactionType,
  TransactionDetails,
} from "@/types/transactionstypes";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
  };
}

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    Component: ComponentType;
  }[];
}
