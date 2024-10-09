import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, getBlogsDataSuccess, getSingleBlogSuccess, postLikeSuccess } from '../features/blogSlice'
import useAxios, { axiosPublic } from './useAxios'
import { useSelector } from 'react-redux'

const useBlogCalls = () => {

  const {currentUserId} = useSelector(state=>state.auth)

  const dispatch = useDispatch()
  const axiosWithToken = useAxios()

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

  // const getLike = async () => {
  //   dispatch(fetchStart())
  //   try {
  //     const {data} = await axiosWithToken(`blogs/${}/getLike`)
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(fetchFail())
      
  //   }
  // }

  const postLike = async (blogId, blogInfo) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosWithToken.post(`blogs/${blogId}/postLike`,blogInfo)
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail())      
    } finally {
      getBlogsData("blogs")
    }
  }

  //? veri backend'den geldiği için bu fonksiyonu yoruma alıyoruz.
  // const postLike = async (blogId) => {
  //   try {
  //     const { data } = await axiosWithToken.post(`/blogs/${blogId}/postLike`);
  //     console.log(data, "countOfLikes");
  //     dispatch(
  //       postLikeSuccess({
  //         currentUserId,
  //         _id: blogId,
  //         countOfLikes: data.countOfLikes,
  //         didUserLike: data.didUserLike,
  //         endpoint: "blogs",
  //       })
  //     );
  //     console.log("Response data:", data); // Başarılı yanıtı buraya ekleyin
  //   } catch (error) {
  //     console.error(
  //       "Like işlemi sırasında hata oluştu:",
  //       error.response ? error.response.data : error.message
  //     );
  //     return null;
  //   }
  // };  

  // const getComments = async () => {
  //   dispatch(fetchStart())
  //   try {
  //     const {data} = await axiosWithToken.get("comments/")
  //     dispatch(getCommentsSuccess(data.data))
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(fetchFail())      
  //   } 
  // }

  const getSingleBlog = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(`blogs/${id}`);
      dispatch(getSingleBlogSuccess(data.data))
      

      console.log(data.data);
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const postComment = async (comments, info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post(`${comments}/`, info)
    } catch (error) {
      dispatch(fetchFail())
    } finally {
      getSingleBlog(info.blogId)
    }
  }

  const putComment = async (id, info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.put(`comments/${id}`, info)
    } catch (error) {
      dispatch(fetchFail())
    } finally {
      getSingleBlog(info.blogId)
    }
  }

  const deleteComment = async (_id) => {
    dispatch(fetchStart())    
      try {        
        await axiosWithToken.delete(`comments/${_id}`)
    } catch (error) {
      dispatch(fetchFail())
    }
  } 
  
  
  return {
    getBlogsData, 
    postLike, 
    postComment,
    deleteComment,
    //  getComments
    getSingleBlog,
    putComment,
    }
}

export default useBlogCalls