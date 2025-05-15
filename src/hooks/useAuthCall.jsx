import React from 'react'
import { useDispatch } from 'react-redux'
import {fetchFail, fetchStart, loginSuccess, logoutSuccess, registerSuccess} from "../features/authSlice"
import useAxios, { axiosPublic } from './useAxios'
import { useNavigate } from 'react-router-dom'

const useAuthCall = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const axiosWithToken = useAxios()

  const register = async (userInfo) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosPublic.post("users/", userInfo)
      dispatch(registerSuccess(data))
      navigate("/")
    } catch (error) {
      console.log(error);
      dispatch(fetchFail())
    }
  }

  const login = async (userInfo) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosPublic.post("auth/login/", userInfo)
      dispatch(loginSuccess(data))
      navigate("/")
    } catch (error) {
      console.log(error);
      dispatch(fetchFail())
    }
  }

  const logout = async () => {
    dispatch(fetchStart())
    try {
      await axiosWithToken("auth/logout")
      dispatch(logoutSuccess())
      navigate("/login")
    } catch (error) {
      console.log(error);
      dispatch(fetchFail())
    }
  }

  return {register, logout, login}
}

export default useAuthCall