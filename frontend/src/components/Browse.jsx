import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

function Browse() {
    useGetAllJobs();
    const {allJobs} = useSelector((state)=>state.job);
    // const {searchedJobs} = useSelector((state)=>state.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div className='m-2 bg-gradient-to-b from-purple-100 to-white'>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse