import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    pagUsers: [],
    pagCategories: [],
    pagBlogs: [],
    pagComments: [],
    pagFilteredComments: [],
    pagFilteredBlogs: [],
    currentPage: 1,
    itemsPerPage: 10,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getPagDataSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.data = payload.data;
      state[payload.slice] = payload.data;
    },
    setPage: (state, { payload }) => {
      state.currentPage = payload;
      state.loading = false
      state.error = false
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
    fetchStart,
    getPagDataSuccess,
    setPage,
    fetchFail
} = paginationSlice.actions;
export default paginationSlice.reducer;