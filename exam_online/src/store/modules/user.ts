import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { interfaceItem } from '../../type/services/login'

const initialState:interfaceItem = {
  username: '',
  _id: '',
  permission: [],
  role: []
}

 const userSlice = createSlice({
  name:'user',
  initialState,
  reducers: {
    setUserInfo(state, action : PayloadAction<interfaceItem>){
      return action.payload
    }
  }
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer