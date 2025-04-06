import React, { useEffect } from "react";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setSavedJobs } from "@/redux/jobSlice";

function useGetJobById(jobId) {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchJobsById = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true })
                if (res.data.success) {
                    // dispatch(setSavedJobs(res.data.data))
                }
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message);
            }
        }
        fetchJobsById();
    })
}

export default useGetJobById;