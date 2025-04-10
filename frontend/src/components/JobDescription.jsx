import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_ENDPOINT } from '@/utils/constant'
import { APPLICATION_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'

function JobDescription() {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.application?.some(application => application.applicant === user?._id);
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    // const isApplied = singleJob?.application?.includes(user?._id);
    const params = useParams();
    const jobId = params.id;
    // console.log("jobId",jobId);
    

    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, application: [...singleJob.application, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
            console.error(errorMessage);
        }
    }

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSingleJob = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.data))
                    setIsApplied(res.data.data.application.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.error(error);
                const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
                console.error(errorMessage);
            } finally {
                setLoading(false);
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id]);

    if (loading || !singleJob) {
        return <div className="text-center py-10">Loading job details...</div>;
    }

    return (
        <div className='max-w-7xl mx-2 sm:mx-auto my-10'>
            <div className='flex justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold' variant='ghost'>{singleJob?.position}Positions</Badge>
                        <Badge className='text-[#F83002] font-bold' variant='ghost'>{singleJob?.jobType}</Badge>
                        <Badge className='text-[#7209b7] font-bold' variant='ghost'>{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad] cursor-pointer'}`} onClick={isApplied ? null : applyJobHandler}>
                    {isApplied ? 'Already applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-lg font-bold py-4'>Job Description</h1>
            <div className='my-4 border border-gray-100 p-4 shadow-lg'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                {/* <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience}yrs</span></h1> */}
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.application?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
                <h1 className='font-bold my-1 p-2 inset-shadow-sm inset-shadow-indigo-500'>Description: <div
                    className='pl-4 font-normal text-gray-800'
                    dangerouslySetInnerHTML={{ __html: singleJob?.description }}
                /></h1>
            </div>
        </div>
    )
}

export default JobDescription