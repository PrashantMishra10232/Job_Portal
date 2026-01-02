import { Plus, Calendar, Clock, User, Briefcase, Video } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

function Meetings() {
    const navigate = useNavigate();

    // Mock data - replace with actual API call
    const meetings = [
        { id: 1, date: '2024-01-15', time: '10:00-10:15', username: 'John Doe', position: 'Frontend Developer', phase: 4, isToday: true },
        { id: 2, date: '2024-01-15', time: '12:00-12:15', username: 'Jane Smith', position: 'Backend Developer', phase: 3, isToday: true },
        { id: 3, date: '2024-01-15', time: '14:00-14:15', username: 'Mike Johnson', position: 'Full Stack Developer', phase: 2, isToday: true },
        { id: 4, date: '2024-01-16', time: '10:00-10:15', username: 'Sarah Williams', position: 'UI/UX Designer', phase: 1, isTomorrow: true },
        { id: 5, date: '2024-01-16', time: '12:00-12:15', username: 'David Brown', position: 'DevOps Engineer', phase: 4, isTomorrow: true },
        { id: 6, date: '2024-01-17', time: '10:00-10:15', username: 'Emily Davis', position: 'Product Manager', phase: 2, isThisWeek: true },
        { id: 7, date: '2024-01-18', time: '12:00-12:15', username: 'Chris Wilson', position: 'Data Scientist', phase: 3, isThisWeek: true },
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

    const getPhaseColor = (phase) => {
        switch(phase) {
            case 1: return 'bg-blue-50 border-blue-200 text-blue-700';
            case 2: return 'bg-purple-50 border-purple-200 text-purple-700';
            case 3: return 'bg-orange-50 border-orange-200 text-orange-700';
            case 4: return 'bg-green-50 border-green-200 text-green-700';
            default: return 'bg-gray-50 border-gray-200 text-gray-700';
        }
    };

    const getPhaseLabel = (phase) => {
        const labels = {
            1: '1st Phase',
            2: '2nd Phase',
            3: '3rd Phase',
            4: 'Final Phase'
        };
        return labels[phase] || `${phase}th Phase`;
    };

    const groupedMeetings = {
        today: meetings.filter(m => m.isToday),
        tomorrow: meetings.filter(m => m.isTomorrow),
        thisWeek: meetings.filter(m => m.isThisWeek)
    };

    return (
        <div className='h-full flex flex-col'>
            {/* Header */}
            <div className='flex items-center justify-between mb-4 px-2'>
                <div className='flex items-center gap-2'>
                    <Calendar className='w-5 h-5 text-[#6B4EFF]' />
                    <h1 className='font-bold text-lg text-gray-800'>Upcoming Meetings</h1>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/admin/interviewSetup')}
                    className='h-8 w-8 rounded-full border border-[#6B4EFF] text-[#6B4EFF] hover:bg-[#6B4EFF] hover:text-white transition-all'
                >
                    <Plus className='w-4 h-4' />
                </Button>
            </div>

            {/* Meetings List */}
            <div className='flex-1 overflow-y-auto pr-2 space-y-6'>
                {/* Today's Meetings */}
                {groupedMeetings.today.length > 0 && (
                    <div>
                        <div className='flex items-center gap-2 mb-3 px-2'>
                            <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                            <h2 className='font-semibold text-sm text-gray-700 uppercase tracking-wide'>Today</h2>
                        </div>
                        <div className='space-y-2'>
                            {groupedMeetings.today.map((meeting) => (
                                <div
                                    key={meeting.id}
                                    className='group bg-white border border-gray-200 rounded-lg p-3 hover:border-[#6B4EFF] hover:shadow-md transition-all duration-200 cursor-pointer'
                                >
                                    <div className='flex items-start gap-3'>
                                        <div className='flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#6B4EFF] to-[#5a3dd9] rounded-lg flex items-center justify-center text-white font-bold text-xs'>
                                            {formatDate(meeting.date).split(' ')[0]}
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <div className='flex items-center gap-2 mb-1'>
                                                <User className='w-3 h-3 text-gray-500' />
                                                <span className='font-semibold text-sm text-gray-800 truncate'>{meeting.username}</span>
                                            </div>
                                            <div className='flex items-center gap-2 mb-2'>
                                                <Briefcase className='w-3 h-3 text-gray-500' />
                                                <span className='text-xs text-gray-600 truncate'>{meeting.position}</span>
                                            </div>
                                            <div className='flex items-center gap-2 flex-wrap'>
                                                <Badge className={`text-xs ${getPhaseColor(meeting.phase)}`}>
                                                    {getPhaseLabel(meeting.phase)}
                                                </Badge>
                                                <div className='flex items-center gap-1 text-xs text-gray-500'>
                                                    <Clock className='w-3 h-3' />
                                                    <span>{meeting.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tomorrow's Meetings */}
                {groupedMeetings.tomorrow.length > 0 && (
                    <div>
                        <div className='flex items-center gap-2 mb-3 px-2'>
                            <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                            <h2 className='font-semibold text-sm text-gray-700 uppercase tracking-wide'>Tomorrow</h2>
                        </div>
                        <div className='space-y-2'>
                            {groupedMeetings.tomorrow.map((meeting) => (
                                <div
                                    key={meeting.id}
                                    className='group bg-white border border-gray-200 rounded-lg p-3 hover:border-[#6B4EFF] hover:shadow-md transition-all duration-200 cursor-pointer'
                                >
                                    <div className='flex items-start gap-3'>
                                        <div className='flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xs'>
                                            {formatDate(meeting.date).split(' ')[0]}
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <div className='flex items-center gap-2 mb-1'>
                                                <User className='w-3 h-3 text-gray-500' />
                                                <span className='font-semibold text-sm text-gray-800 truncate'>{meeting.username}</span>
                                            </div>
                                            <div className='flex items-center gap-2 mb-2'>
                                                <Briefcase className='w-3 h-3 text-gray-500' />
                                                <span className='text-xs text-gray-600 truncate'>{meeting.position}</span>
                                            </div>
                                            <div className='flex items-center gap-2 flex-wrap'>
                                                <Badge className={`text-xs ${getPhaseColor(meeting.phase)}`}>
                                                    {getPhaseLabel(meeting.phase)}
                                                </Badge>
                                                <div className='flex items-center gap-1 text-xs text-gray-500'>
                                                    <Clock className='w-3 h-3' />
                                                    <span>{meeting.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* This Week's Meetings */}
                {groupedMeetings.thisWeek.length > 0 && (
                    <div>
                        <div className='flex items-center gap-2 mb-3 px-2'>
                            <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                            <h2 className='font-semibold text-sm text-gray-700 uppercase tracking-wide'>This Week</h2>
                        </div>
                        <div className='space-y-2'>
                            {groupedMeetings.thisWeek.map((meeting) => (
                                <div
                                    key={meeting.id}
                                    className='group bg-white border border-gray-200 rounded-lg p-3 hover:border-[#6B4EFF] hover:shadow-md transition-all duration-200 cursor-pointer'
                                >
                                    <div className='flex items-start gap-3'>
                                        <div className='flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs'>
                                            {formatDate(meeting.date).split(' ')[0]}
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <div className='flex items-center gap-2 mb-1'>
                                                <User className='w-3 h-3 text-gray-500' />
                                                <span className='font-semibold text-sm text-gray-800 truncate'>{meeting.username}</span>
                                            </div>
                                            <div className='flex items-center gap-2 mb-2'>
                                                <Briefcase className='w-3 h-3 text-gray-500' />
                                                <span className='text-xs text-gray-600 truncate'>{meeting.position}</span>
                                            </div>
                                            <div className='flex items-center gap-2 flex-wrap'>
                                                <Badge className={`text-xs ${getPhaseColor(meeting.phase)}`}>
                                                    {getPhaseLabel(meeting.phase)}
                                                </Badge>
                                                <div className='flex items-center gap-1 text-xs text-gray-500'>
                                                    <Clock className='w-3 h-3' />
                                                    <span>{meeting.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {groupedMeetings.today.length === 0 && groupedMeetings.tomorrow.length === 0 && groupedMeetings.thisWeek.length === 0 && (
                    <div className='text-center py-8 px-4'>
                        <Video className='w-12 h-12 text-gray-300 mx-auto mb-3' />
                        <p className='text-sm text-gray-500 mb-2'>No upcoming meetings</p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate('/admin/interviewSetup')}
                            className='text-xs border-[#6B4EFF] text-[#6B4EFF] hover:bg-[#6B4EFF] hover:text-white'
                        >
                            Schedule Interview
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Meetings
