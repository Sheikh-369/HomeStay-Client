import { Status } from "../../global/type";

// Single Room Data
export interface IRoomData {
  id?: string;
  roomNumber: string;
  floor: string;
  roomType: string;
  capacity: number;
  features: string[];
  rent: string;
  status: "Occupied" | "Vacant";
  createdAt?: string;
  updatedAt?: string;
}

// Redux Slice State
export interface IRoomSliceState {
  rooms: IRoomData[];
  status: Status;
}