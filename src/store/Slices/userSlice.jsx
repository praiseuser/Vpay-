import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      console.log("User stored in Redux:", state.user);
      console.log("Token stored in Redux:", state.token);
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      console.log("User after logout:", state.user);
      console.log("Token after logout:", state.token);
    },
  },
});

export const { storeUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;