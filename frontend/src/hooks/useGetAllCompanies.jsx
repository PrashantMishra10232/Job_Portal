import { COMPANY_API_ENDPOINT} from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllCompanies } from '@/redux/companySlice'
import axiosInstance from '@/utils/axiosInstance'

function useGetAllCompanies() {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const res = await axiosInstance.get(`${COMPANY_API_ENDPOINT}/get`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllCompanies(res.data.data))
                    
                }
            } catch (error) {
                console.error(error);
                const errorMessage = error.response?.data?.message || error.message || "Something went wrong!"; 
                console.error(errorMessage);
            }
        }
        fetchAllCompanies()
    }, [])
}

export default useGetAllCompanies