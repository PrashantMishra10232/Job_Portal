import React from 'react'
import { Button } from '../ui/button'
import { CirclePlus } from 'lucide-react'
import { Link } from 'react-router-dom'

function InterviewScheduled() {
    return (
        <>
            <div className='flex items-center p-4 max-h-[100px]'>
                <h1 className='text-4xl text-[#1B5CBE] font-semibold mx-auto'>Interview Scheduled</h1>
                <div>
                    <Link to='/admin/interviewSetup'>
                        <Button variant='outline' className='bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/50'>New Interview <CirclePlus /></Button>
                    </Link>
                </div>
            </div>

            <div className='overflow-x-auto p-6'>
                all Interviews
            </div>

        </>

    )
}

export default InterviewScheduled