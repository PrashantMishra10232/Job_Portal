import React, { useEffect } from 'react'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {MoreHorizontal, Trash2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAllAdminsJobs } from '@/redux/jobSlice'
import { JOB_API_ENDPOINT } from '@/utils/constant'
import axios from "axios"
import { toast } from 'sonner'

function JobsTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {allAdminsJobs, searchedJobs} = useSelector(store => store.job);
    const [filterJobs,setFilterJobs] = React.useState(allAdminsJobs);

    useEffect(()=>{
        const filteredJob = allAdminsJobs.length >=0 && allAdminsJobs.filter((job)=>{
            if(!searchedJobs){
                return true;
            }
            return job.title.toLowerCase().includes(searchedJobs.toLowerCase())
        });
        setFilterJobs(filteredJob);
    },[allAdminsJobs, searchedJobs])

    const jobDeleteHandler = async(jobId)=>{
        try {
            const res = await axios.delete(`${JOB_API_ENDPOINT}/delete/${jobId}`,{
                withCredentials:true
            })
            if(res.data.success){
                toast.success(res.data.message)
                setFilterJobs(prevJobs => prevJobs.filter(job => job._id !== jobId))
                // dispatch(setAllAdminsJobs(prevJobs => prevJobs.filter(job => job._id !== jobId)));
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message)
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Applicants</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job) => (
                    <tr>
                        <TableCell>CompanyName</TableCell>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.application.length}</TableCell>
                        <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                        <TableCell className='text-right cursor-pointer'>
                            <Popover>
                                <PopoverTrigger className='cursor-pointer'><MoreHorizontal/></PopoverTrigger>
                                <PopoverContent className='w-32'>
                                    <div onClick={()=>jobDeleteHandler(job._id)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                        <Trash2/>
                                        <span>Delete</span>
                                    </div>
                                </PopoverContent>
                            </Popover></TableCell >
                    </tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default JobsTable;