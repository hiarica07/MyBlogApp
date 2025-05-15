import { useDispatch } from 'react-redux'
import useAxios from './useAxios'
import { fetchFail, fetchStart, getSingleUserSuccess } from '../features/userSlice'
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify'
import { logoutSuccess } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'

const useUserCall = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const axiosWithToken = useAxios()
  
  const getSingleUser = async(id) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosWithToken.get(`users/${id}`)
      dispatch(getSingleUserSuccess(data.data))
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(error.response?.data?.message || "Something went wrong while fatching user!")
    }
  }

  // Update User's own profile
  const updateMe = async (id, userUpdateInfo) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.patch(`users/${id}/updateMe`, userUpdateInfo)
      toastSuccessNotify("Updated successfully!!")
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(error.response?.data?.message || "Something went wrong while updating your profile!")
    } finally {
      getSingleUser(id)
    }
  }

  // Change User's own password
  const changeMyPassword = async (id, values) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.patch(`users/${id}/changeMyPassword`, values)
      toastSuccessNotify("Password changed successfully!!")
      await axiosWithToken.get("auth/logout")
      dispatch(logoutSuccess())
      navigate("/login")
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(error.response?.data?.message || "Something went wrong while changing your password!")
    }
  }
  
  return {
    updateMe,
    getSingleUser,
    changeMyPassword
  }
}

export default useUserCall