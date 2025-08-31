import type { ComponentType } from "react";

export type { ISendOtp, ILogin, IVerifyOtp, ILogInRespone, TRole, IUser} from "@/types/auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}


export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    Component: ComponentType;
  }[];
}