import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { UserInfoResponse } from '../../types/services/login'
import { userInfoApi } from '../../services/login'

// 异步action
export const getUserInfoAction = createAsyncThunk('getUserInfoAction', async () => {
  const res = await userInfoApi()
  return res.data.data
})


const initialState: { loading: boolean, info: UserInfoResponse } = {
  loading: true,
  info: {
    username: '',
    _id: '',
    permission: [],
    role: []
  }
}



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserInfoAction.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserInfoAction.fulfilled, (state, action: PayloadAction<UserInfoResponse>) => {
        state.info = action.payload
        if (!action.payload.avator) {
          state.info.avator = 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'
        }
        state.loading = false
      })
      .addCase(getUserInfoAction.rejected, (state) => {
        state.loading = false
      })
  }

  
})

export const {} = userSlice.actions

export default userSlice.reducer

