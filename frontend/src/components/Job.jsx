import { Bookmark } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSavedJobs } from '@/redux/jobSlice'
// import useGetJobById from '@/hooks/useGetJobById'

function Job({ job }) {
  const navigate = useNavigate();
  const daysAgo = Math.floor((new Date() - new Date(job?.createdAt)) / (1000 * 60 * 60 * 24));
  const dispatch = useDispatch();

  //to save a job
  const [saved, setSaved] = useState(() => {
    const existingJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    return existingJobs.some((j) => j._id === job._id);
  });

  const jobSaveHandler = async (job) => {
    dispatch(setSavedJobs(job));
    const existingJob = JSON.parse(localStorage.getItem("savedJobs")) || [];

    const isAlreadySaved = existingJob.some((j) => j._id === job._id)
    if (!isAlreadySaved) {
      const updatedJob = [...existingJob, job];
      localStorage.setItem("savedJobs", JSON.stringify(updatedJob));
      setSaved(true);
    }
  }
  
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200 hover:shadow-2xl overflow-x-hidden '>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{daysAgo} days ago</p>
        <Button variant='outline' disabled={saved} className='rounded-full cursor-pointer' size='icon' onClick={saved ? null : () => jobSaveHandler(job)}><Bookmark /></Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <Button className='p-6' variant='outline' size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-md text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <div
          className='pl-4 font-normal text-gray-800 text-sm max-h-[1.5rem] overflow-hidden'
          dangerouslySetInnerHTML={{ __html: job?.description }}
        />
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-bold' variant='ghost'>{job?.position}Positions</Badge>
        <Badge className='text-[#F83002] font-bold' variant='ghost'>{job?.jobType}</Badge>
        <Badge className='text-[#7209b7] font-bold' variant='ghost'>{job?.salary}LPA</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button variant='outline' onClick={() => navigate(`/description/${job?._id}`)}>Details</Button>
        <Button disabled={saved} onClick={saved ? null : () => jobSaveHandler(job)} className={`${saved ? 'bg-green-500 cursor-not-allowed' : 'bg-[#7209b7]'} cursor-pointer`}>{saved? 'Saved':'Save for later'}</Button>
      </div>
    </div>
  )
}

export default Job