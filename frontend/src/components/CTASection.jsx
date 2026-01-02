import React from 'react'
import { Button } from './ui/button'
import { ArrowRight, Upload } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function CTASection() {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  return (
    <div className='bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] py-20 my-20'>
      <div className='max-w-4xl mx-auto px-4 text-center'>
        <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
          Ready to Start Your Career Journey?
        </h2>
        <p className='text-purple-100 text-lg mb-8 max-w-2xl mx-auto'>
          Join thousands of job seekers who found their dream jobs through CareerFlow. 
          Create your profile, upload your resume, and start applying today!
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          {!user ? (
            <>
              <Button
                onClick={() => navigate('/signup')}
                size="lg"
                className='bg-white text-[#6A38C2] hover:bg-gray-100 text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all'
              >
                Get Started Free
                <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
              <Button
                onClick={() => navigate('/atsScore')}
                size="lg"
                className='border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#6A38C2] text-lg px-8 py-6 rounded-full'
              >
                <Upload className='mr-2 w-5 h-5' />
                Check ATS Score
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate('/jobs')}
                size="lg"
                className='bg-white text-[#6A38C2] hover:bg-gray-100 text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all'
              >
                Browse Jobs
                <ArrowRight className='ml-2 w-5 h-5' />
              </Button>
              <Button
                onClick={() => navigate('/atsScore')}
                size="lg"
                className='border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#6A38C2] text-lg px-8 py-6 rounded-full'
              >
                <Upload className='mr-2 w-5 h-5' />
                Check ATS Score
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CTASection

