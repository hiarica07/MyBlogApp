import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    currentUserId: null,
    loading: false,
    error: false,
    token: null,
  },
  reducers: {
    fetchStart: state => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: state => {
      state.loading = false;
      state.error = true;
    },
    registerSuccess: (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.currentUser = payload.data
      state.token = payload.token
    },
    loginSuccess: (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.currentUser = payload?.user?.username
      state.currentUserId = payload?.user?._id
      state.token = payload.token
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.currentUser = null
      state.token = null
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  registerSuccess,
  loginSuccess,
  logoutSuccess,
} = authSlice.actions;
export default authSlice.reducer;