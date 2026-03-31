import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Status } from "../../global/type";
import APIWITHTOKEN from "../../http/APIWithToken";
import { IOccupancyData, IOccupancySliceState } from "./occupancy-slice-type";

// ----------------- INITIAL STATE -----------------
const initialState: IOccupancySliceState = {
  occupancyData: [],
  selectedOccupancy: null,
  status: Status.IDLE,
};

// ----------------- SLICE -----------------
const occupancySlice = createSlice({
  name: "occupancySlice",
  initialState,
  reducers: {
    setOccupancyData(state: IOccupancySliceState, action: PayloadAction<IOccupancyData[]>) {
      state.occupancyData = action.payload;
    },
    setSelectedOccupancy(state: IOccupancySliceState, action: PayloadAction<IOccupancyData | null>) {
      state.selectedOccupancy = action.payload;
    },
    setStatus(state: IOccupancySliceState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setOccupancyData, setSelectedOccupancy, setStatus } = occupancySlice.actions;
export default occupancySlice.reducer;

// ----------------- THUNKS -----------------

// 1️⃣ Fetch All Active Guests (Dashboard Table)
export function fetchActiveGuests() {
  return async function fetchActiveGuestsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("occupancy");
      if (response.status === 200) {
        dispatch(setOccupancyData(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
        return { success: true };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data.message || "Fetch failed" };
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Fetch failed" };
    }
  };
}

// 2️⃣ Check-In Guest (Convert Booking to Occupancy or Walk-in)
export function checkInGuest(formData: FormData) {
  return async function checkInGuestThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post("occupancy", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchActiveGuests()); // Refresh active list
        return { success: true, message: response.data.message };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data.message };
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Check-in failed" };
    }
  };
}

// 3️⃣ Add Interim Payment (Mid-stay payments)
export function addOccupancyPayment(id: string, amount: number) {
  return async function addOccupancyPaymentThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch(`occupancy/payment/${id}`, { amount });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchActiveGuests());
        return { success: true, message: response.data.message };
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Payment update failed" };
    }
  };
}

// 4️⃣ Check-Out Guest (Finalizing Bill & Archiving)
export function checkOutGuest(id: string, finalPayment: number) {
  return async function checkOutGuestThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch(`occupancy/checkout/${id}`, { finalPayment });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchActiveGuests()); // Row will now be "deleted" from frontend view
        return { success: true, message: "Checked out successfully" };
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Check-out failed" };
    }
  };
}

// 5️⃣ Search History (The Police Inquiry Function 😁)
export function searchGuestHistory(query: string) {
  return async function searchGuestHistoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get(`occupancy/search?query=${query}`);
      if (response.status === 200) {
        dispatch(setOccupancyData(response.data.data)); // Re-use table state to show search results
        dispatch(setStatus(Status.SUCCESS));
        return { success: true };
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Search failed" };
    }
  };
}