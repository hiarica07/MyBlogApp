import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFail, fetchStart } from "../features/authSlice";
import useAxios, { axiosPublic } from "./useAxios";
import axios from "axios";
import { getBlogsSuccess, getCommentsSuccess, postLikeSuccess } from "../features/blogSlice";
import { useSelector } from "react-redux";

const useBlogsCall = () => {
  const { currentUserId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosWithToken = useAxios();

  const getBlogsData = async (endpoint,options) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(endpoint,options);
      // console.log(data);
      dispatch(getBlogsSuccess({ blog: data.data, endpoint}));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const postLike = async (blogId) => {
    try {
      const { data } = await axiosWithToken.post(`/blogs/${blogId}/postLike`);
      console.log(data, "countOfLikes");
      dispatch(
        postLikeSuccess({
          currentUserId,
          _id: blogId,
          countOfLikes: data.countOfLikes,
          didUserLike: data.didUserLike,
        })
      );
      console.log("Response data:", data); // Başarılı yanıtı buraya ekleyin
    } catch (error) {
      console.error(
        "Like işlemi sırasında hata oluştu:",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  };

  const getComments = async () => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosWithToken.get("comments/")
      dispatch(getCommentsSuccess(data.data))
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail())      
    } 
  }

  const postComments = async (comments, info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post(`${comments}/`, info)
    } catch (error) {
      dispatch(fetchFail())
    } 
  }
  return {
    getBlogsData,
    postLike,
    getComments,
    postComments
  };
};

export default useBlogsCall;
