import React from 'react'
import { Building2, MapPin, ExternalLink } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from './ui/avatar'

function FeaturedCompanies() {
  const { allCompanies = [] } = useSelector(state => state.company || { allCompanies: [] });
  const navigate = useNavigate();

  // Get top 6 companies or all if less than 6
  const featuredCompanies = allCompanies.slice(0, 6);

  if (featuredCompanies.length === 0) {
    return null;
  }

  return (
    <div className='max-w-7xl mx-auto my-20 px-4'>
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-bold mb-4'>
          <span className='text-[#6A38C2]'>Featured</span> Companies
        </h2>
        <p className='text-gray-600 text-lg'>Discover opportunities with leading employers</p>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {featuredCompanies.map((company) => (
          <div
            key={company._id}
            className='bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group'
          >
            <div className='flex items-center gap-4 mb-4'>
              <Avatar className='w-16 h-16 border-2 border-gray-200 group-hover:border-[#6A38C2] transition-colors'>
                <AvatarImage src={company.logo} alt={company.name} />
              </Avatar>
              <div className='flex-1'>
                <h3 className='font-bold text-xl text-gray-800 group-hover:text-[#6A38C2] transition-colors'>
                  {company.name}
                </h3>
                {company.location && (
                  <div className='flex items-center gap-1 text-gray-500 text-sm mt-1'>
                    <MapPin className='w-4 h-4' />
                    <span>{company.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            {company.description && (
              <p className='text-gray-600 text-sm line-clamp-2 mb-4'>
                {company.description}
              </p>
            )}
            
            {company.website && (
              <div className='flex items-center gap-2 text-[#6A38C2] text-sm font-medium'>
                <ExternalLink className='w-4 h-4' />
                <span>Visit Website</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {allCompanies.length > 6 && (
        <div className='text-center mt-8'>
          <button
            onClick={() => navigate('/browse')}
            className='px-6 py-3 bg-[#6A38C2] text-white rounded-full font-semibold hover:bg-[#5a2fa8] transition-colors shadow-lg hover:shadow-xl'
          >
            View All Companies
          </button>
        </div>
      )}
    </div>
  )
}

export default FeaturedCompanies

