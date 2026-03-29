import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../store/auth/auth-slice"


const store=configureStore({
    reducer:{
        authSlice  
    }})
export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>