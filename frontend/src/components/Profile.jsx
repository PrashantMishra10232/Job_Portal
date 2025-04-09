import React, { useEffect, useRef, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Camera, Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTabel from './AppliedJobTabel'
import UpdateProfileDialog from "./UpdateprofileDialog"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_ENDPOINT } from '../utils/constant'
import { setUser } from '@/redux/authSlice'

const isResume = true;
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
            console.log("New file selected:", file);

            const formData = new FormData();
            formData.append('profilePhoto', file);

            try {
                const res = await axios.patch(`${USER_API_ENDPOINT}/profilePhoto`, formData, {
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



    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-4 sm:mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-2xl'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-8'>
                        <div className='relative'>
                            <Avatar className='h-24 w-24'>
                                <AvatarImage src={user?.profile?.profilePhoto} alt="No Image" />
                            </Avatar>
                            {/* Hidden File Input */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            <button onClick={handleClick} className='absolute top-17 bg-border  p-1  rounded-full hover:bg-gray-100 cursor-pointer'><Camera/></button>
                        </div>
                        <div>
                            <h1 className='font-lg font-bold text-2xl'>{user?.fullName || "Loading..."}</h1>
                            <p className='text-1xl'>{user?.profile?.bio || "No bio available"}</p>
                        </div>

                    </div>
                    <Button onClick={() => setOpen(true)} className='text-right' variant='outline'><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email || "No email available"}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Contact />
                        <span>{user?.phoneNumber || "No phone number available"}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            skills.length !== 0 ? skills.map((items, index) => <Badge key={index} className='flex'>{items}</Badge>) : <span>NA</span>
                        }
                    </div>

                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5 '>
                    <Label className='teext-md font-bold'>Resume</Label>
                    {
                        isResume ? <a href={user?.profile?.resume} target='_blank'
                            rel='noopener noreferrer' className='text-blue-500 hover:underline cursor-pointer'>View Resume</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5 ml-3'>Applied Jobs</h1>
                <AppliedJobTabel />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile;