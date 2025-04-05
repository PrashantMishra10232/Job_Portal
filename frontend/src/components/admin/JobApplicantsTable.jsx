import React, { useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import Navbar from '../shared/Navbar'
import { Popover } from '../ui/popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { MoreHorizontal } from 'lucide-react'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { setAllApplicants } from '@/redux/applicationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const shortListingStatus = ["Approved", "Rejected"]

function JobApplicantsTable() {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { allApplicants } = useSelector(store => store.application)

    const statusHandler = async(status, id)=>{
        try {
            const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`,{status},{withCredentials:true})
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message)
        }
    }

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_ENDPOINT}/${jobId}/applicants`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.data))
                }
            } catch (error) {
                console.error(error);
                const errorMessage = error.response?.data?.message || "Something went wrong";
                toast.error(errorMessage)
            }
        }
        fetchAllApplicants()
    })
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants ({allApplicants?.application?.length})</h1>
                <Table>
                    <TableCaption>Applicants for this job</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Resume</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className='text-right'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            allApplicants && allApplicants.application.map((applicant) => (
                                <tr key={applicant._id}>
                                    <TableCell>{applicant?.applicant?.fullName}</TableCell>
                                    <TableCell>{applicant?.applicant?.email}</TableCell>
                                    <TableCell>{applicant?.applicant?.phoneNumber}</TableCell>
                                    <TableCell >
                                        {
                                            applicant?.applicant?.profile?.resume ? <a href={applicant?.applicant?.profile?.resume} target='_blank' rel="noopener noreferrer" className='text-blue-500 hover:underline'>{applicant?.applicant?.fullName}-Resume</a> : <span>NA</span>
                                        }
                                        </TableCell>
                                    <TableCell>{applicant?.applicant?.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className='text-right'>
                                        <Popover>
                                            <PopoverTrigger className='cursor-pointer'>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className='w-32 '>
                                                {
                                                    shortListingStatus.map((status, index) => {
                                                        return (
                                                            <div onClick={()=>statusHandler(status,applicant?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                                <span>{status}</span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </tr>
                            ))
                        }


                    </TableBody>
                </Table>
            </div>
        </div>

    )
}

export default JobApplicantsTable