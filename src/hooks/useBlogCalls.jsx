import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, getBlogsDataSuccess, getPublishedBlogsSuccess, getSingleBlogSuccess, getSingleUserBlogsSuccess,setData,setSingle} from '../features/blogSlice'
import useAxios, { axiosPublic } from './useAxios'
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify'
// import { useSelector } from 'react-redux'
// import axios from 'axios'

const useBlogCalls = () => {

  // const {currentUserId} = useSelector(state=>state.auth)

  const dispatch = useDispatch()
  const axiosWithToken = useAxios()

  const handleError = (error,fallbackMsg) => {
    dispatch(fetchFail(error?.response?.data?.message || fallbackMsg))
    toastErrorNotify(
      error?.response?.data?.message || fallbackMsg
    )
  }

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
  const getBlogsDataNew = async (key = 'blogs', options) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosPublic(`${key}`, options)
      console.log(`Fetched ${key} data successfully!`, data)
      dispatch(setData({ key, data }))
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
    dispatch(fetchStart())
    try {
      const { data: { data } } = await axiosPublic(`blogs/${id}`)
      dispatch(setSingle({ key: 'blog', data }))
    } catch (error) {
      handleError(error, `Something went wrong while fetching the blog with ID: ${id}!`)
    }
  }
  const postBlog = async (endpoint = 'blogs', info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post(`${endpoint}/`, info)
      toastSuccessNotify('Successfully created your blog!')
    } catch (error) {
      handleError(error, 'Something went wrong while creating the blog!')
    } finally {
      getBlogsDataNew('blogs', { params: { limit: 10, page: 1 } })
    }
  }
  const putBlog = async (id, info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.put(`blogs/${id}`, info)
      toastSuccessNotify('Successfully updated your blog!')
    } catch (error) {
      handleError(error, 'Something went wrong while updating the blog!')
    } finally {
      getSingleBlogNew(id)
    }
  }
  const deleteBlog = async (id, page = 1) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.delete(`blogs/${id}`)
      toastSuccessNotify('Successfully deleted your blog!')
    } catch (error) {
      handleError(error, 'Something went wrong while deleting the blog!')
    } finally {
      getBlogsDataNew('blogs', { params: { limit: 10, page } })
    }
  }
  const postLikeBlog = async (blogId, blogInfo) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post(`blogs/${blogId}/postLike`, blogInfo)
    } catch (error) {
      handleError(error, 'Something went wrong while liking the blog!')
    } finally {
      getSingleBlogNew(blogId)
    }
  }
 const getSingleUserBlogs = async (options) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken.get('blogs', options)
      dispatch(setData({ key: 'singleUserBlogs', data }))
    } catch (error) {
      handleError(error, 'Something went wrong while fetching user blogs!')
    }
  }
 const getPublishedBlogs = async (endpoint, options) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosPublic.get(`blogs/${endpoint}/`, options)
      dispatch(setData({ key: 'publishedBlogs', data }))
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
    handleError
    
  }
}

export default useBlogCalls
