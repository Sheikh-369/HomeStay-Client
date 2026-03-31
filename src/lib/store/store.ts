import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../store/auth/auth-slice"
import bookingSlice from "../store/booking/booking-slice"
import messageSlice from "../store/message/message-slice"
import roomSlice from "../store/room/room-slice"


const store=configureStore({
    reducer:{
        authSlice,
        bookingSlice,
        messageSlice,
        roomSlice  
    }})
export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>