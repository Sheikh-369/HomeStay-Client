import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Status } from "../../global/type";
import APIWITHTOKEN from "../../http/APIWithToken";
import { IOccupancyData, IOccupancySliceState } from "./occupancy-slice-type";

const initialState: IOccupancySliceState = {
  occupancyData: [],
  selectedOccupancy: null,
  status: Status.IDLE,
};

const occupancySlice = createSlice({
  name: "occupancySlice",
  initialState,
  reducers: {
    setOccupancyData(state, action: PayloadAction<IOccupancyData[]>) {
      state.occupancyData = action.payload;
    },
    setSelectedOccupancy(state, action: PayloadAction<IOccupancyData | null>) {
      state.selectedOccupancy = action.payload;
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setOccupancyData, setSelectedOccupancy, setStatus } = occupancySlice.actions;
export default occupancySlice.reducer;

// ----------------- THUNKS -----------------

// 1. Fetch Active Guests (Matches GET /occupancy)
export function fetchActiveGuests() {
  return async function fetchActiveGuestsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("occupancy");
      // Backend returns { success: true, data: [...] } or just [...]
      const data = response.data.data || response.data;
      dispatch(setOccupancyData(data));
      dispatch(setStatus(Status.SUCCESS));
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// 2. Check-In (Matches POST /occupancy with Multer)
export function checkInGuest(formData: FormData) {
  return async function checkInGuestThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.post("occupancy", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchActiveGuests()); // Refresh the list
        return { success: true, message: "Check-in successful" };
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Check-in failed" };
    }
  };
}

// 3. Check-Out (Matches PATCH /occupancy/checkout/:id)
export function checkOutGuest(id: string) {
  return async function checkOutGuestThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      // The backend calculates the bill based on 'actualExitDate' (today)
      const response = await APIWITHTOKEN.patch(`occupancy/checkout/${id}`);

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchActiveGuests()); // Remove from active list
        return { 
          success: true, 
          message: response.data.message,
          billDetails: response.data // Contains totalDue and daysStayed
        };
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Check-out failed" };
    }
  };
}