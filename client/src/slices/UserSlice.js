import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: "userData",
  initialState: {
    userData: {},
    accessToken: null
  },

  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload.user
      state.accessToken = action.payload.accessToken
    },
  },
});

export const {
  setUser,
} = userSlice.actions;

export default userSlice.reducer;