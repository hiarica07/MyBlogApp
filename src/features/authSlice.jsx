import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
  
    initialState: {
      currentUser: null,
      loading: false,
      error: false,
      token: null,
      currentUserId: null,
    },
    reducers: {
      fetchStart: state => {
        state.loading = true;
        state.error = false;
      },
      registerSuccess:(state,{payload})=>{
        state.loading=false;
        state.error=false;
        state.currentUser=payload.data.username
        state.token = payload.token
      },

      loginSuccess: (state, { payload }) => {
        state.loading = false;
        state.currentUser = payload?.user?.username;
        state.currentUserId = payload?.user?._id
        state.token = payload?.token;
      },
      logoutSuccess:(state)=>{
        state.loading= false;
        state.token = null;
        state.currentUser = null;
      },
      
      fetchFail: state => {
        state.loading = false;
        state.error = true;
      },
    },
  });
  
  export const {
    fetchStart,
    fetchFail,
    registerSuccess,
    logoutSuccess,
    loginSuccess
  } = authSlice.actions;
  export default authSlice.reducer;
