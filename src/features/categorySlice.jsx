import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        selectedCategory: null,
        loading: false,
        error: false,
        newCategory: {
            name: "",
        },
        singleCategory: null
    },
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        getCategoriesSuccess: (state, {payload}) => {
            // console.log(payload);
            state.loading= false;
            state.error = false;
            state.categories = payload
        },
        fetchFail: (state) => {
            state.loading = false;
            state.error = true;
        },
    }
})

export const {
    fetchStart,
    fetchFail,
    getCategoriesSuccess,
} = categorySlice.actions
export default categorySlice.reducer