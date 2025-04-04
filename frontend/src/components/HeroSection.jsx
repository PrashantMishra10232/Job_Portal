import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = ()=>{
        dispatch(setSearchedQuery(query));
        navigate("/browse")
    }



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
                    onChange={(e)=> setQuery(e.target.value)}
                    className='border-none outline-none w-full'
                    />
                    <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2]'>
                        <Search className='h-5 w-5'/>
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default HeroSection