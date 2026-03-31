import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData, IUserSliceState } from "./auth-slice-type";
import { AppDispatch } from "../store";
import { Status } from "../../global/type";
import API from "../../http/API";
import APIWITHTOKEN from "../../http/APIWithToken";

const initialState:IUserSliceState={
    userData:[],
    status:Status.IDLE

}

const authSlice=createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        setUser(state:IUserSliceState, action:PayloadAction<IUserData[]>){
            state.userData=action.payload
        },

        setStatus(state:IUserSliceState, action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const{setUser,setStatus}=authSlice.actions
export default authSlice.reducer

//user register thunk
export function userRegister(userRegisterData:IUserData){
    return async function userRegisterThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.post("/auth/register",userRegisterData)
            if(response.status===200 || response.status===201){
                dispatch(setUser(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
                return { success: true, message: response.data.message }//for toast messages
            }else{
                dispatch(setStatus(Status.ERROR))
                return { success: false, message: response.data.message || "Something went wrong" }//for toast messages
            }
        } catch (error:any) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
            return { success: false, message: error.response?.data?.message || "Registration failed" } //toast error
        }
    }
}

//user login thunk
export function userLogin(loginData: IUserData) {
  return async function userLoginThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await API.post("/auth/login", loginData);

      const { token, data, message } = response.data;

      // Save to Redux
      dispatch(setUser(data));

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data));

      dispatch(setStatus(Status.SUCCESS));
      return { success: true, message, user: data };
      // return { success: true, message };
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));

      return {
        success: false,
        message:
          error.response?.data?.message || "Login failed",
      };
    }
  };
}

//forgot password
export function forgotPassword(forgotPasswordData:IUserData){
    return async function forgotPasswordThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await API.post("/auth/forgot-password",forgotPasswordData)
            if(response.status===200 || response.status===201){
                dispatch(setStatus(Status.SUCCESS))
                return { success: true, message: response.data.message }
            }else{
                dispatch(setStatus(Status.ERROR))
                return { success: false, message: response.data.message || "Something went wrong" }
            }
        } catch (error:any) {
            console.log(error)
            return { success: false, message: error.response?.data?.message || "Registration failed" }
        }
    }
}

//Reset Password
export function resetPassword(resetPasswordData: IUserData) {
  return async function resetPasswordThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("/auth/reset-password", resetPasswordData);
      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        return { success: true, message: response.data.message }
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data.message || "Something went wrong" }
      }
    } catch (error:any) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Registration failed" }
    }
  };
}

// get user by id
export function fetchUserById(id: string) {
  return async function fetchUserByIdThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await APIWITHTOKEN.get(`/auth/user/${id}`);

      if (response.status === 200) {
        dispatch(setUser(response.data.data)); // adjust based on API response
        dispatch(setStatus(Status.SUCCESS));

        return { success: true, data: response.data.data };
      } else {
        dispatch(setStatus(Status.ERROR));
        return {
          success: false,
          message: response.data.message || "Failed to fetch user",
        };
      }
    } catch (error: any) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));

      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      };
    }
  };
}

//update user profile
export function updateUserProfile(id: string, updatedData: FormData) {
  return async function updateUserProfileThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch(`/auth/update-profile/${id}`, updatedData, {
        headers: { "Content-Type": "multipart/form-data" } // for file uploads
      });

      if (response.status === 200 || response.status === 201) {
        dispatch(setUser(response.data.user)); // update user in store
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchUserById(id))
        return { success: true, message: response.data.message };
      } else {
        dispatch(setStatus(Status.ERROR));
        return { success: false, message: response.data.message || "Something went wrong" };
      }
    } catch (error: any) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
      return { success: false, message: error.response?.data?.message || "Profile update failed" };
    }
  };
}