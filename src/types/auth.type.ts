export interface ICreateUser {
  name: string
  email: string
  password: string
  role: "USER" | "AGENT"
}

export interface ISendOtp {
    email:string
}

export interface ILogin{
    email:string,
    password:string,
}


 export interface IVerifyOtp {
  email: string
  otp: string
}

 export type TRole = "USER" | "ADMIN" | "SUPER_ADMIN" | "AGENT"

 type TStatus ="ACTIVE" | "DEACTIVE" | "SUSPENDED" | "BLOCKED"


 export interface IUser{
    _id: string;
    name: string;
    email: string;
    role: TRole
    isDeleted: boolean;
    status: TStatus
    isVerified: boolean;
    auths: {
      provider: "Credentials" | "Google";
      providerId: string;
    }[];
    isAgentApproved: boolean;
    createdAt: string;
    updatedAt: string;
    walletId: string;
  };


export interface ILogInRespone {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}


export interface ISignUp{
  name: string;
  email: string;
  password: string;
  role: "USER" | "AGENT";
  phone: string;
  address: string;
}




