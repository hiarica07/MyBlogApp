import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  blogs: {},
  categories: {},
  comments: [],
  stats: {},
  blog: {
    _id: '',
    title: '',
    content: '',
    image: '',
    userId: '',
    categoryId: '',
    likes: [],
    comments: [],
    countOfVisitors: 0,
    createdAt: '',
  },
  singleUserBlogs: {},
  publishedBlogs: [],
};

const blogSlice = createSlice({
  name: "blog",

  initialState,
    
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFail: (state,{payload}) => {
      state.loading = false;
      state.error = payload || "An error occured";
    },
    setData: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state[payload.key] = payload.data;
    },
    setSingleData: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state[payload.key] = payload.data;
    },

    ///////////////////////////

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
    getPublishedBlogsSuccess: (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.publishedBlogs = payload;
    },
    
  },
});

export const {
  fetchStart,
  fetchFail,
  getBlogsDataSuccess,
  postLikeSuccess,
  getSingleBlogSuccess,
  getSingleUserBlogsSuccess,
  getPublishedBlogsSuccess,
  setData,
  setSingleData,
} = blogSlice.actions;

export default blogSlice.reducer