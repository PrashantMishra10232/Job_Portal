import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Search, Briefcase, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

function Browse() {
    useGetAllJobs();
    const {allJobs, searchedQuery} = useSelector((state)=>state.job);
    const dispatch = useDispatch();
    const [filteredJobs, setFilteredJobs] = useState(allJobs);

    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])

    useEffect(() => {
        if (searchedQuery) {
            const filtered = allJobs.filter((job) => {
                const salary = Number(job.salary);
                let isSalaryMatch = false;

                // Check if searchedQuery matches salary range
                const salaryRangeMatch = searchedQuery.match(/(\d+)-(\d+)LPA/);
                if (salaryRangeMatch) {
                    const min = Number(salaryRangeMatch[1]);
                    const max = Number(salaryRangeMatch[2]);
                    isSalaryMatch = salary >= min && salary <= max;
                }

                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) || 
                       job.description.toLowerCase().includes(searchedQuery.toLowerCase()) || 
                       job.location.toLowerCase().includes(searchedQuery.toLowerCase()) || 
                       isSalaryMatch;
            });
            setFilteredJobs(filtered);
        } else {
            setFilteredJobs(allJobs);
        }
    }, [allJobs, searchedQuery])

    const handleClearSearch = () => {
        dispatch(setSearchedQuery(""));
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-50 via-purple-50/30 to-white'>
            <Navbar />
            
            {/* Header Section */}
            <div className='bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8'>
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                        <div>
                            <h1 className='text-3xl md:text-4xl font-bold mb-2'>Search Results</h1>
                            <p className='text-purple-100'>
                                {filteredJobs.length} {filteredJobs.length === 1 ? 'job found' : 'jobs found'}
                                {searchedQuery && (
                                    <span className='ml-2'>for your search</span>
                                )}
                            </p>
                        </div>
                        {searchedQuery && (
                            <div className='flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2'>
                                <Search className='w-5 h-5' />
                                <p className='text-sm'>
                                    <span className='text-purple-100'>Searching:</span> 
                                    <span className='font-semibold text-white ml-2'>{searchedQuery}</span>
                                </p>
                                <Button
                                    onClick={handleClearSearch}
                                    variant="ghost"
                                    size="sm"
                                    className='text-white hover:bg-white/20 h-6 w-6 p-0'
                                >
                                    <X className='w-4 h-4' />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Jobs Grid */}
            <div className='max-w-7xl mx-auto px-4 py-8'>
                {filteredJobs.length > 0 ? (
                    <div className='space-y-4'>
                        <div className='flex items-center justify-between mb-4'>
                            <p className='text-gray-600'>
                                Showing <span className='font-semibold text-gray-800'>{filteredJobs.length}</span> of <span className='font-semibold text-gray-800'>{allJobs.length}</span> jobs
                            </p>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {filteredJobs.map((job) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    key={job._id}
                                >
                                    <Job job={job}/>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='bg-white rounded-xl shadow-lg p-12 text-center'>
                        <div className='max-w-md mx-auto'>
                            <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <Search className='w-12 h-12 text-gray-400' />
                            </div>
                            <h2 className='text-2xl font-bold text-gray-800 mb-2'>No Jobs Found</h2>
                            <p className='text-gray-600 mb-6'>
                                {searchedQuery 
                                    ? `No jobs match your search for "${searchedQuery}". Try different keywords or browse all jobs.` 
                                    : "No jobs available at the moment. Check back later!"}
                            </p>
                            {searchedQuery && (
                                <Button 
                                    onClick={handleClearSearch}
                                    className='bg-[#6B4EFF] hover:bg-[#5a3dd9]'
                                >
                                    Clear Search
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse