import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, getBlogsDataSuccess, getSingleBlogSuccess, postLikeSuccess } from '../features/blogSlice'
import useAxios, { axiosPublic } from './useAxios'
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify'
// import { useSelector } from 'react-redux'
// import axios from 'axios'

const useBlogCalls = () => {

  // const {currentUserId} = useSelector(state=>state.auth)

  const dispatch = useDispatch()
  const axiosWithToken = useAxios()

  //Dynamic get data function
  const getBlogsData = async (endpoint, options) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosPublic(`${endpoint}/`, options)
      // console.log(data);
      dispatch(getBlogsDataSuccess({blog:data.data, endpoint}))      
    } catch (error) {
      console.log(error);      
      dispatch(fetchFail())
    }
  }

  const getSingleBlog = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(`blogs/${id}`);
      dispatch(getSingleBlogSuccess(data.data))
      // console.log(data.data);
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const postBlog = async (blogs, info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post(`${blogs}/`, info)
    } catch (error) {
      dispatch(fetchFail())
    } finally {
      getBlogsData("blogs", { params: { limit: 10, page: 1 } })
    }
  }

  const putBlog = async (id, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`blogs/${id}`, info);
      toastSuccessNotify("Successfully updated your blog!");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message ||
          "Something went wrong while updating the blog!"
      );
    } finally {
      getSingleBlog(id);
    }
  };

  const deleteBlog = async (id) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.delete(`blogs/${id}`)
      toastSuccessNotify("Successfully deleted your blog!");
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(
        error.response.data.message ||
          "Something went wrong while deleting the blog!"
      );
    } finally {
      getBlogsData("blogs", { params: { limit: 10, page } })
    }
  }

  
  const postLikeBlog = async (blogId, blogInfo) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post(`blogs/${blogId}/postLike`,blogInfo)
    } catch (error) {
      console.log(error);
      dispatch(fetchFail())
      toastErrorNotify(
        error.response.data.message || "Something went wrong while liking the blog"
      );
    } finally {
      getSingleBlog(blogId)
    }
  }
  
  
  return {
    getBlogsData, 
    postLikeBlog, 
    getSingleBlog,
    postBlog,
    deleteBlog,
    putBlog
  }
}

export default useBlogCalls