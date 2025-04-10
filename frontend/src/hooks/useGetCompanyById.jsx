import { COMPANY_API_ENDPOINT} from '@/utils/constant'
// import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import axiosInstance from '@/utils/axiosInstance'

function useGetCompanyById(companyId) {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchCompanyById = async () => {
            try {
                const res = await axiosInstance.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.data))
                }
            } catch (error) {
                console.error(error);
                const errorMessage = error.response?.data?.message || error.message || "Something went wrong!"; 
                console.error(errorMessage);
            }
        }
        fetchCompanyById()
    }, [companyId, dispatch])
}

export default useGetCompanyById