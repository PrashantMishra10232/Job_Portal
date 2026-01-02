import { JOB_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setJobs } from '@/redux/jobSlice'


function useGetAllJobs() {
    const dispatch = useDispatch()
    const {searchedQuery} = useSelector((state)=>state.job)
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery || ""}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setJobs(res.data.data))
                }
                
            } catch (error) {
                console.error(error);
                const errorMessage = error.response?.data?.message || error.message || "Something went wrong!"; 
                console.error(errorMessage);
            }
        }
        fetchAllJobs()
    }, [dispatch, searchedQuery])
}

export default useGetAllJobs