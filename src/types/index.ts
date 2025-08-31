export type { ISendOtp, ILogin, IVerifyOtp, ILogInRespone, TRole, IUser} from "@/types/auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
