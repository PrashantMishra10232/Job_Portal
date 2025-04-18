// import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'
import { Link } from "react-router-dom"
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
import { AlignJustify, Bookmark, LogOut, User2 } from 'lucide-react'
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className='bg-white'>
      <div className='flex justify-between items-center mx-auto w-[90%] sm:max-w-7xl h-16'>
        <div className='block sm:hidden'>
          <DropdownMenu>
            <DropdownMenuTrigger className='cursor-pointer'><AlignJustify /></DropdownMenuTrigger>
            {user && user.role === "Recruiter" ? (
              <DropdownMenuContent>
                <DropdownMenuLabel><h1 className='text-[#6B4EFF]'>Career<span className='text-[#333333]'>Flow</span></h1></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to='/admin/companies'><DropdownMenuItem className='cursor-pointer'>Companies</DropdownMenuItem></Link>
                <Link to='/admin/jobs'><DropdownMenuItem className='cursor-pointer'>Jobs</DropdownMenuItem></Link>
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent>
                <DropdownMenuLabel><h1 className='text-[#6B4EFF]'>Career<span className='text-[#333333]'>Flow</span></h1></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to='/'><DropdownMenuItem className='cursor-pointer'>Home</DropdownMenuItem></Link>
                <Link to='/jobs'><DropdownMenuItem className='cursor-pointer'>Jobs</DropdownMenuItem></Link>
                <Link to='/browse'><DropdownMenuItem className='cursor-pointer'>Browse</DropdownMenuItem></Link>
                <Link to='/about'><DropdownMenuItem className='cursor-pointer'>About us</DropdownMenuItem></Link>
                <Link to='/atsScore'><DropdownMenuItem className='cursor-pointer'>Check-ATS</DropdownMenuItem></Link>
              </DropdownMenuContent>
            )}

          </DropdownMenu>

        </div>
        <div>
          <h1 className='text-[#6B4EFF] font-bold text-2xl text-center'>
            Career<span className='text-[#333333]'>Flow</span>
          </h1>
        </div>
        <div className='flex items-center gap-12 '>
          <ul className='hidden sm:flex font-medium items-center gap-5'>
            {
              user && user.role === 'Recruiter' ? (
                <>
                  <li className='hover:underline font-medium'><Link to="/admin/companies">Companies</Link></li>
                  <li className='hover:underline font-medium'><Link to="/admin/jobs">Jobs</Link></li>
                </>
              ) : (
                <>
                  <li className='hover:underline font-medium'><Link to='/'>Home</Link></li>
                  <li className='hover:underline font-medium'><Link to='/jobs'>Jobs</Link></li>
                  <li className='hover:underline font-medium'><Link to='/browse'>Browse</Link></li>
                  <li className='bg-[#6A38C2] hover:bg-[#5b30a6] font-md text-white rounded-full px-2'><Link to='/atsScore'>Check-ATS</Link></li>
                </>
              )
            }

          </ul>
          {!user ? (
            <div className='flex items-center gap-2 '>
              <Link to="/login"><Button variant="outline" className='cursor-pointer'>Login</Button></Link>
              <Link to='/signup'><Button className='bg-[#6A38C2] hover:bg-[#5b30a6]  cursor-pointer'>Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src={user?.profile?.profilePhoto} alt='@shadcn' />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className='w-80'>
                <div className='flex gap-4 space-y-2'>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage src={user?.profile?.profilePhoto} alt='@shadcn' />
                  </Avatar>
                  <div>
                    <h4 className='font-medium'>{user.fullName}</h4>
                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className='flex flex-col my-2 text-gray-600'>
                  {
                    user && user.role === 'Student' && (
                      <div>
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                          <User2 />
                          <Button variant='link'><Link to="/profile">View Profile</Link></Button>
                        </div>
                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                          <Bookmark />
                          <Button variant='link'><Link to="/savedJobs">Saved Jobs</Link></Button>
                        </div>
                      </div>

                    )
                  }

                  <div className='flex w-fit items-center gap-2 cursor-pointer'>
                    <LogOut />
                    <Button onClick={logoutHandler} variant='link' className='cursor-pointer'>Logout</Button>
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