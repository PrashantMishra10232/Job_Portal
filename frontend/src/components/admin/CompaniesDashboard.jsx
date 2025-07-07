import React from 'react'
// import CompaniesTable from './CompaniesTable'
import HrSidebar from '../shared/HrSidebar'
import Navbar from '../shared/Navbar'
import Companies from './Companies'

function CompaniesDashboard() {
  return (
    <div>
        <div className='flex'>
                <HrSidebar />
                <div className=' w-full'>
                    <Navbar />
                    <div className='p-5'>
                        <Companies/>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default CompaniesDashboard