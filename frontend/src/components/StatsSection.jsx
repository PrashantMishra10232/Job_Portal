import React from 'react'
import { Briefcase, Building2, Users, TrendingUp } from 'lucide-react'
import { useSelector } from 'react-redux'

function StatsSection() {
  const { allJobs = [] } = useSelector(state => state.job || {});
  const { allCompanies = [] } = useSelector(state => state.company || {});

  const stats = [
    {
      icon: <Briefcase className='w-8 h-8' />,
      number: allJobs?.length || 0,
      label: 'Active Jobs',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: <Building2 className='w-8 h-8' />,
      number: allCompanies?.length || 0,
      label: 'Companies',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: <Users className='w-8 h-8' />,
      number: '10K+',
      label: 'Job Seekers',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: <TrendingUp className='w-8 h-8' />,
      number: '95%',
      label: 'Success Rate',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  return (
    <div className='max-w-7xl mx-auto my-20 px-4'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        {stats.map((stat, index) => (
          <div 
            key={index}
            className='bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center'
          >
            <div className={`${stat.bgColor} ${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
              {stat.icon}
            </div>
            <h3 className='text-3xl font-bold text-gray-800 mb-2'>{stat.number}</h3>
            <p className='text-gray-600 font-medium'>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsSection

