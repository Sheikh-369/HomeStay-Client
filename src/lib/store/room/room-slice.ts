import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoomData, IRoomSliceState } from "./room-slice-type";
import { AppDispatch } from "../store";
import { Status } from "../../global/type";
import APIWITHTOKEN from "../../http/APIWithToken";
import API from "../../http/API";

const initialState: IRoomSliceState = {
  rooms: [],
  status: Status.IDLE,
};

const roomSlice = createSlice({
  name: "roomSlice",
  initialState,
  reducers: {
    setRooms(state: IRoomSliceState, action: PayloadAction<IRoomData[]>) {
      state.rooms = action.payload;
    },
    setStatus(state: IRoomSliceState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setRooms, setStatus } = roomSlice.actions;
export default roomSlice.reducer;

//create room
export function createRoom(roomData: IRoomData) {
  return async function createRoomThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post("room", roomData);

      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchRooms());
        return { success: true, message: response.data.message };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data.message || "Failed to create room" };
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Error occurred" };
    }
  };
}


//fetch all rooms
export function fetchRooms() {
  return async function fetchRoomsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get("room");

      if (response.status === 200) {
        dispatch(setRooms(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//fetch single room
export function fetchRoomById(id: string) {
  return async function fetchRoomByIdThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`room/${id}`);

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        return response.data.data;
      } else {
        dispatch(setStatus(Status.ERROR));
        return null;
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      return null;
    }
  };
}

//update room
export function updateRoom(id: string, roomData: Partial<IRoomData>) {
  return async function updateRoomThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch(`room/${id}`, roomData);

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchRooms());
        return { success: true, message: response.data.message };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data.message || "Failed to update room" };
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Error occurred" };
    }
  };
}

//delete room
export function deleteRoom(id: string) {
  return async function deleteRoomThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.delete(`room/${id}`);

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        return { success: true, message: response.data.message };
      } else {
        dispatch(setStatus(Status.ERROR));
        dispatch(fetchRooms());
        return { success: false, message: response.data.message || "Failed to delete room" };
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Error occurred" };
    }
  };
}