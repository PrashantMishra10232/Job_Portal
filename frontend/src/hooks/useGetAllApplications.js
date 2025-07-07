import axiosInstance from '@/utils/axiosInstance';
import { INTERVIEW_API_ENDPOINT } from '@/utils/constant';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllApplications } from '@/redux/applicationSlice';

function useGetAllApplications() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchApplications = async()=>{

        try {
            const res = await axiosInstance.get(`${INTERVIEW_API_ENDPOINT}/interview/applications`,{
                withCredentials:true,
            })
            if(res.data.success){
                dispatch(setAllApplications(res.data.data))                
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || error.message || "Something went wrong"
            console.error(errorMessage)
        }
        
    }
    fetchApplications()
  },[])
}

export default useGetAllApplications