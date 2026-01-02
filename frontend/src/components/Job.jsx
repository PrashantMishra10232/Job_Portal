import { Bookmark, MapPin } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSavedJobs } from '@/redux/jobSlice'
import { toast } from 'sonner'

function Job({ job }) {
  const navigate = useNavigate();
  const daysAgo = Math.floor((new Date() - new Date(job?.createdAt)) / (1000 * 60 * 60 * 24));
  const dispatch = useDispatch();
  const { savedJobs } = useSelector((state) => state.job);

  // Sync saved state with Redux state
  const [saved, setSaved] = useState(() => {
    const existingJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    return existingJobs.some((j) => j._id === job._id);
  });

  // Update saved state when Redux savedJobs changes
  useEffect(() => {
    const isJobSaved = savedJobs.some((j) => j._id === job._id);
    setSaved(isJobSaved);
  }, [savedJobs, job._id]);

  const jobSaveHandler = (job) => {
    const existingJob = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const isAlreadySaved = existingJob.some((j) => j._id === job._id);
    
    if (!isAlreadySaved) {
      dispatch(setSavedJobs(job));
      setSaved(true);
      toast.success("Job saved successfully!");
    }
  }
  
  return (
    <div className='group p-6 rounded-xl bg-white border border-gray-200 hover:border-[#6B4EFF] hover:shadow-2xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-purple-50/30'>
      {/* Header with time and bookmark */}
      <div className='flex items-center justify-between mb-4'>
        <span className='text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>
          {daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`}
        </span>
        <Button 
          variant='ghost' 
          disabled={saved} 
          className={`rounded-full cursor-pointer h-8 w-8 p-0 ${saved ? 'text-green-600' : 'text-gray-400 hover:text-[#6B4EFF]'}`}
          size='icon' 
          onClick={saved ? null : () => jobSaveHandler(job)}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Company Info */}
      <div className='flex items-center gap-3 mb-4'>
        <div className='p-2 bg-white rounded-lg border border-gray-200 shadow-sm group-hover:border-[#6B4EFF] transition-colors'>
          <Avatar className='h-12 w-12'>
            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
          </Avatar>
        </div>
        <div className='flex-1 min-w-0'>
          <h2 className='font-bold text-lg text-gray-800 truncate group-hover:text-[#6B4EFF] transition-colors'>
            {job?.company?.name || "Company"}
          </h2>
          <p className='text-sm text-gray-500 flex items-center gap-1'>
            <MapPin className='w-3 h-3' />
            {job?.location || "India"}
          </p>
        </div>
      </div>

      {/* Job Title */}
      <h1 className='font-bold text-xl text-gray-800 mb-3 group-hover:text-[#6B4EFF] transition-colors line-clamp-2'>
        {job?.title}
      </h1>

      {/* Description Preview */}
      <div
        className='text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed'
        dangerouslySetInnerHTML={{ __html: job?.description }}
      />

      {/* Badges */}
      <div className='flex items-center gap-2 mb-4 flex-wrap'>
        <Badge className='bg-blue-50 text-blue-700 border-blue-200 font-semibold hover:bg-blue-100 transition-colors'>
          {job?.position} {job?.position === 1 ? 'Position' : 'Positions'}
        </Badge>
        <Badge className='bg-red-50 text-red-700 border-red-200 font-semibold hover:bg-red-100 transition-colors'>
          {job?.jobType}
        </Badge>
        <Badge className='bg-purple-50 text-purple-700 border-purple-200 font-semibold hover:bg-purple-100 transition-colors'>
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className='flex items-center gap-3 pt-4 border-t border-gray-100'>
        <Button 
          variant='outline' 
          onClick={() => navigate(`/description/${job?._id}`)}
          className='flex-1 border-gray-300 hover:border-[#6B4EFF] hover:text-[#6B4EFF] transition-colors'
        >
          View Details
        </Button>
        <Button 
          disabled={saved} 
          onClick={saved ? null : () => jobSaveHandler(job)} 
          className={`flex-1 ${saved ? 'bg-green-500 hover:bg-green-600 cursor-not-allowed' : 'bg-gradient-to-r from-[#6B4EFF] to-[#5a3dd9] hover:from-[#5a3dd9] hover:to-[#4d32c2]'} text-white shadow-md hover:shadow-lg transition-all`}
        >
          {saved ? (
            <>
              <Bookmark className='w-4 h-4 mr-2 fill-current' />
              Saved
            </>
          ) : (
            <>
              <Bookmark className='w-4 h-4 mr-2' />
              Save
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default Job