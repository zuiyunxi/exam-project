import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfoResponse } from "../../types/services/login";

const initialState: UserInfoResponse = {
  username: '',
  _id: '',
  permission: [],
  role: []
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state , action: PayloadAction<UserInfoResponse>){
      return action.payload
    }
  }
  
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer

