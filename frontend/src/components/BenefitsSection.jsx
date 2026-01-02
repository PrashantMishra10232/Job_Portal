import React from 'react'
import { Shield, Zap, Target, Heart, CheckCircle2, Star } from 'lucide-react'

function BenefitsSection() {
  const benefits = [
    {
      icon: <Shield className='w-8 h-8' />,
      title: 'Verified Jobs',
      description: 'All job postings are verified to ensure authenticity and quality opportunities.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: <Zap className='w-8 h-8' />,
      title: 'Quick Apply',
      description: 'Apply to multiple jobs with just one click. Save time and effort in your job search.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: <Target className='w-8 h-8' />,
      title: 'Smart Matching',
      description: 'Our AI-powered system matches you with jobs that fit your skills and preferences.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: <Heart className='w-8 h-8' />,
      title: 'Save Favorites',
      description: 'Save jobs you love and come back to them later. Never miss an opportunity.',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: <CheckCircle2 className='w-8 h-8' />,
      title: 'ATS Score',
      description: 'Get instant feedback on your resume with our ATS scoring system.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: <Star className='w-8 h-8' />,
      title: 'Career Growth',
      description: 'Access resources and tools to help you grow your career and achieve your goals.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  return (
    <div className='bg-gradient-to-br from-purple-50 to-blue-50 py-20 my-20'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold mb-4'>
            Why Choose <span className='text-[#6A38C2]'>CareerFlow</span>?
          </h2>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
            We provide everything you need to find your dream job and advance your career
          </p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className='bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
            >
              <div className={`${benefit.bgColor} ${benefit.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                {benefit.icon}
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>{benefit.title}</h3>
              <p className='text-gray-600'>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BenefitsSection

