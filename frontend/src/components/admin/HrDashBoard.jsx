import React from 'react'
import Navbar from '../shared/Navbar'
import { CirclePlus} from 'lucide-react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import JobsTable from './JobsTable'
import HrSidebar from '../shared/HrSidebar'
import Meetings from './Meetings'
import CompaniesTable from './CompaniesTable'
import { INTERVIEW_API_ENDPOINT } from '@/utils/constant'
import axiosInstance from '@/utils/axiosInstance'

function HrDashBoard() {

    const [activeTabs, setActiveTabs] = React.useState('jobs');
    const [interviewCount, setInterviewCount] = React.useState(0);

    React.useEffect(() => {
        const fetchInterviewCount = async () => {
            try {
                const res = await axiosInstance.get(`${INTERVIEW_API_ENDPOINT}/interview/get`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    setInterviewCount(res.data.data?.length || 0);
                }
            } catch (error) {
                console.error("Failed to fetch interview count:", error);
                setInterviewCount(0);
            }
        };
        fetchInterviewCount();
    }, []);

    return (
        <div className='h-screen overflow-hidden'>
            <div className='flex h-full'>
                <HrSidebar />
                <div className='w-full flex flex-col overflow-hidden'>
                    <Navbar />
                    <div className='flex flex-row flex-1 overflow-y-auto p-3'>
                        <div className='heroSection m-6 w-[80%] pb-6'>
                            <div className='flex justify-between w-full'>
                                <h1 className='text-[#071C50] text-xl font-bold'>Overview</h1>
                                <Button className='bg-[#4B93E7] font-bold'><CirclePlus /> Add Job</Button>
                            </div>
                            <div className='my-4 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6'>

                                <Link to='/admin/interview/schedule'>
                                    <div className='group relative bg-white hover:bg-blue-100 shadow-md w-full h-[140px] border rounded-[5px]'>
                                        <div className='absolute border border-purple-950 bg-white group-hover:bg-blue-400 -top-4 -left-4 z-10 text-[#071C50] group-hover:text-white font-bold text-xl w-16 h-16 group-hover:h-18 group-hover:w-18 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-200'>{interviewCount}</div>
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
                                        <button
                                            onClick={() => setActiveTabs("jobs")}
                                            onKeyDown={(e) => e.key === 'Enter' && setActiveTabs("jobs")}
                                            className={`cursor-pointer font-semibold border-b-4 pb-2 ${activeTabs === "jobs" ? "text-[#071C50] border-amber-500" : "text-gray-500 border-transparent"}`}>Jobs</button>
                                        <button 
                                            onClick={() => setActiveTabs("companies")}
                                            onKeyDown={(e) => e.key === 'Enter' && setActiveTabs("companies")}
                                            className={`cursor-pointer font-semibold border-b-4 pb-2 ${activeTabs === "companies" ? "text-[#071C50] border-amber-500" : "text-gray-500 border-transparent"}`}>Companies</button>
                                        <button 
                                            onClick={() => setActiveTabs("Onboardings")}
                                            onKeyDown={(e) => e.key === 'Enter' && setActiveTabs("Onboardings")}
                                            className={`cursor-pointer font-semibold border-b-4 pb-2 ${activeTabs === "Onboardings" ? "text-[#071C50] border-amber-500" : "text-gray-500 border-transparent"}`}>Onboardings</button>
                                    </div>
                                    <div className='tabels my-2 overflow-y-auto'>
                                        {activeTabs === "jobs" && <JobsTable />}
                                        {activeTabs === "companies" && <CompaniesTable />}
                                        {activeTabs === "Onboardings" && <JobsTable />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='interviewSection w-[20%] p-2 shadow-xl shadow-slate-400 overflow-y-auto'>
                            <Meetings />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HrDashBoard