import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTabel from './AppliedJobTabel'
import UpdateProfileDialog from "./UpdateprofileDialog"
import { useSelector } from 'react-redux'

const isResume = true;
function Profile() {
    const {user} = useSelector(store => store.auth);
    
    const [open, setOpen] = useState(false);
    const skills = user?.profile?.skills || [];
    
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-8'>
                        <Avatar className='h-24 w-24'>
                            <AvatarImage src={user?.profile?.profilePhoto} alt="No Image" />
                        </Avatar>
                        <div>
                            <h1 className='font-lg font-bold text-2xl'>{user?.fullName || "Loading..."}</h1>
                            <p className='text-1xl'>{user?.profile?.bio || "No bio available"}</p>
                        </div>

                    </div>
                    <Button onClick={()=>setOpen(true)} className='text-right' variant='outline'><Pen /></Button>
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
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTabel />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile