import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    role: "",
    name: "",
    email: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;
