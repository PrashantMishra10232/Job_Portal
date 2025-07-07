import React from 'react'
import Navbar from '../shared/Navbar'
import HrSidebar from '../shared/HrSidebar'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { dateFnsLocalizer } from 'react-big-calendar';
import enUS from 'date-fns/locale/en-US';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

function CalendarPage() {

    const [events, setEvents] = useState([
        {
            title: 'Frontend Interview',
            start: new Date(2025, 4, 28, 10, 30),
            end: new Date(2025, 4, 28, 11, 30),
        },
    ]);

    return (
        <div>
            <div className='flex'>
                <HrSidebar />
                <div className=' w-full'>
                    <Navbar />
                    <div className='p-5'>
                        <h1 className="text-2xl font-bold mb-4">Interview Calendar</h1>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 600 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CalendarPage