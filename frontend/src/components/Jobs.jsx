import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import FilterBar from './FilterBar'
import Job from './Job'
import { useSelector, useDispatch } from 'react-redux'
import { clearFilters, setSearchedQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { Button } from './ui/button'


function Jobs() {
    const { allJobs, searchedQuery, filters = { location: [], industry: [], salary: [] } } = useSelector(state => state.job || {});
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const dispatch = useDispatch();
   
    useEffect(() => {
        let filtered = [...allJobs];

        // Apply text search query if exists
        if (searchedQuery) {
            filtered = filtered.filter((job) => {
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
        }

        // Apply location filters (AND logic - all selected locations)
        if (filters?.location && filters.location.length > 0) {
            filtered = filtered.filter(job => 
                filters.location.some(loc => 
                    job.location.toLowerCase().includes(loc.toLowerCase())
                )
            );
        }

        // Apply industry/role filters (AND logic - all selected roles)
        if (filters?.industry && filters.industry.length > 0) {
            filtered = filtered.filter(job => 
                filters.industry.some(role => 
                    job.title.toLowerCase().includes(role.toLowerCase())
                )
            );
        }

        // Apply salary filters (AND logic - all selected salary ranges)
        if (filters?.salary && filters.salary.length > 0) {
            filtered = filtered.filter(job => {
                const salary = Number(job.salary);
                return filters.salary.some(salaryRange => {
                    if (salaryRange === "0-2LPA") {
                        return salary >= 0 && salary <= 2;
                    } else if (salaryRange === "2-5LPA") {
                        return salary >= 2 && salary <= 5;
                    } else if (salaryRange === "6-10LPA") {
                        return salary >= 6 && salary <= 10;
                    }
                    return false;
                });
            });
        }

        setFilterJobs(filtered);
    }, [allJobs, searchedQuery, filters])


    const activeFiltersCount = (filters?.location?.length || 0) + (filters?.industry?.length || 0) + (filters?.salary?.length || 0);

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-50 via-purple-50/30 to-white'>
            <Navbar />
            
            {/* Header Section */}
            <div className='bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8'>
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                        <div>
                            <h1 className='text-3xl md:text-4xl font-bold mb-2'>Find Your Dream Job</h1>
                            <p className='text-purple-100'>
                                {filterJobs.length} {filterJobs.length === 1 ? 'job' : 'jobs'} available
                                {activeFiltersCount > 0 && (
                                    <span className='ml-2 px-2 py-1 bg-white/20 rounded-full text-sm'>
                                        {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                                    </span>
                                )}
                            </p>
                        </div>
                        {searchedQuery && (
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2'>
                                <p className='text-sm text-purple-100'>Searching for: <span className='font-semibold text-white'>{searchedQuery}</span></p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 py-6'>
                <div className='sm:hidden block mb-4'>
                    <FilterBar />
                </div>
                
                <div className='flex gap-6'>
                    {/* Filter Sidebar */}
                    <div className='hidden sm:block flex-shrink-0'>
                        <FilterCard />
                    </div>
                    
                    {/* Jobs Grid */}
                    <div className='flex-1 min-w-0'>
                        {filterJobs.length <= 0 ? (
                            <div className='bg-white rounded-xl shadow-lg p-12 text-center'>
                                <div className='max-w-md mx-auto'>
                                    <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                        <Briefcase className='w-12 h-12 text-gray-400' />
                                    </div>
                                    <h2 className='text-2xl font-bold text-gray-800 mb-2'>No Jobs Found</h2>
                                    <p className='text-gray-600 mb-6'>
                                        {activeFiltersCount > 0 || searchedQuery 
                                            ? "Try adjusting your filters or search criteria" 
                                            : "No jobs available at the moment. Check back later!"}
                                    </p>
                                    {(activeFiltersCount > 0 || searchedQuery) && (
                                        <Button 
                                            onClick={() => {
                                                dispatch(clearFilters());
                                                dispatch(setSearchedQuery(""));
                                            }}
                                            className='bg-[#6B4EFF] hover:bg-[#5a3dd9]'
                                        >
                                            Clear All Filters
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className='space-y-4'>
                                <div className='flex items-center justify-between mb-4'>
                                    <p className='text-gray-600'>
                                        Showing <span className='font-semibold text-gray-800'>{filterJobs.length}</span> of <span className='font-semibold text-gray-800'>{allJobs.length}</span> jobs
                                    </p>
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {filterJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            key={job?._id}
                                        >
                                            <Job job={job}/>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs