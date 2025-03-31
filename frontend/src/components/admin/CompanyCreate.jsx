import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'
import {COMPANY_API_ENDPOINT} from "@/utils/constant"
import { toast } from 'sonner'

function CompanyCreate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name,setName] = useState();
    const registerNewCompany = async () => {
        try {
            const res= await axios.post(`${COMPANY_API_ENDPOINT}/register`, {name}, { Headers:{
                'Content-Type': 'application/json',
            },
            withCredentials: true,});

            if(res.data.success){
                dispatch(setSingleCompany(res.data.data))
                toast.success(res.data.message);
                const companyId = res.data?.data?._id;
                // console.log("companyId",companyId);
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
            toast.error(errorMessage);
            
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later</p>
                </div>

                <Label>Company Name</Label>
                <Input
                type='text'
                className='my-2'
                placeholder='Company Name'
                onChange = {(e)=>setName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-18'>
                    <Button variant='outline' onClick={()=>navigate('/admin/companies')}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate