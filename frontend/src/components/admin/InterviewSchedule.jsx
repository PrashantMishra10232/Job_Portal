import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Calendar } from '../ui/calendar'
import { 
    ArrowLeft, 
    Calendar as CalendarIcon, 
    Clock, 
    User, 
    Briefcase, 
    Building2,
    CheckCircle2,
    Loader2,
    Search,
    Video
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { format, startOfDay, endOfWeek, addWeeks, isBefore } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Label } from '../ui/label'
import { INTERVIEW_API_ENDPOINT } from '@/utils/constant'
import axiosInstance from '@/utils/axiosInstance'
import { toast } from 'sonner'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'

function InterviewSchedule() {
    const navigate = useNavigate();
    const [approvedApplications, setApprovedApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDates, setSelectedDates] = useState({});
    const [interviewData, setInterviewData] = useState({});
    const [scheduling, setScheduling] = useState({});

    useEffect(() => {
        fetchApprovedApplications();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredApplications(approvedApplications);
        } else {
            const filtered = approvedApplications.filter((app) => {
                const query = searchQuery.toLowerCase();
                return (
                    app?.applicant?.fullName?.toLowerCase().includes(query) ||
                    app?.applicant?.email?.toLowerCase().includes(query) ||
                    app?.job?.title?.toLowerCase().includes(query) ||
                    app?.job?.company?.name?.toLowerCase().includes(query)
                );
            });
            setFilteredApplications(filtered);
        }
    }, [searchQuery, approvedApplications]);

    const fetchApprovedApplications = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`${INTERVIEW_API_ENDPOINT}/interview/applications/approved`, { withCredentials: true });
            if (res.data.success) {
                setApprovedApplications(res.data.data || []);
                setFilteredApplications(res.data.data || []);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to fetch approved applications");
        } finally {
            setLoading(false);
        }
    };

    const handleScheduleInterview = async (applicationId) => {
        const data = interviewData[applicationId];
        const date = selectedDates[applicationId];

        if (!date || !data?.time || !data?.phase) {
            toast.error("Please select date, time slot, and interview phase");
            return;
        }

        setScheduling(prev => ({ ...prev, [applicationId]: true }));

        try {
            const dateTimestamp = new Date(date).getTime();
            const res = await axiosInstance.post(
                `${INTERVIEW_API_ENDPOINT}/interview/schedule`,
                {
                    applicationId: applicationId,
                    date: dateTimestamp,
                    time: data.time,
                    phase: Number(data.phase)
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success("Interview scheduled successfully!");
                // Remove scheduled application from list
                setApprovedApplications(prev => prev.filter(app => app._id !== applicationId));
                setFilteredApplications(prev => prev.filter(app => app._id !== applicationId));
                // Clear form data
                setSelectedDates(prev => {
                    const newDates = { ...prev };
                    delete newDates[applicationId];
                    return newDates;
                });
                setInterviewData(prev => {
                    const newData = { ...prev };
                    delete newData[applicationId];
                    return newData;
                });
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to schedule interview");
        } finally {
            setScheduling(prev => ({ ...prev, [applicationId]: false }));
        }
    };

    const timeSlots = [
        '10:00-10:15',
        '10:15-10:30',
        '10:30-10:45',
        '10:45-11:00',
        '12:00-12:15',
        '12:15-12:30',
        '12:30-12:45',
        '12:45-01:00'
    ];

    const phases = [
        { value: 1, label: '1st Phase - Screening' },
        { value: 2, label: '2nd Phase - Technical' },
        { value: 3, label: '3rd Phase - Managerial' },
        { value: 4, label: '4th Phase - Final' }
    ];

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-50 via-white to-purple-50/30'>
            <Navbar />
            
            {/* Header Section */}
            <div className='bg-gradient-to-r from-[#6B4EFF] via-[#5a3dd9] to-[#4d32c2] text-white py-8'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/admin/dashboard')}
                        className='mb-4 text-white hover:bg-white/10'
                    >
                        <ArrowLeft className='w-4 h-4 mr-2' />
                        Back to Dashboard
                    </Button>
                    <div className='flex items-center gap-3'>
                        <div className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center'>
                            <Video className='w-6 h-6' />
                        </div>
                        <div>
                            <h1 className='text-3xl sm:text-4xl font-bold mb-1'>Schedule Interviews</h1>
                            <p className='text-white/80 text-sm'>
                                {approvedApplications.length} {approvedApplications.length === 1 ? 'approved applicant' : 'approved applicants'} ready for interview
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Search Bar */}
                <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-6'>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                        <Input
                            type='text'
                            placeholder='Search by applicant name, email, job title, or company...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='pl-10 pr-4 py-6 text-base border-gray-200 focus:border-[#6B4EFF] focus:ring-[#6B4EFF]'
                        />
                    </div>
                </div>

                {/* Applications List */}
                {loading ? (
                    <div className='text-center py-12'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B4EFF] mx-auto'></div>
                        <p className='text-gray-500 mt-4'>Loading approved applicants...</p>
                    </div>
                ) : filteredApplications.length === 0 ? (
                    <div className='text-center py-16 bg-white rounded-xl shadow-lg border border-gray-100'>
                        <Video className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                        <h3 className='text-xl font-bold text-gray-800 mb-2'>
                            {searchQuery ? 'No applicants found' : 'No approved applicants yet'}
                        </h3>
                        <p className='text-gray-500 mb-4'>
                            {searchQuery 
                                ? 'Try adjusting your search criteria' 
                                : 'Approved applicants will appear here once you approve applications'}
                        </p>
                        {searchQuery && (
                            <Button
                                variant="outline"
                                onClick={() => setSearchQuery('')}
                                className='border-[#6B4EFF] text-[#6B4EFF] hover:bg-[#6B4EFF] hover:text-white'
                            >
                                Clear Search
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {filteredApplications.map((application) => (
                            <div
                                key={application._id}
                                className='bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all'
                            >
                                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                                    {/* Applicant Info */}
                                    <div className='lg:col-span-2'>
                                        <div className='flex items-start gap-4 mb-4'>
                                            <Avatar className='h-16 w-16 border-2 border-gray-200'>
                                                <AvatarImage src={application?.applicant?.profilePhoto} alt={application?.applicant?.fullName} />
                                                <AvatarFallback className='bg-[#6B4EFF] text-white text-lg font-bold'>
                                                    {application?.applicant?.fullName?.charAt(0) || 'A'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className='flex-1'>
                                                <div className='flex items-center gap-2 mb-2'>
                                                    <User className='w-4 h-4 text-[#6B4EFF]' />
                                                    <h3 className='font-bold text-lg text-gray-800'>{application?.applicant?.fullName}</h3>
                                                    <Badge className='bg-green-50 text-green-700 border-green-200'>
                                                        <CheckCircle2 className='w-3 h-3 mr-1' />
                                                        Approved
                                                    </Badge>
                                                </div>
                                                <div className='space-y-1 text-sm text-gray-600'>
                                                    <p className='flex items-center gap-2'>
                                                        <Briefcase className='w-4 h-4' />
                                                        <span className='font-semibold'>{application?.job?.title}</span>
                                                    </p>
                                                    <p className='flex items-center gap-2'>
                                                        <Building2 className='w-4 h-4' />
                                                        <span>{application?.job?.company?.name}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Interview Form */}
                                    <div className='lg:col-span-1 space-y-4'>
                                        <div>
                                            <Label className='text-sm font-semibold text-gray-700 mb-2 block'>Interview Phase *</Label>
                                            <Select
                                                onValueChange={(value) => {
                                                    setInterviewData(prev => ({
                                                        ...prev,
                                                        [application._id]: {
                                                            ...prev[application._id],
                                                            phase: value
                                                        }
                                                    }));
                                                }}
                                                value={interviewData[application._id]?.phase || ''}
                                            >
                                                <SelectTrigger className='h-10 border-gray-200'>
                                                    <SelectValue placeholder="Select phase" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {phases.map(phase => (
                                                        <SelectItem key={phase.value} value={phase.value.toString()}>
                                                            {phase.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className='text-sm font-semibold text-gray-700 mb-2 block'>Date *</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className='w-full h-10 justify-start text-left font-normal border-gray-200'
                                                    >
                                                        <CalendarIcon className='w-4 h-4 mr-2' />
                                                        {selectedDates[application._id] 
                                                            ? format(selectedDates[application._id], "PPP")
                                                            : "Pick a date"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={selectedDates[application._id]}
                                                        onSelect={(date) => {
                                                            setSelectedDates(prev => ({
                                                                ...prev,
                                                                [application._id]: date
                                                            }));
                                                        }}
                                                        disabled={(date) =>
                                                            isBefore(date, startOfDay(new Date())) || 
                                                            date > endOfWeek(addWeeks(new Date(), 2))
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        <div>
                                            <Label className='text-sm font-semibold text-gray-700 mb-2 block'>Time Slot *</Label>
                                            <Select
                                                onValueChange={(value) => {
                                                    setInterviewData(prev => ({
                                                        ...prev,
                                                        [application._id]: {
                                                            ...prev[application._id],
                                                            time: value
                                                        }
                                                    }));
                                                }}
                                                value={interviewData[application._id]?.time || ''}
                                            >
                                                <SelectTrigger className='h-10 border-gray-200'>
                                                    <SelectValue placeholder="Select time" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="10:00-10:15">10:00 - 10:15</SelectItem>
                                                    <SelectItem value="10:15-10:30">10:15 - 10:30</SelectItem>
                                                    <SelectItem value="10:30-10:45">10:30 - 10:45</SelectItem>
                                                    <SelectItem value="10:45-11:00">10:45 - 11:00</SelectItem>
                                                    <SelectItem value="12:00-12:15">12:00 - 12:15</SelectItem>
                                                    <SelectItem value="12:15-12:30">12:15 - 12:30</SelectItem>
                                                    <SelectItem value="12:30-12:45">12:30 - 12:45</SelectItem>
                                                    <SelectItem value="12:45-01:00">12:45 - 01:00</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <Button
                                            onClick={() => handleScheduleInterview(application._id)}
                                            disabled={scheduling[application._id] || !selectedDates[application._id] || !interviewData[application._id]?.time || !interviewData[application._id]?.phase}
                                            className='w-full bg-gradient-to-r from-[#6B4EFF] to-[#5a3dd9] hover:from-[#5a3dd9] hover:to-[#4d32c2] text-white'
                                        >
                                            {scheduling[application._id] ? (
                                                <>
                                                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                                                    Scheduling...
                                                </>
                                            ) : (
                                                <>
                                                    <Video className='w-4 h-4 mr-2' />
                                                    Schedule Interview
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default InterviewSchedule
