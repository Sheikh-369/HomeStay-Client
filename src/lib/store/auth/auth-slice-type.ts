import { Status } from "../../global/type";

export interface IUserData {
  id?:string;
  userName?: string;
  userEmail: string;
  phoneNumber?: string;
  userPassword?: string;
  confirmPassword?:string;
  profileImage?: string;
  city?: string;
  district?: string;
  country?:string;
  OTP?:string;
  newPassword?:string;
  confirmNewPassword?:string;
  role?:string;
};

export interface IUserSliceState{
    userData:IUserData[],
    selectedUser: IUserData | null; 
    status:Status
}   