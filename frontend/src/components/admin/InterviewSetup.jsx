import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Calendar } from '../ui/calendar'
import { Calendar as CalendarIcon, MoveLeft } from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { format, startOfDay, endOfWeek, addWeeks, isBefore } from "date-fns"
import axiosInstance from '@/utils/axiosInstance'
import { INTERVIEW_API_ENDPOINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllApplications from '@/hooks/useGetAllApplications'
import { toast } from 'sonner'


function InterviewSetup() {

    useGetAllApplications();
    
    const [dates, setDates] = useState({})
    const { allApplications, searchedApplications } = useSelector(store => store.application)

    const [filterApplications, setFilteredApplications] = useState(allApplications);




    useEffect(() => {
        const filteredApplication = allApplications.length >= 0 && allApplications.filter((application) => {
            if (!searchedApplications) {
                return true
            }
            return application.job.title.toLowerCase().includes(searchedApplications.toLowerCase())
        })
        setFilteredApplications(filteredApplication);
    }, [allApplications, searchedApplications])

    const [input, setInput] = useState({})

    const handleInterviewSchedule = async (applicationId, date, time, phase) => {
        try {
            const res = await axiosInstance.post(`${INTERVIEW_API_ENDPOINT}/interview/schedule`, {
                applicationId: applicationId,
                date,
                time,
                phase
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            })
            if (res.data.success) {
                toast.message(res.data.message);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message;
            console.error(errorMessage)
        }
    }

    return (
        <div>

            <div className='flex items-center justify-center mb-3'>
                <Link to='/admin/meetings'>
                    <Button className='bg-yellow-50 text-[#071C50] shadow-2xl border border-gray-400 hover:bg-cyan-300'><MoveLeft /></Button>
                </Link>
                <div className='flex flex-col'>
                    <h1 className='bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-5xl font-extrabold text-transparent mt-5 mx-5'>Schedule Interviews</h1>
                    <p className='text-center text-2xl font-bold text-blue-400'>All Available Applications</p>
                </div>

            </div>

            <div className='p-10 overflow-y-auto max-h-screen'>
                <Table className='min-w-full border border-gray-300 shadow-lg'>
                    <TableCaption>Schedule your Interviews here</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='text-xl font-bold text-[#071C50]'>Applicant</TableHead>
                            <TableHead className='text-xl font-bold text-[#071C50]'>Job</TableHead>
                            <TableHead className='text-xl font-bold text-[#071C50]'>Phase</TableHead>
                            <TableHead className='text-xl font-bold text-[#071C50]'>Date</TableHead>
                            <TableHead className='text-xl font-bold text-[#071C50]'>Time Slot</TableHead>
                            <TableHead className='text-right text-xl font-bold text-[#071C50]'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterApplications?.map((application) => (
                            <TableRow className='h-[72px]'>
                                <TableCell>{application.applicant.fullName}</TableCell>
                                <TableCell>{application.job.title}</TableCell>
                                <TableCell>
                                    <select
                                        name="phase" id="phase"
                                        className='border px-1 py-2 rounded bg-gray-200 cursor-pointer'
                                        defaultValue=""
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setInput(prev => ({
                                                ...prev,
                                                [application._id]: {
                                                    ...prev[application._id],
                                                    phase: value
                                                }
                                            }));
                                        }}>
                                        <option value="" disabled hidden>Choose a Phase</option>
                                        <option value="1">1. Screening Phase</option>
                                        <option value="2">2. Technical Phase</option>
                                        <option value="3">3. Managerial Phase</option>
                                        <option value="4">4. Final Phase</option>
                                    </select>
                                </TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button className='bg-[#071C50] cursor-pointer'>
                                                <CalendarIcon />
                                                {dates[application._id] ? format(dates[application._id], "PPP") : <span>Pick a date</span>}
                                            </Button>

                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Calendar
                                                mode="single"
                                                selected={dates[application._id]}
                                                onSelect={(date) => {
                                                    setDates(prev => ({
                                                        ...prev,
                                                        [application._id]: date,
                                                    }));
                                                }}
                                                disabled={(date) =>
                                                    isBefore(date, startOfDay(new Date())) || date > endOfWeek(addWeeks(new Date(), 1))
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                                <TableCell>
                                    <select
                                        name="time" id="time"
                                        className='border px-1 py-2 rounded bg-gray-200 cursor-pointer'
                                        defaultValue=""
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setInput(prev => ({
                                                ...prev,
                                                [application._id]: {
                                                    ...prev[application._id],
                                                    time: value
                                                }
                                            }));
                                        }}>
                                        <option value="" disabled hidden>Time slot</option>
                                        <optgroup label='Shift 1'>
                                            <option value="10:00">10:00-10:15</option>
                                            <option value="10:15">10:15-10:30</option>
                                            <option value="10:30">10:30-10:45</option>
                                            <option value="10:45">10:45-11:00</option>
                                        </optgroup>
                                        <optgroup label='Shift 2'>
                                            <option value="12:00">12:00-12:15</option>
                                            <option value="12:15">12:15-12:30</option>
                                            <option value="12:30">12:30-12:45</option>
                                            <option value="12:45">12:45-01:00</option>
                                        </optgroup>
                                    </select>
                                </TableCell>
                                <TableCell className='text-right '>
                                    <Button
                                        className='bg-[#071C50] cursor-pointer'
                                        onClick={() => handleInterviewSchedule(
                                            application._id,
                                            dates[application._id],
                                            input[application._id]?.time,  
                                            input[application._id]?.phase
                                        )}>
                                        Schedule
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>

        </div>
    )
}

export default InterviewSetup