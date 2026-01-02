import React, { useEffect, useRef, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Camera, Mail, Phone, Pen, FileText, Award, MapPin, Briefcase, User } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTabel from './AppliedJobTabel'
import UpdateProfileDialog from "./UpdateprofileDialog"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { USER_API_ENDPOINT } from '../utils/constant'
import { setUser } from '@/redux/authSlice'
import axiosInstance from '@/utils/axiosInstance'

function Profile() {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const skills = user?.profile?.skills || [];

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profilePhoto', file);

            try {
                const res = await axiosInstance.patch(`${USER_API_ENDPOINT}/profilePhoto`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                });

                if (res.data.success) {
                    dispatch(setUser(res.data.data));
                    toast.success("Profile photo updated successfully");
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                toast.error(error?.response?.data?.message || "Error uploading file");
            }
        }
    };

    const hasResume = user?.profile?.resume;

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-50 via-purple-50/30 to-white'>
            <Navbar />
            
            {/* Profile Header Card */}
            <div className='max-w-6xl mx-4 sm:mx-auto mt-8 mb-6'>
                <div className='bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 rounded-2xl shadow-2xl overflow-hidden'>
                    <div className='p-8 md:p-12'>
                        <div className='flex flex-col md:flex-row items-start md:items-center gap-6'>
                            <div className='relative group'>
                                <Avatar className='h-32 w-32 md:h-40 md:w-40 border-4 border-white shadow-2xl'>
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullName || "Profile"} />
                                </Avatar>
                                <button 
                                    onClick={handleClick}
                                    className='absolute bottom-0 right-0 md:bottom-2 md:right-2 bg-[#6B4EFF] hover:bg-[#5a3dd9] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border-2 border-white'
                                >
                                    <Camera className='w-5 h-5' />
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                            <div className='flex-1 text-white'>
                                <div className='flex items-start justify-between gap-4 mb-4'>
                                    <div>
                                        <h1 className='text-3xl md:text-4xl font-bold mb-2'>{user?.fullName || "Loading..."}</h1>
                                        <p className='text-purple-100 text-lg mb-3'>{user?.profile?.bio || "No bio available. Click edit to add one."}</p>
                                        <div className='flex items-center gap-2 text-purple-100'>
                                            <User className='w-4 h-4' />
                                            <span className='text-sm'>{user?.role || "User"}</span>
                                        </div>
                                    </div>
                                    <Button 
                                        onClick={() => setOpen(true)} 
                                        className='bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm'
                                    >
                                        <Pen className='w-4 h-4 mr-2' />
                                        Edit Profile
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='max-w-6xl mx-4 sm:mx-auto grid md:grid-cols-3 gap-6 mb-8'>
                {/* Left Column - Contact & Info */}
                <div className='md:col-span-1 space-y-6'>
                    {/* Contact Information */}
                    <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
                        <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
                            <Mail className='w-5 h-5 text-[#6B4EFF]' />
                            Contact Information
                        </h2>
                        <div className='space-y-4'>
                            <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                                <div className='p-2 bg-purple-100 rounded-lg'>
                                    <Mail className='w-5 h-5 text-[#6B4EFF]' />
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <p className='text-xs text-gray-500 mb-1'>Email</p>
                                    <p className='text-sm font-medium text-gray-800 truncate'>{user?.email || "No email available"}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                                <div className='p-2 bg-purple-100 rounded-lg'>
                                    <Phone className='w-5 h-5 text-[#6B4EFF]' />
                                </div>
                                <div className='flex-1 min-w-0'>
                                    <p className='text-xs text-gray-500 mb-1'>Phone</p>
                                    <p className='text-sm font-medium text-gray-800'>{user?.phoneNumber || "No phone number available"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resume Section */}
                    {hasResume && (
                        <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
                            <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
                                <FileText className='w-5 h-5 text-[#6B4EFF]' />
                                Resume
                            </h2>
                            <a 
                                href={user?.profile?.resume} 
                                target='_blank'
                                rel='noopener noreferrer' 
                                className='flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg hover:from-purple-100 hover:to-indigo-100 transition-all cursor-pointer border border-purple-200 group'
                            >
                                <div className='p-2 bg-[#6B4EFF] rounded-lg group-hover:bg-[#5a3dd9] transition-colors'>
                                    <FileText className='w-5 h-5 text-white' />
                                </div>
                                <div className='flex-1'>
                                    <p className='font-semibold text-gray-800 group-hover:text-[#6B4EFF] transition-colors'>View Resume</p>
                                    <p className='text-xs text-gray-500'>Click to open in new tab</p>
                                </div>
                            </a>
                        </div>
                    )}
                </div>

                {/* Right Column - Skills & Applied Jobs */}
                <div className='md:col-span-2 space-y-6'>
                    {/* Skills Section */}
                    <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
                        <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
                            <Award className='w-5 h-5 text-[#6B4EFF]' />
                            Skills
                        </h2>
                        {skills.length > 0 ? (
                            <div className='flex flex-wrap gap-2'>
                                {skills.map((skill, index) => (
                                    <Badge 
                                        key={index} 
                                        className='px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-[#6B4EFF] border border-purple-200 hover:from-purple-200 hover:to-indigo-200 transition-colors font-medium'
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <div className='text-center py-8 text-gray-400'>
                                <Award className='w-12 h-12 mx-auto mb-2 opacity-50' />
                                <p>No skills added yet</p>
                                <Button 
                                    onClick={() => setOpen(true)}
                                    variant="outline" 
                                    className='mt-4'
                                >
                                    <Pen className='w-4 h-4 mr-2' />
                                    Add Skills
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Applied Jobs Section */}
                    <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden'>
                        <div className='bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-200'>
                            <h2 className='text-xl font-bold text-gray-800 flex items-center gap-2'>
                                <Briefcase className='w-5 h-5 text-[#6B4EFF]' />
                                Applied Jobs
                            </h2>
                        </div>
                        <div className='p-6'>
                            <AppliedJobTabel />
                        </div>
                    </div>
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile;