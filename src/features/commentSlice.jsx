import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: "comments",

  initialState: {
    loading: false,
    error: false,
    comments: [],
    singleBlogComments: [],
    comment: {}
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
    getSingleBlogCommentsSuccess: (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.singleBlogComments = payload;
    },
    getSingleCommentSuccess: (state, {payload}) => {
      state.loading = false;
      state.error = false;
      state.comment = payload;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  getSingleBlogCommentsSuccess,
  getSingleCommentSuccess,
} = commentSlice.actions;

export default commentSlice.reducer