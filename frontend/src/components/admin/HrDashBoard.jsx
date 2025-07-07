import React from 'react'
import Navbar from '../shared/Navbar'
import { CirclePlus} from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import JobsTable from './JobsTable'
import HrSidebar from '../shared/HrSidebar'
import Meetings from './meetings'
import CompaniesTable from './CompaniesTable'

function HrDashBoard() {

    const [activeTabs, setActiveTabs] = React.useState('jobs');

    return (
        <div>
            <div className='flex'>
                <HrSidebar />
                <div className=' w-full'>
                    <Navbar />
                    <div className='flex flex-row p-3'>
                        <div className='heroSection m-6 w-[80%] min-h-screen'>
                            <div className='flex justify-between w-full'>
                                <h1 className='text-[#071C50] text-xl font-bold'>Overview</h1>
                                <Button className='bg-[#4B93E7] font-bold'><CirclePlus /> Add Job</Button>
                            </div>
                            <div className='my-4 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6'>

                                <Link to='/admin/meetings'>
                                    <div className='group relative bg-white hover:bg-blue-100 shadow-md w-full h-[140px] border rounded-[5px]'>
                                        <div className='absolute border border-purple-950 bg-white group-hover:bg-blue-400 -top-4 -left-4 z-10 text-[#071C50] group-hover:text-white font-bold text-xl w-16 h-16 group-hover:h-18 group-hover:w-18 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-200'>44</div>
                                        <div className="flex justify-between items-center h-full p-3">
                                            <div className="text-gray-500 font-semibold text-sm mt-6 group-hover:text-gray-700 group-hover:mt-10 group-hover:font-bold">Interview<br />Scheduled</div>
                                            <img
                                                src="https://res.cloudinary.com/dlqas2glz/image/upload/v1746460625/interview-removebg-preview_mcosbg.png"
                                                alt="Interview"
                                                className="w-[120px] h-[100px] object-contain"
                                            />
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/admin/meetings">
                                    <div className='group relative bg-white hover:bg-blue-100 shadow-md w-full h-[140px] border rounded-[5px]'>
                                        <div className='absolute border border-purple-950 bg-white group-hover:bg-blue-400 -top-4 -left-4 z-10 text-[#071C50] group-hover:text-white font-bold text-xl w-16 h-16 group-hover:h-18 group-hover:w-18 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-200'>44</div>
                                        <div className="flex justify-between items-center h-full p-3">
                                            <div className="text-gray-500 font-semibold text-sm mt-6 group-hover:text-gray-700 group-hover:mt-10 group-hover:font-bold">
                                                Interview Feedback<br />Pending
                                            </div>
                                            <img
                                                src="https://res.cloudinary.com/dlqas2glz/image/upload/v1746460987/feedback-removebg-preview_l3esev.png"
                                                alt="Interview"
                                                className="w-[120px] h-[100px] object-contain"
                                            />
                                        </div>
                                    </div>
                                </Link>


                                <Link to="/admin/meetings">
                                    <div className='group relative bg-white hover:bg-blue-100 shadow-md w-full h-[140px] border rounded-[5px]'>
                                        <div className='absolute border border-purple-950 bg-white group-hover:bg-blue-400 -top-4 -left-4 z-10 text-[#071C50] group-hover:text-white font-bold text-xl w-16 h-16 group-hover:h-18 group-hover:w-18 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-200'>44</div>
                                        <div className="flex justify-between items-center h-full p-3">
                                            <div className="text-gray-500 font-semibold text-sm mt-6 group-hover:text-gray-700 group-hover:mt-10 group-hover:font-bold">
                                                Approval<br />Pending
                                            </div>
                                            <img
                                                src="https://res.cloudinary.com/dlqas2glz/image/upload/v1746462336/approval-process_k5cvxb.png"
                                                alt="Interview"
                                                className="w-[120px] h-[100px] object-contain"
                                            />
                                        </div>
                                    </div>
                                </Link>


                                <Link to="/admin/meetings">
                                    <div className='group relative bg-white hover:bg-blue-100 shadow-md w-full h-[140px] border rounded-[5px]'>
                                        <div className='absolute border border-purple-950 bg-white group-hover:bg-blue-400 -top-4 -left-4 z-10 text-[#071C50] group-hover:text-white font-bold text-xl w-16 h-16 group-hover:h-18 group-hover:w-18 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-200'>44</div>
                                        <div className="flex justify-between items-center h-full p-3">
                                            <div className="text-gray-500 font-semibold text-sm mt-6 group-hover:text-gray-700 group-hover:mt-10 group-hover:font-bold">
                                                Offer Accceptance<br />Pending
                                            </div>
                                            <img
                                                src="https://res.cloudinary.com/dlqas2glz/image/upload/v1746462613/offer_acceptance-removebg-preview_yybrob.png"
                                                alt="Interview"
                                                className="w-[120px] h-[100px] object-contain"
                                            />
                                        </div>
                                    </div>
                                </Link>


                                <Link to="/admin/meetings">
                                    <div className='group relative bg-white hover:bg-blue-100 shadow-md w-full h-[140px] border rounded-[5px]'>
                                        <div className='absolute border border-purple-950 bg-white group-hover:bg-blue-400 -top-4 -left-4 z-10 text-[#071C50] group-hover:text-white font-bold text-xl w-16 h-16 group-hover:h-18 group-hover:w-18 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-200'>44</div>
                                        <div className="flex justify-between items-center h-full p-3">
                                            <div className="text-gray-500 font-semibold text-sm mt-6 group-hover:text-gray-700 group-hover:mt-10 group-hover:font-bold">
                                                Documentaion<br />Pending
                                            </div>
                                            <img
                                                src="https://res.cloudinary.com/dlqas2glz/image/upload/v1746462866/documentation-vector-illustration-flat-2_764382-54868-removebg-preview_drtxaf.png"
                                                alt="Interview"
                                                className="w-[120px] h-[100px] object-contain"
                                            />
                                        </div>
                                    </div>
                                </Link>


                                <Link to="/admin/meetings">
                                    <div className='group relative bg-white hover:bg-blue-100 shadow-md w-full h-[140px] border rounded-[5px]'>
                                        <div className='absolute border border-purple-950 bg-white group-hover:bg-blue-400 -top-4 -left-4 z-10 text-[#071C50] group-hover:text-white font-bold text-xl w-16 h-16 group-hover:h-18 group-hover:w-18 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-200'>44</div>
                                        <div className="flex justify-between items-center h-full p-3">
                                            <div className="text-gray-500 font-semibold text-sm mt-6 group-hover:text-gray-700 group-hover:mt-10 group-hover:font-bold">
                                                Training<br />Pending
                                            </div>
                                            <img
                                                src="https://res.cloudinary.com/dlqas2glz/image/upload/v1746463220/training-removebg-preview_nlqbiw.png"
                                                alt="Interview"
                                                className="w-[120px] h-[100px] object-contain"
                                            />
                                        </div>
                                    </div>

                                </Link>

                                <Link to="/admin/meetings">
                                    <div className='group relative bg-white hover:bg-blue-100 shadow-md w-full h-[140px] border rounded-[5px]'>
                                        <div className='absolute border border-purple-950 bg-white group-hover:bg-blue-400 -top-4 -left-4 z-10 text-[#071C50] group-hover:text-white font-bold text-xl w-16 h-16 group-hover:h-18 group-hover:w-18 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-200'>44</div>
                                        <div className="flex justify-between items-center h-full p-3">
                                            <div className="text-gray-500 font-semibold text-sm mt-6 group-hover:text-gray-700 group-hover:mt-10 group-hover:font-bold">
                                                Supervisor Allocation<br />Pending
                                            </div>
                                            <img
                                                src="https://res.cloudinary.com/dlqas2glz/image/upload/v1746463233/supervisor-removebg-preview_ket6l8.png"
                                                alt="Interview"
                                                className="w-[120px] h-[100px] object-contain"
                                            />
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/admin/meetings">
                                    <div className='group relative bg-white hover:bg-blue-100 shadow-md w-full h-[140px] border rounded-[5px]'>
                                        <div className='absolute border border-purple-950 bg-white group-hover:bg-blue-400 -top-4 -left-4 z-10 text-[#071C50] group-hover:text-white font-bold text-xl w-16 h-16 group-hover:h-18 group-hover:w-18 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-200'>44</div>
                                        <div className="flex justify-between items-center h-full p-3">
                                            <div className="text-gray-500 font-semibold text-sm mt-6 group-hover:text-gray-700 group-hover:mt-10 group-hover:font-bold">
                                                Project Allocation<br />Pending
                                            </div>
                                            <img
                                                src="https://res.cloudinary.com/dlqas2glz/image/upload/v1746463689/project-removebg-preview_luq3nl.png"
                                                alt="Interview"
                                                className="w-[120px] h-[100px] object-contain"
                                            />
                                        </div>
                                    </div>
                                </Link>

                            </div>


                            <div>
                                <h1 className='text-[#071C50] text-xl font-bold'>Require Attention</h1>
                                <div>
                                    <div className='mt-4 flex gap-7'>
                                        <h1
                                            onClick={() => setActiveTabs("jobs")}
                                            className={`cursor-pointer font-semibold border-b-4 ${activeTabs === "jobs" ? "text-[#071C50] border-amber-500" : "text-gray-500 border-transparent"}`}>Jobs</h1>
                                        <h1 onClick={() => setActiveTabs("companies")}
                                            className={`cursor-pointer font-semibold border-b-4 ${activeTabs === "companies" ? "text-[#071C50] border-amber-500" : "text-gray-500 border-transparent"}`}>Companies</h1>
                                        <h1 onClick={() => setActiveTabs("Onboardings")}
                                            className={`cursor-pointer font-semibold border-b-4 ${activeTabs === "Onboardings" ? "text-[#071C50] border-amber-500" : "text-gray-500 border-transparent"}`}>Onboardings</h1>
                                    </div>
                                    <div className='tabels my-2 overflow-y-auto'>
                                        {activeTabs === "jobs" && <JobsTable />}
                                        {activeTabs === "companies" && <CompaniesTable />}
                                        {activeTabs === "Onboardings" && <JobsTable />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='interviewSection w-[20%] h-221 p-2 shadow-xl shadow-slate-400'>
                            <Meetings />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HrDashBoard