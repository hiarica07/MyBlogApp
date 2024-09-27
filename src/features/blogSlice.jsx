import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    loading: false,
    error: false,
    blogs:[],
    categories:[],
    
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    getBlogsSuccess:(state,{payload}) =>{

      state.loading = false;
      state[payload.endpoint] = payload.blog
    
      
    }
    
  },
});

export const {
  fetchStart,
  fetchFail,
  getBlogsSuccess
  
} = blogSlice.actions;
export default blogSlice.reducer;