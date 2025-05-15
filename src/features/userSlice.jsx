import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        users:[],
        singleUser: {},
        loading: false,
        error: false,
    },
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        getSingleUserSuccess: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.singleUser = payload
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
    getSingleUserSuccess,
} = userSlice.actions
export default userSlice.reducer