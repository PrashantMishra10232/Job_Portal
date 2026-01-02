import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Job from './Job'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, BookmarkCheck, Trash2, Search, Filter } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { removeSavedJob, clearSavedJobs } from '@/redux/jobSlice'
import { toast } from 'sonner'

function SavedJobs() {
    const { savedJobs } = useSelector((state) => state.job)
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredJobs, setFilteredJobs] = useState(savedJobs)

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredJobs(savedJobs)
        } else {
            const filtered = savedJobs.filter((job) => {
                const query = searchQuery.toLowerCase()
                return (
                    job?.title?.toLowerCase().includes(query) ||
                    job?.company?.name?.toLowerCase().includes(query) ||
                    job?.location?.toLowerCase().includes(query) ||
                    job?.description?.toLowerCase().includes(query)
                )
            })
            setFilteredJobs(filtered)
        }
    }, [searchQuery, savedJobs])

    const handleRemoveJob = (jobId) => {
        dispatch(removeSavedJob(jobId))
        toast.success('Job removed from saved list')
    }

    const handleClearAll = () => {
        if (savedJobs.length === 0) return
        if (window.confirm('Are you sure you want to clear all saved jobs?')) {
            dispatch(clearSavedJobs())
            toast.success('All saved jobs cleared')
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-50 via-white to-purple-50/30'>
            <Navbar />
            
            {/* Header Section */}
            <div className='bg-gradient-to-r from-[#6B4EFF] via-[#5a3dd9] to-[#4d32c2] text-white py-12 sm:py-16'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                        <div>
                            <div className='flex items-center gap-3 mb-2'>
                                <BookmarkCheck className='w-8 h-8 sm:w-10 sm:h-10' />
                                <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>
                                    Saved Jobs
                                </h1>
                            </div>
                            <p className='text-white/80 text-sm sm:text-base mt-2'>
                                {savedJobs.length === 0 
                                    ? 'No jobs saved yet' 
                                    : `You have ${savedJobs.length} ${savedJobs.length === 1 ? 'job' : 'jobs'} saved`}
                            </p>
                        </div>
                        {savedJobs.length > 0 && (
                            <Button
                                variant="outline"
                                onClick={handleClearAll}
                                className='bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm'
                            >
                                <Trash2 className='w-4 h-4 mr-2' />
                                Clear All
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            {savedJobs.length > 0 && (
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8'>
                    <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-4'>
                        <div className='relative'>
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                            <Input
                                type='text'
                                placeholder='Search saved jobs by title, company, or location...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='pl-10 pr-4 py-6 text-base border-gray-200 focus:border-[#6B4EFF] focus:ring-[#6B4EFF]'
                            />
                        </div>
                        {searchQuery && (
                            <p className='text-sm text-gray-500 mt-2'>
                                Found {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} matching "{searchQuery}"
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Jobs Grid */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
                {savedJobs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='text-center py-16 sm:py-24'
                    >
                        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 max-w-md mx-auto'>
                            <div className='w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <Bookmark className='w-10 h-10 text-[#6B4EFF]' />
                            </div>
                            <h2 className='text-2xl font-bold text-gray-800 mb-3'>No Saved Jobs Yet</h2>
                            <p className='text-gray-600 mb-6'>
                                Start saving jobs you're interested in to view them here later
                            </p>
                            <Button
                                onClick={() => window.location.href = '/jobs'}
                                className='bg-gradient-to-r from-[#6B4EFF] to-[#5a3dd9] hover:from-[#5a3dd9] hover:to-[#4d32c2] text-white'
                            >
                                Browse Jobs
                            </Button>
                        </div>
                    </motion.div>
                ) : filteredJobs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='text-center py-16 sm:py-24'
                    >
                        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 max-w-md mx-auto'>
                            <Search className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                            <h2 className='text-2xl font-bold text-gray-800 mb-3'>No Jobs Found</h2>
                            <p className='text-gray-600 mb-6'>
                                No saved jobs match your search "{searchQuery}"
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => setSearchQuery('')}
                                className='border-[#6B4EFF] text-[#6B4EFF] hover:bg-[#6B4EFF] hover:text-white'
                            >
                                Clear Search
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                        <AnimatePresence mode='popLayout'>
                            {filteredJobs.map((job, index) => (
                                <motion.div
                                    key={job?._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className='relative group'
                                >
                                    <div className='absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity'>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleRemoveJob(job._id)
                                            }}
                                            className='h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg'
                                        >
                                            <Trash2 className='w-4 h-4' />
                                        </Button>
                                    </div>
                                    <Job job={job} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default SavedJobs