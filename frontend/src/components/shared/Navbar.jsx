// import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'
import { Link, useLocation } from "react-router-dom"
import { Button } from '../ui/button'
// import axios from 'axios'
import { logout } from '@/redux/authSlice'
import { USER_API_ENDPOINT } from "@/utils/constant"
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
// import { refreshAccessToken } from '@/redux/authSlice'
import { useNavigate } from 'react-router-dom'
import { persistor } from '@/redux/store'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import {
  Avatar,
  AvatarImage,
} from "../ui/avatar"
import { AlignJustify, Bookmark, LogOut, User2, Briefcase } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axiosInstance from '@/utils/axiosInstance'


function Navbar() {
  const { user } = useSelector(store => store.auth)
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '';
    }
    return location.pathname.startsWith(path);
  };

  const logoutHandler = async () => {
    try {
      const res = await axiosInstance.post(`${USER_API_ENDPOINT}/logOut`, {}, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(logout());
        await persistor.purge(); 
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Logout Error:", error);
      console.error("Error Response:", error.response);
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
      toast.error(errorMessage);
    }
  }

  return (
    <div className='bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50 transition-all duration-300'>
      <div className='flex justify-between items-center mx-auto w-[90%] sm:max-w-7xl h-16 px-4'>
        <div className='flex items-center gap-3'>
          <div className='block sm:hidden'>
            <DropdownMenu>
              <DropdownMenuTrigger className='cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors'><AlignJustify className='w-5 h-5' /></DropdownMenuTrigger>
              {user && user.role === "Recruiter" ? (
                <DropdownMenuContent>
                  <DropdownMenuLabel><h1 className='text-[#6B4EFF]'>Career<span className='text-[#333333]'>Flow</span></h1></DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to='/admin/companies/dashboard'><DropdownMenuItem className={`cursor-pointer ${isActive('/admin/companies') ? 'bg-purple-50 text-[#6B4EFF]' : ''}`}>Companies</DropdownMenuItem></Link>
                  <Link to='/admin/jobs/dashboard'><DropdownMenuItem className={`cursor-pointer ${isActive('/admin/jobs') ? 'bg-purple-50 text-[#6B4EFF]' : ''}`}>Jobs</DropdownMenuItem></Link>
                </DropdownMenuContent>
              ) : (
                <DropdownMenuContent>
                  <DropdownMenuLabel><h1 className='text-[#6B4EFF]'>Career<span className='text-[#333333]'>Flow</span></h1></DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to='/'><DropdownMenuItem className={`cursor-pointer ${location.pathname === '/' ? 'bg-purple-50 text-[#6B4EFF]' : ''}`}>Home</DropdownMenuItem></Link>
                  <Link to='/jobs'><DropdownMenuItem className={`cursor-pointer ${isActive('/jobs') ? 'bg-purple-50 text-[#6B4EFF]' : ''}`}>Jobs</DropdownMenuItem></Link>
                  <Link to='/browse'><DropdownMenuItem className={`cursor-pointer ${isActive('/browse') ? 'bg-purple-50 text-[#6B4EFF]' : ''}`}>Browse</DropdownMenuItem></Link>
                  <Link to='/about'><DropdownMenuItem className={`cursor-pointer ${isActive('/about') ? 'bg-purple-50 text-[#6B4EFF]' : ''}`}>About us</DropdownMenuItem></Link>
                  <Link to='/atsScore'><DropdownMenuItem className={`cursor-pointer ${isActive('/atsScore') ? 'bg-purple-50 text-[#6B4EFF]' : ''}`}>Check-ATS</DropdownMenuItem></Link>
                </DropdownMenuContent>
              )}

            </DropdownMenu>
          </div>
          <Link to={user && user.role === "Recruiter" ? "/admin/dashboard" : "/"} className='flex items-center gap-2 group'>
            <div className='bg-gradient-to-br from-[#6B4EFF] to-[#5a3dd9] p-2 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105'>
              <Briefcase className='w-5 h-5 text-white' />
            </div>
            <div className='hidden sm:block'>
              <h1 className='text-[#6B4EFF] font-bold text-xl tracking-tight'>
                Career<span className='text-[#333333] font-semibold'>Flow</span>
              </h1>
            </div>
          </Link>
        </div>
        <div className='flex items-center gap-6'>
          <ul className='hidden sm:flex font-medium items-center gap-6'>
            {
              user && user.role === 'Recruiter' ? (
                <>
                  <li className='transition-colors'>
                    <Link 
                      to="/admin/companies/dashboard" 
                      className={`font-medium transition-colors duration-200 relative inline-block group pb-1 ${
                        isActive('/admin/companies') 
                          ? 'text-[#6B4EFF]' 
                          : 'text-gray-700 hover:text-[#6B4EFF]'
                      }`}
                    >
                      Companies
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-[#6B4EFF] transition-all duration-300 ${
                        isActive('/admin/companies') ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </Link>
                  </li>
                  <li className='transition-colors'>
                    <Link 
                      to="/admin/jobs/dashboard" 
                      className={`font-medium transition-colors duration-200 relative inline-block group pb-1 ${
                        isActive('/admin/jobs') 
                          ? 'text-[#6B4EFF]' 
                          : 'text-gray-700 hover:text-[#6B4EFF]'
                      }`}
                    >
                      Jobs
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-[#6B4EFF] transition-all duration-300 ${
                        isActive('/admin/jobs') ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className='transition-colors'>
                    <Link 
                      to='/' 
                      className={`font-medium transition-colors duration-200 relative inline-block group pb-1 ${
                        location.pathname === '/' || location.pathname === ''
                          ? 'text-[#6B4EFF]' 
                          : 'text-gray-700 hover:text-[#6B4EFF]'
                      }`}
                    >
                      Home
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-[#6B4EFF] transition-all duration-300 ${
                        location.pathname === '/' || location.pathname === ''
                          ? 'w-full' 
                          : 'w-0 group-hover:w-full'
                      }`}></span>
                    </Link>
                  </li>
                  <li className='transition-colors'>
                    <Link 
                      to='/jobs' 
                      className={`font-medium transition-colors duration-200 relative inline-block group pb-1 ${
                        isActive('/jobs') 
                          ? 'text-[#6B4EFF]' 
                          : 'text-gray-700 hover:text-[#6B4EFF]'
                      }`}
                    >
                      Jobs
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-[#6B4EFF] transition-all duration-300 ${
                        isActive('/jobs') ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </Link>
                  </li>
                  <li className='transition-colors'>
                    <Link 
                      to='/browse' 
                      className={`font-medium transition-colors duration-200 relative inline-block group pb-1 ${
                        isActive('/browse') 
                          ? 'text-[#6B4EFF]' 
                          : 'text-gray-700 hover:text-[#6B4EFF]'
                      }`}
                    >
                      Browse
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-[#6B4EFF] transition-all duration-300 ${
                        isActive('/browse') ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to='/atsScore' 
                      className={`font-medium rounded-full px-4 py-1.5 shadow-md hover:shadow-lg transition-all duration-200 text-sm ${
                        isActive('/atsScore')
                          ? 'bg-gradient-to-r from-[#6B4EFF] to-[#5a3dd9] text-white'
                          : 'bg-gradient-to-r from-[#6B4EFF] to-[#5a3dd9] hover:from-[#5a3dd9] hover:to-[#4d32c2] text-white'
                      }`}
                    >
                      Check-ATS
                    </Link>
                  </li>
                </>
              )
            }

          </ul>
          {!user ? (
            <div className='flex items-center gap-3'>
              <Link to="/login">
                <Button variant="outline" className='cursor-pointer border-gray-300 hover:border-[#6B4EFF] hover:text-[#6B4EFF] transition-colors'>
                  Login
                </Button>
              </Link>
              <Link to='/signup'>
                <Button className='bg-gradient-to-r from-[#6B4EFF] to-[#5a3dd9] hover:from-[#5a3dd9] hover:to-[#4d32c2] cursor-pointer shadow-md hover:shadow-lg transition-all duration-200'>
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className='cursor-pointer hover:ring-2 ring-[#6B4EFF] ring-offset-2 rounded-full transition-all duration-200'>
                  <Avatar className='cursor-pointer border-2 border-gray-200 hover:border-[#6B4EFF] transition-colors shadow-md hover:shadow-lg'>
                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullName || 'User'} />
                  </Avatar>
                </div>
              </PopoverTrigger>
              <PopoverContent className='w-80 p-0 border-0 shadow-xl'>
                <div className='bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-t-lg border-b border-gray-200'>
                  <div className='flex items-center gap-4'>
                    <Avatar className='h-16 w-16 border-3 border-white shadow-lg'>
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullName || 'User'} />
                    </Avatar>
                    <div className='flex-1 min-w-0'>
                      <h4 className='font-bold text-lg text-gray-800 truncate'>{user.fullName}</h4>
                      <p className='text-sm text-gray-600 truncate'>{user?.email}</p>
                      {user?.profile?.bio && (
                        <p className='text-xs text-gray-500 mt-1 line-clamp-2'>{user.profile.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className='p-2 bg-white rounded-b-lg'>
                  {
                    user && user.role === 'Student' && (
                      <div className='space-y-1'>
                        <Link to="/profile">
                          <div className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer group'>
                            <div className='p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors'>
                              <User2 className='w-4 h-4 text-[#6B4EFF]' />
                            </div>
                            <span className='font-medium text-gray-700 group-hover:text-[#6B4EFF] transition-colors'>View Profile</span>
                          </div>
                        </Link>
                        <Link to="/savedJobs">
                          <div className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer group'>
                            <div className='p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors'>
                              <Bookmark className='w-4 h-4 text-[#6B4EFF]' />
                            </div>
                            <span className='font-medium text-gray-700 group-hover:text-[#6B4EFF] transition-colors'>Saved Jobs</span>
                          </div>
                        </Link>
                      </div>
                    )
                  }
                  <div className='border-t border-gray-200 mt-2 pt-2'>
                    <div 
                      onClick={logoutHandler}
                      className='flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors cursor-pointer group'
                    >
                      <div className='p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors'>
                        <LogOut className='w-4 h-4 text-red-600' />
                      </div>
                      <span className='font-medium text-gray-700 group-hover:text-red-600 transition-colors'>Logout</span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar