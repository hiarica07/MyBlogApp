import { useDispatch } from "react-redux";
import useAxios, { axiosPublic } from "./useAxios";
import { fetchFail, fetchStart, getCategoriesSuccess } from "../features/categorySlice";
import { toastErrorNotify } from "../helper/ToastNotify";

const useCategoryCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  // Fetch Caegries without pagination
  const getAllCategories = async () => {
    dispatch(fetchStart());
    try {
        const {data} = await axiosPublic('categories/all')
        dispatch(getCategoriesSuccess(data.data))
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(fetchFail());
      toastErrorNotify(
        error.response.data.message ||
          "Something went wrong while fetching the categories!"
      );
    }
  };

  return {
    getAllCategories,
  };
};

export default useCategoryCall;
