import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setLoading } from '@/redux/authSlice'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
// import axios from 'axios'
import axiosInstance from '@/utils/axiosInstance'

function UpdateprofileDialog({ open, setOpen }) {

    const { loading, user } = useSelector(store => store.auth);

    // State for form inputs
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        bio: "",
        skills: [],
        resume: null
    });

    // Sync state when `user` changes
    useEffect(() => {
        if (user) {
            setInput({
                fullName: user.fullName || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                bio: user.profile?.bio || "",
                skills: user.profile?.skills || [],
                resume: null
            });
        }
    }, [user]);
    
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const resume = e.target.files?.[0];
        if (resume && resume.type !== "application/pdf") {
            toast.error("Only PDF files are allowed.");
            return;
        }
        setInput({ ...input, resume })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("bio", input.bio)
        formData.append("skills", input.skills)
        if (input.resume) {
            formData.append("resume", input.resume)
        }

        
        
        try {
            dispatch(setLoading(true))
            const res = await axiosInstance.patch(`${USER_API_ENDPOINT}/update_Account`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                });
            if (res.data.success) {
                localStorage.setItem("loggedInUser", JSON.stringify(res.data.data));
                dispatch(setUser(res.data.data));
                
                toast.success(res.data.message)
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || error.message || "Something went wrong!";

            toast.error(errorMessage);

        }
        finally {
            dispatch(setLoading(false))
            setOpen(false);
        }
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>
                            Update Profile
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='name' className='text-right'>Name</Label>
                                <Input
                                    id='fullName'
                                    name='fullName'
                                    type='text'
                                    onChange={changeEventHandler}
                                    defaultValue={input.fullName}
                                    className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='email' className='text-right'>Email</Label>
                                <Input
                                    id='email'
                                    name='email'
                                    type='email'
                                    onChange={changeEventHandler}
                                    defaultValue={input.email}
                                    className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='password' className='text-right'>Password</Label>
                                <Input
                                    id='password'
                                    name='password'
                                    type='password'
                                    onChange={changeEventHandler}
                                    defaultValue={input.password}
                                    className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='number' className='text-right'>Number</Label>
                                <Input
                                    id='number'
                                    name='phoneNumber'
                                    onChange={changeEventHandler}
                                    defaultValue={input.phoneNumber}
                                    className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='bio' className='text-right'>Bio</Label>
                                <Input
                                    id='bio'
                                    name='bio'
                                    onChange={changeEventHandler}
                                    defaultValue={input.bio}
                                    className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='skills' className='text-right'>Skills</Label>
                                <Input
                                    id='skills'
                                    name='skills'
                                    onChange={changeEventHandler}
                                    defaultValue={input.skills}
                                    className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor='file' className='text-right'>Resume</Label>
                                <Input
                                    id='resume'
                                    name='resume'
                                    type='file'
                                    onChange={fileChangeHandler}
                                    accept="application/pdf"
                                    className='col-span-3' />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className='w-full my-4'> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> : <Button
                                    type='submit'
                                    className='w-full my-4'
                                >Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateprofileDialog