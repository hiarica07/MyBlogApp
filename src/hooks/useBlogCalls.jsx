import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFail, fetchStart } from "../features/authSlice";
import useAxios, { axiosPublic } from "./useAxios";
import axios from "axios"
import { getBlogsSuccess } from "../features/blogSlice";


const useBlogsCall = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const axiosWithToken = useAxios()
    
  const getBlogsData = async (endpoint) =>{
        dispatch(fetchStart())
    try {

        const {data} = await axiosPublic(endpoint)
        // console.log(data);
        dispatch(getBlogsSuccess({ blog: data.data, endpoint }))
         

    } catch (error) {
        dispatch(fetchFail())
    }
  }

  const postLike = async (blogId) => {
    try {
        const { data } = await axiosWithToken.post(`/blogs/${blogId}/postLike`);
        console.log("Response data:", data); // Başarılı yanıtı buraya ekleyin
    } catch (error) {
        console.error("Like işlemi sırasında hata oluştu:", error.response ? error.response.data : error.message);
        return null;
    }
};


  
    return {
      getBlogsData,postLike
    };
  };
  
  export default useBlogsCall;