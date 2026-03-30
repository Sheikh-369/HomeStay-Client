import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessageData, IMessageSliceState } from "./message-slice-type";
import { AppDispatch } from "../store";
import { Status } from "../../global/type";
import API from "../../http/API";
import APIWITHTOKEN from "../../http/APIWithToken";

const initialState: IMessageSliceState = {
  messages: [],
  status: Status.IDLE,
};

const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    setMessages(state: IMessageSliceState, action: PayloadAction<IMessageData[]>) {
      state.messages = action.payload;
    },
    setStatus(state: IMessageSliceState, action: PayloadAction<Status>) {
      state.status = action.payload;
    }
  },
});

export const { setMessages, setStatus } = messageSlice.actions;
export default messageSlice.reducer;

// ****************** CREATE MESSAGE THUNK **************************
export function createMessage(messageData: IMessageData) {
  return async function createMessageThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("message", messageData);
      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        return { success: true, message: response.data.message };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data.message || "Failed to send message" };
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Error occurred" };
    }
  };
}

// ****************** FETCH ALL MESSAGES THUNK **************************
export function fetchMessages() {
  return async function fetchMessagesThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("message");
      if (response.status === 200) {
        dispatch(setMessages(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// ****************** DELETE MESSAGE THUNK **************************
export function deleteMessage(id: string) {
  return async function deleteMessageThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.delete(`message/${id}`);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchMessages())
        return { success: true, message: response.data.message };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data.message };
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Delete failed" };
    }
  };
}