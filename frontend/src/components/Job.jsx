import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function Job({job}) {
  const navigate = useNavigate();
  const daysAgo = Math.floor((new Date() - new Date(job?.createdAt)) / (1000 * 60 * 60 * 24));
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{daysAgo} days ago</p>
        <Button variant='outline' className='rounded-full' size='icon'><Bookmark /></Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <Button className='p-6' variant='outline' size="icon">
          <Avatar>
            <AvatarImage src='https://static.vecteezy.com/system/resources/previews/000/404/753/original/modern-company-logo-design-vector.jpg' />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-md text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-bold' variant='ghost'>{job?.position}Positions</Badge>
        <Badge className='text-[#F83002] font-bold' variant='ghost'>{job?.jobType}</Badge>
        <Badge className='text-[#7209b7] font-bold' variant='ghost'>{job?.salary}LPA</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button variant='outline' onClick={()=>navigate(`/description/${job?._id}`)}>Details</Button>
        <Button className='bg-[#7209b7]'>Save for later</Button>
      </div>
    </div>
  )
}

export default Job