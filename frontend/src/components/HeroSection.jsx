import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

function HeroSection() {
    
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Job</span></h1>
                <p>Explore thousands of job opportunities, connect with top employers, and take the next step in your career—all in one place. Start your journey today!</p>
                <div className='flex w-[40%] mx-auto shadow-lg border border-gray-200 rounded-full items-center gap-4'>
                    <Input 
                    type='text'
                    placeholder='Find your dream jobs'
                    className='border-none'
                    />
                    <Button className='rounded-r-full bg-[#6A38C2]'>
                        <Search className='h-5 w-5'/>
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default HeroSection