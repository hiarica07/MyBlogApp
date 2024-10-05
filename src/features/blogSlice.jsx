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
    },
    postLikeSuccess:(state,{payload}) =>{
      state.loading = false;
      state.blogs = state.blogs.map(blog => {
        const {currentUserId, _id, didUserLike} = payload
        if (blog._id == _id) {
          return {
            ...blog,
            likes: didUserLike == false ? blog?.likes?.filter(l => l != currentUserId) : [...blog.likes,currentUserId]
          }
        } else {
          return blog
        }
      })
    }

    },
    
  },
);

export const {
  fetchStart,
  fetchFail,
  getBlogsSuccess,
  postLikeSuccess,
  
} = blogSlice.actions;
export default blogSlice.reducer;