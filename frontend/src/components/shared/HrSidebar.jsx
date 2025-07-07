import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Briefcase, Building2, Home, User, CalendarDays } from 'lucide-react'


function HrSidebar() {
    return (
        <div className='sidebar bg-[#082777] p-2 min-h-screen'>
            <div className='logo mb-8 flex flex-col items-center'>
                <div className='flex items-center justify-center text-gray-400 hover:text-white hover:opacity-100 hover:drop-shadow-[0_0_5px_white] transition-all duration-300'>
                    <User />
                </div>
                <h1 className='text-1xl text-white font-medium'>Dashboard</h1>
            </div>
            <div className='menu flex flex-col gap-6 p-2'>

                <NavLink to='/admin/dashboard' className={({ isActive }) =>
                    isActive ? 'text-white drop-shadow-[0_0_5px_white] transition-all opacity-100' : 'text-gray-400 hover: hover:opacity-100 hover:drop-shadow-[0_0_5px_white] transition-all duration-300'}>
                    <div className='logo flex flex-col items-center'>
                        <div className='mb-1 flex items-center justify-center '>
                            <Home />
                        </div>
                        <h1 className='text-white font-medium'>Home</h1>
                    </div>
                </NavLink>

                <NavLink to='/admin/jobs/dashboard' className={({ isActive }) =>
                    isActive ? 'text-white drop-shadow-[0_0_5px_white] transition-all opacity-100' : 'text-gray-400 hover: hover:opacity-100 hover:drop-shadow-[0_0_5px_white] transition-all duration-300'}>
                    <div className='logo flex flex-col items-center'>
                        <div className='mb-1 flex items-center justify-center'>
                            <Briefcase />
                        </div>
                        <h1 className='text-white font-medium'>Jobs</h1>
                    </div>
                </NavLink>

                <NavLink to='/admin/companies/dashboard' className={({ isActive }) =>
                    isActive ? 'text-white drop-shadow-[0_0_5px_white] transition-all opacity-100' : 'text-gray-400 hover: hover:opacity-100 hover:drop-shadow-[0_0_5px_white] transition-all duration-300'}>
                    <div className='logo flex flex-col items-center'>
                        <div className='mb-1 flex items-center justify-center'>
                            <Building2 />
                        </div>
                        <h1 className='text-white font-medium'>Companies</h1>
                    </div>
                </NavLink>

                <NavLink to='/admin/calendar/dashboard' className={({ isActive }) =>
                    isActive ? 'text-white drop-shadow-[0_0_5px_white] transition-all opacity-100' : 'text-gray-400 hover: hover:opacity-100 hover:drop-shadow-[0_0_5px_white] transition-all duration-300'}>
                    <div className='logo flex flex-col items-center'>
                        <div className='mb-1 flex items-center justify-center '>
                            <CalendarDays />
                        </div>
                        <h1 className='text-white font-medium'>Calandar</h1>
                    </div>
                </NavLink>

            </div>
        </div>
    )
}

export default HrSidebar