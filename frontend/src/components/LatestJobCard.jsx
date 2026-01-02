import React from 'react'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { MapPin, Briefcase, Clock, DollarSign, ArrowRight } from 'lucide-react'

function LatestJobCard({job}) {
   const navigate = useNavigate();
   const daysAgo = Math.floor((new Date() - new Date(job?.createdAt)) / (1000 * 60 * 60 * 24));
   
    return (
        <div 
            onClick={()=>navigate(`/description/${job._id}`)} 
            className='group p-5 sm:p-6 rounded-xl bg-white border border-gray-200 hover:border-[#6B4EFF] hover:shadow-2xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-purple-50/30 cursor-pointer h-full flex flex-col'
        >
            {/* Header with company info */}
            <div className='flex items-start gap-3 mb-4'>
                <div className='p-2 bg-white rounded-lg border border-gray-200 shadow-sm group-hover:border-[#6B4EFF] transition-colors flex-shrink-0'>
                    <Avatar className='h-12 w-12 sm:h-14 sm:w-14'>
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                        <AvatarFallback className='bg-[#6B4EFF] text-white text-sm font-bold'>
                            {job?.company?.name?.charAt(0) || 'C'}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className='flex-1 min-w-0'>
                    <h2 className='font-bold text-base sm:text-lg text-gray-800 truncate group-hover:text-[#6B4EFF] transition-colors'>
                        {job?.company?.name || "Company"}
                    </h2>
                    <div className='flex items-center gap-1 text-sm text-gray-500 mt-1'>
                        <MapPin className='w-3 h-3 flex-shrink-0' />
                        <span className='truncate'>{job?.location || "India"}</span>
                    </div>
                    <span className='text-xs text-gray-400 mt-1 block'>
                        {daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`}
                    </span>
                </div>
            </div>

            {/* Job Title */}
            <h1 className='font-bold text-lg sm:text-xl text-gray-800 mb-3 group-hover:text-[#6B4EFF] transition-colors line-clamp-2 min-h-[3.5rem]'>
                {job?.title}
            </h1>

            {/* Description Preview */}
            <div className='flex-1 mb-4'>
                <div
                    className='text-gray-600 text-sm leading-relaxed line-clamp-2'
                    dangerouslySetInnerHTML={{ __html: job?.description }}
                />
            </div>

            {/* Badges */}
            <div className='flex items-center gap-2 mb-4 flex-wrap'>
                <Badge className='bg-blue-50 text-blue-700 border-blue-200 font-semibold hover:bg-blue-100 transition-colors text-xs'>
                    <Briefcase className='w-3 h-3 mr-1' />
                    {job?.position} {job?.position === 1 ? 'Position' : 'Positions'}
                </Badge>
                <Badge className='bg-red-50 text-red-700 border-red-200 font-semibold hover:bg-red-100 transition-colors text-xs'>
                    <Clock className='w-3 h-3 mr-1' />
                    {job?.jobType}
                </Badge>
                <Badge className='bg-purple-50 text-purple-700 border-purple-200 font-semibold hover:bg-purple-100 transition-colors text-xs'>
                    <DollarSign className='w-3 h-3 mr-1' />
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* View Details Link */}
            <div className='flex items-center text-[#6B4EFF] font-semibold text-sm group-hover:gap-2 transition-all mt-auto pt-4 border-t border-gray-100'>
                <span>View Details</span>
                <ArrowRight className='w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform' />
            </div>
        </div>
    )
}

export default LatestJobCard