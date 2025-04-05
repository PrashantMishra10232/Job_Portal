import { setAllAdminsJobs } from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner';

function useGetAllAdminsJobs() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`,{
                    withCredentials:true,
                })
                if(res.data.success){
                    dispatch(setAllAdminsJobs(res.data.data));
                }
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message)
            }
        }
        fetchAdminJobs();
    })
}

export default useGetAllAdminsJobs