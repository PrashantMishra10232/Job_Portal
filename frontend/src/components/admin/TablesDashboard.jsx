import React from 'react'
import AdminJobs from './AdminJobs'
import HrSidebar from '../shared/HrSidebar'
import Navbar from '../shared/Navbar'

function TablesDashboard() {
  return (
    <div>
        <div className='flex'>
                <HrSidebar />
                <div className=' w-full'>
                    <Navbar />
                    <div className='p-5'>
                        <AdminJobs/>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default TablesDashboard