import React from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux'
import { Briefcase } from 'lucide-react'

function LatestJobs() {
  const {allJobs} = useSelector(state => state.job);
  const latestJobs = allJobs?.slice(0, 6) || [];
  
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20'>
      <div className='text-center mb-8 sm:mb-12'>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-2'>
          <span className='text-[#6B4EFF]'>Latest & Top</span> Job Openings
        </h1>
        <p className='text-gray-600 text-sm sm:text-base mt-2'>
          Discover the most recent opportunities from top companies
        </p>
      </div>
      
      {latestJobs.length === 0 ? (
        <div className='text-center py-12'>
          <Briefcase className='w-16 h-16 text-gray-300 mx-auto mb-4' />
          <p className='text-gray-500 text-lg'>No jobs available at the moment</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {latestJobs.map((job) => (
            <LatestJobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}

export default LatestJobs