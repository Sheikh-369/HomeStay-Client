// booking-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { PaymentStatus, Status } from "../../global/type";
import API from "../../http/API";
import { IBookingData, IBookingSliceState } from "./booking-slice-type";
import APIWITHTOKEN from "../../http/APIWithToken";

// ----------------- INITIAL STATE -----------------
const initialState: IBookingSliceState = {
  bookingData: [],
  status: Status.IDLE,
};

// ----------------- SLICE -----------------
const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    setBookingData(state: IBookingSliceState, action: PayloadAction<IBookingData[]>) {
      state.bookingData = action.payload;
    },
    setStatus(state: IBookingSliceState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setBookingData, setStatus } = bookingSlice.actions;
export default bookingSlice.reducer;

// ----------------- THUNKS -----------------

// Fetch all bookings (admin)
export function fetchAllBookings() {
  return async function fetchAllBookingsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("booking");

      if (response.status === 200) {
        dispatch(setBookingData(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return { success: true };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data.message || "Fetch failed" };
      }
    } catch (error: any) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Fetch failed" };
    }
  };
}

// 1️⃣ Create Booking (user) → handles file uploads
export function createBooking(bookingFormData: IBookingData) {
  return async function createBookingThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("booking", bookingFormData, {
        headers: { "Content-Type": "multipart/form-data" }, // simple, works
      });

      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchAllBookings())
        return { success: true, message: response.data.message };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data.message || "Something went wrong" };
      }
    } catch (error: any) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Booking creation failed" };
    }
  };
}

// 2️⃣ Admin Update Booking (payment verification)
export function adminUpdateBooking(id: string, paymentStatus: PaymentStatus) {
  return async function adminUpdateBookingThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch(`booking/${id}`, { paymentStatus });

      if (response.status === 200) {
        // Update slice with the updated booking
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchAllBookings())
        return { success: true, message: response.data.message };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data.message || "Update failed" };
      }
    } catch (error: any) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Update failed" };
    }
  };
}

// 3️⃣ Admin Delete Booking
export function adminDeleteBooking(id: string) {
  return async function adminDeleteBookingThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.delete(`booking/${id}`);

      if (response.status === 200) {
        // Remove booking from slice state
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchAllBookings())
        return { success: true, message: response.data.message };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data.message || "Delete failed" };
      }
    } catch (error: any) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Delete failed" };
    }
  };
}