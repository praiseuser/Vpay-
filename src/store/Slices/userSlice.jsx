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
      state.user = action.payload;
      console.log("User stored in Redux:", state.user);
    },
    logoutUser: (state) => {
      state.user = null;
      console.log("User after logout:", state.user);
    },
  },
});

export const { storeUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;