import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFail, fetchStart } from "../features/authSlice";
import { axiosPublic } from "./useAxios";
import axios from "axios"
import { getBlogsSuccess } from "../features/blogSlice";

const useBlogsCall = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    
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
  
    return {
      getBlogsData,
    };
  };
  
  export default useBlogsCall;