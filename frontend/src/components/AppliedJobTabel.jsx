import React, { useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { APPLICATION_API_ENDPOINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAppliedJobs } from '@/redux/applicationSlice'
import { toast } from 'sonner'
import axios from 'axios'
import axiosInstance from '@/utils/axiosInstance'

function AppliedJobTabel() {
    const dispatch = useDispatch();
    const {appliedJobs} = useSelector((state)=>state.application)

    useEffect(()=>{
        const appliedJobHandler = async()=>{
            try {
                const res = await axiosInstance.get(`${APPLICATION_API_ENDPOINT}/get`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAppliedJobs(res.data.data));
                }
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message);
            }
        }
        appliedJobHandler();
    },[])
    

  return (
    <div className='sm:mx-auto mx-2 p-1'>
        <Table>
            <TableCaption>List of your applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className='text-right'>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    appliedJobs.length<=0 ? <span>You haven't applied to any jobs yet</span> : appliedJobs.map((item)=>(
                        <TableRow key={item._id}>
                            <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                            <TableCell>{item?.job?.title}</TableCell>
                            <TableCell>{item?.job?.company?.name}</TableCell>
                            <TableCell className='text-right'><Badge className={`pb-1 ${item.status === "rejected" ? 'bg-red-400' : item.status === "pending" ? 'bg-gray-400' : 'bg-green-400'}`}>{item?.status}</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTabel