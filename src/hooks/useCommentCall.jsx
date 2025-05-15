import {
  fetchFail,
  fetchStart,
  getSingleBlogCommentsSuccess,
  getSingleCommentSuccess,
} from "../features/commentSlice";
import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useBlogCalls from "./useBlogCalls";

const useCommentCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  const { getSingleBlog } = useBlogCalls();

  const getSingleComment = async (id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`comments/${id}`);
      dispatch(getSingleCommentSuccess(data.data))
      console.log(data.data);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message ||
          "Something went wrong while fetching comments of the blog"
      );
    }
  };

  const getSingleBlogComments = async (blogId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`comments/blog/${blogId}`);
      dispatch(getSingleBlogCommentsSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message ||
          "Something went wrong while fetching comments of the blog"
      );
    }
  };

  const postComment = async (comments, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`${comments}/`, info);
      toastSuccessNotify("Successfully posted your comment");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message ||
          "Something went wrong while posting comment of the blog"
      );
    } finally {
      getSingleBlogComments(info.blogId);
      getSingleBlog(info.blogId);
    }
  };

  const putComment = async (id, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`comments/${id}`, info);
      toastSuccessNotify("Successfully updated your comment");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message ||
          "Something went wrong while updating the comment of the blog"
      );
    } finally {
      getSingleBlogComments(info.blogId);
    }
  };

  const deleteComment = async (_id, blogId) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`comments/${_id}`);
      toastSuccessNotify("Successfully deleted your comment");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message ||
          "Something went wrong while deleting the comment of the blog"
      );
    } finally {
      getSingleBlogComments(blogId);
    }
  };

  const postLikeComment = async (commentId, commentInfo) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`comments/${commentId}/postLike`, commentInfo);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message ||
          "Something went wrong while liking the comment"
      );
    } finally {
      getSingleBlogComments(commentInfo?.blogId);
    }
  };

  return {
    getSingleBlogComments,
    postComment,
    putComment,
    deleteComment,
    postLikeComment,
    getSingleComment
  };
};

export default useCommentCall;
