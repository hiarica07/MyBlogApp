import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    loading: false,
    error: false,
    blogs: [],
    categories: [],
    comments: [], 
    blog: {},
    singleUserBlogs: null
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
    getBlogsDataSuccess:(state,{payload}) => {
      state.loading = false;
      state.error = false;
      state[payload.endpoint] = payload.blog
      // console.log(`${payload.endpoint}`, payload)
    },    
    getSingleBlogSuccess: (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.blog = payload;
    },
    getSingleBlogSuccess: (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.blog = payload;
    },
    getSingleUserBlogsSuccess: (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.singleUserBlogs = payload;
    },
    
  },
});

export const {
  fetchStart,
  fetchFail,
  getBlogsDataSuccess,
  // getCommentsSuccess,
  postLikeSuccess,
  getSingleBlogSuccess,
  getSingleUserBlogsSuccess
} = blogSlice.actions;

export default blogSlice.reducer