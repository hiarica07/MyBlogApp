import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchFail, fetchStart, loginSuccess, logoutSuccess, registerSuccess } from '../features/authSlice'
import useAxios, { axiosPublic } from './useAxios'
import { useNavigate } from 'react-router-dom'

const BASE_URL = import.meta.env.VITE_BASE_URL

const useAuthCall = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const axiosWithToken = useAxios()

  // REGISTER 

  const register = async (userInfo)=>{
    dispatch(fetchStart())

    try {
      const {data} = await axiosPublic.post("users/",userInfo)
      // console.log(data);
      dispatch(registerSuccess(data))
      navigate("/")
      
    } catch (error) {
      dispatch(fetchFail())
    }

  }

  // LOGIN

  const login = async (userInfo)=>{
    dispatch(fetchStart())

    try {
      const {data} = await axiosPublic.post("auth/login",userInfo)
      // console.log(data);
      dispatch(loginSuccess(data))
      navigate("/")
      
    } catch (error) {
      dispatch(fetchFail())
    }

  }




  // LOGOUT

  const logout = async (userInfo)=>{
    dispatch(fetchStart())

    try {
      const {data} = await  axiosWithToken("auth/logout")
      // console.log(data);
      dispatch(logoutSuccess(data))
      navigate("/register")
      
    } catch (error) {
      dispatch(fetchFail())
    }

  }


  return (
    {register,logout,login}
  )
}

export default useAuthCall