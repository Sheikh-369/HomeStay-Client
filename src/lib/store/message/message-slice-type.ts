import { Status } from "../../global/type";

export interface IMessageData {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
  read?: boolean;
}

export interface IMessageSliceState {
  messages: IMessageData[];
  status: Status;
}