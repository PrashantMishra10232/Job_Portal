import React from 'react'
import { useSelector } from 'react-redux'
import Job from './Job'
import Navbar from './shared/Navbar'
import { motion } from 'framer-motion'


function SavedJobs() {
    const { savedJobs } = useSelector((state) => state.job)

    return (
        <div className='bg-gradient-to-b from-purple-100 to-white'>
            <Navbar />
            <div className='mx-2 sm:mx-auto'>
                <h1 className='font-bold text-xl ml-2'>Saved Jobs ({savedJobs.length})</h1>
                <div className='p-6 grid md:grid-cols-3 gap-5 grid-cols-1'>
                    {savedJobs.length >= 0 && savedJobs.map((job) => {
                        return (
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                                key={job?._id}>
                                <Job job={job} />
                            </motion.div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default SavedJobs