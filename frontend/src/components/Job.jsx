import { Bookmark } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSavedJobs } from '@/redux/jobSlice'
// import useGetJobById from '@/hooks/useGetJobById'

function Job({ job }) {
  const navigate = useNavigate();
  const daysAgo = Math.floor((new Date() - new Date(job?.createdAt)) / (1000 * 60 * 60 * 24));
  const dispatch = useDispatch();
  // const {allJobs} =  useSelector((state)=>state.job);
  const jobSaveHandler=async(job)=>{
    dispatch(setSavedJobs(job))
  }

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{daysAgo} days ago</p>
        <Button variant='outline' className='rounded-full' size='icon' onClick={()=>jobSaveHandler}><Bookmark /></Button>
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
        <Button onClick={()=>jobSaveHandler()} className='bg-[#7209b7]'>Save for later</Button>
      </div>
    </div>
  )
}

export default Job