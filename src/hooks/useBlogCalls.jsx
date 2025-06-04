import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, getBlogsDataSuccess, getPublishedBlogsSuccess, getSingleBlogSuccess, getSingleUserBlogsSuccess, setData, setSingleData } from '../features/blogSlice'
import useAxios, { axiosPublic } from './useAxios'
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify'
// import { useSelector } from 'react-redux'
// import axios from 'axios'

const useBlogCalls = () => {

  // const {currentUserId} = useSelector(state=>state.auth)

  const dispatch = useDispatch()
  const axiosWithToken = useAxios()

  const handleError = (error, fallbackMsg) => {
    dispatch(fetchFail(error?.response?.data?.message || fallbackMsg))
    toastErrorNotify(error?.response?.data?.message || fallbackMsg)
  }

  //Dynamic get data function
  const getBlogsData = async (endpoint, options) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosPublic(`${endpoint}/`, options)
      // console.log(data);
      console.log(`Fetched ${key} data successfully!`, data)
      dispatch(getBlogsDataSuccess({blog:data.data, endpoint}))      
    } catch (error) {
      console.log(error);      
      dispatch(fetchFail())
    }
  }

  const getBlogsDataNew = async (key = "blogs", options) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosPublic(`${key}/`, options)
      // console.log('getBlogsData', data);
      dispatch(setData({key, data}))      
    } catch (error) {
      handleError(error, `Something went wrong while fetching ${key}!`)
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

  const getSingleBlogNew = async (id) => {
    dispatch(fetchStart());
    try {
      const { data: {data} } = await axiosPublic(`blogs/${id}`);
      dispatch(setSingleData({key: "blog", data}))
      // console.log(data.data);
    } catch (error) {
      handleError(error, `Something went wrong while fetching the blog with ID: ${id}!`);
    }
  };

  const postBlog = async (endpoint = "blogs", info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post(`${endpoint}/`, info)
    } catch (error) {
      handleError(error, "Something went wrong while posting the blog!");
    } finally {
      getBlogsDataNew("blogs", { params: { limit: 10, page: 1 } })
    }
  }

  const putBlog = async (id, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`blogs/${id}`, info);
      toastSuccessNotify("Successfully updated your blog!");
    } catch (error) {
      handleError(error, 'Something went wrong while updating the blog!')
    } finally {
      getSingleBlogNew(id);
    }
  };

  const deleteBlog = async (id) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.delete(`blogs/${id}`)
      toastSuccessNotify("Successfully deleted your blog!");
    } catch (error) {
      handleError(error, 'Something went wrong while deleting the blog!')
    } finally {
      getBlogsDataNew("blogs", { params: { limit: 10, page } })
    }
  }

  const postLikeBlog = async (blogId, blogInfo) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post(`blogs/${blogId}/postLike`,blogInfo)
    } catch (error) {
      handleError(error, 'Something went wrong while liking the blog!')
    } finally {
      getSingleBlogNew(blogId)
    }
  }

  // ??
  const getSingleUserBlogs = async(endpoint, options) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosWithToken.get(`blogs/${endpoint}/`, options)
      dispatch(setData({key: "singleUserBlogs", data}))
    } catch (error) {
      handleError(error, 'Something went wrong while fetching user blogs!')
    }
  }

  const getBlogStats = async (userId) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosWithToken.get(`blogs/${userId}/stats`)
      // Assuming the response contains stats data
      dispatch(setData({key: "stats", data}))
    } catch (error) {
      handleError(error, 'Something went wrong while fetching blog stats!')
      
    }
  }

  const getPublishedBlogs = async(endpoint, options) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosPublic.get(`blogs/${endpoint}/`, options)
      dispatch(getPublishedBlogsSuccess(data.data))
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(
        error.response.data.message ||
        "Something went wrong while fetching published blogs"
      );
    }
  }

  const getPublishedBlogsNew = async(endpoint, options) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosPublic.get(`blogs/${endpoint}/`, options)
      dispatch(setData({key: "publishedBlogs", data}))
    } catch (error) {
      handleError(error, 'Something went wrong while fetching published blogs!')
    }
  }
  
  
  return {
    getBlogsDataNew,
    getSingleBlogNew,
    getBlogsData, 
    postLikeBlog, 
    getSingleBlog,
    postBlog,
    deleteBlog,
    putBlog,
    getSingleUserBlogs,
    getPublishedBlogs,
    getPublishedBlogsNew,
    getBlogStats
  }
}

export default useBlogCalls