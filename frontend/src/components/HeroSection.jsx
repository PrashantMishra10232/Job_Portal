import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search, Sparkles, TrendingUp, Briefcase } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = ()=>{
        if (query.trim()) {
            dispatch(setSearchedQuery(query));
            navigate("/browse")
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchJobHandler();
        }
    }

    return (
        <div className='relative overflow-hidden'>
            {/* Background gradient with animated elements */}
            <div className='absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50'>
                <div className='absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob'></div>
                <div className='absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000'></div>
                <div className='absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000'></div>
            </div>

            <div className='relative text-center py-20 md:py-28 px-4'>
                <div className='flex flex-col gap-6 max-w-4xl mx-auto'>
                    {/* Badge */}
                    <div className='flex items-center justify-center gap-2'>
                        <span className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-[#6A38C2] font-semibold text-sm shadow-sm border border-purple-200/50'>
                            <Sparkles className='w-4 h-4' />
                            No. 1 Job Hunt Platform
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight'>
                        <span className='block'>Search, Apply &</span>
                        <span className='block mt-2'>
                            Get Your <span className='bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] bg-clip-text text-transparent'>Dream Job</span>
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
                        Explore thousands of job opportunities, connect with top employers, and take the next step in your career—all in one place.
                    </p>

                    {/* Search Bar */}
                    <div className='mt-8 flex flex-col sm:flex-row w-full max-w-2xl mx-auto gap-3'>
                        <div className='flex-1 relative'>
                            <div className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'>
                                <Search className='w-5 h-5' />
                            </div>
                            <Input 
                                type='text'
                                placeholder='Search jobs, companies, or keywords...'
                                value={query}
                                onChange={(e)=> setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className='pl-12 pr-4 h-14 text-base border-2 border-gray-200 focus:border-[#6A38C2] rounded-full shadow-lg bg-white/90 backdrop-blur-sm'
                            />
                        </div>
                        <Button 
                            onClick={searchJobHandler}
                            className='h-14 px-8 rounded-full bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] hover:from-[#5a2fa8] hover:to-[#7a4cd6] shadow-lg hover:shadow-xl transition-all duration-200 text-base font-semibold'
                        >
                            <Search className='h-5 w-5 mr-2'/>
                            Search Jobs
                        </Button>
                    </div>

                    {/* Quick Stats */}
                    <div className='flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-gray-200/50'>
                        <div className='flex items-center gap-2 text-gray-600'>
                            <TrendingUp className='w-5 h-5 text-[#6A38C2]' />
                            <span className='text-sm font-medium'>10K+ Active Jobs</span>
                        </div>
                        <div className='flex items-center gap-2 text-gray-600'>
                            <Briefcase className='w-5 h-5 text-[#6A38C2]' />
                            <span className='text-sm font-medium'>500+ Companies</span>
                        </div>
                        <div className='flex items-center gap-2 text-gray-600'>
                            <Sparkles className='w-5 h-5 text-[#6A38C2]' />
                            <span className='text-sm font-medium'>95% Success Rate</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add custom animation styles */}
            <style>{`
                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    )
}

export default HeroSection