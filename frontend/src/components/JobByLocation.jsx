import React from 'react'
import { MapPin } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFilters, clearFilters } from '@/redux/jobSlice'

function JobByLocation() {
  const { allJobs = [] } = useSelector(state => state.job);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get unique locations and count jobs per location
  const locationCounts = allJobs.reduce((acc, job) => {
    const location = job.location || 'Unknown';
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});

  // Sort by job count and get top 6
  const topLocations = Object.entries(locationCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([location, count]) => ({ location, count }));

  if (topLocations.length === 0) {
    return null;
  }

  const handleLocationClick = (location) => {
    // Clear existing filters and set only the location filter
    dispatch(clearFilters());
    dispatch(setFilters({ location: [location] }));
    navigate('/jobs');
  };

  return (
    <div className='max-w-7xl mx-auto my-20 px-4'>
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-bold mb-4'>
          Jobs by <span className='text-[#6A38C2]'>Location</span>
        </h2>
        <p className='text-gray-600 text-lg'>Explore opportunities in top cities</p>
      </div>
      
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        {topLocations.map(({ location, count }, index) => (
          <div
            key={index}
            onClick={() => handleLocationClick(location)}
            className='bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group text-center'
          >
            <div className='bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors'>
              <MapPin className='w-6 h-6' />
            </div>
            <h3 className='font-bold text-lg text-gray-800 mb-1 group-hover:text-[#6A38C2] transition-colors'>
              {location}
            </h3>
            <p className='text-gray-500 text-sm'>{count} {count === 1 ? 'Job' : 'Jobs'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobByLocation

