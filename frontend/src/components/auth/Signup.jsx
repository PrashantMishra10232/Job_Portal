import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_ENDPOINT } from "@/utils/constant"
import axios from 'axios'
import { toast } from 'sonner'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'




function Signup() {
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        profilePhoto: ""
    })
    const { loading, user } = useSelector(store => store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, profilePhoto: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if (input.profilePhoto) {
            formData.append("profilePhoto", input.profilePhoto)
        }
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            }
        } catch (error) {
            console.log("Axios Error:", error); // Debugging
            console.log("Error Response Data:", error.response?.data);
            // If error has a response, use its message
            const errorMessage = error.response?.data?.message || "Something went wrong! Please try again.";

            toast.error(errorMessage);

        } finally {
            dispatch(setLoading(false))
        }
    }

    // useEffect(() => {
    //     if (user) {
    //         navigate("/");
    //     }
    // }, [])

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Signup</h1>
                    <div className='my-2'>
                        <Label className='mb-2'>Full Name</Label>
                        <Input
                            type='text'
                            value={input.fullName}
                            name="fullName"
                            onChange={changeEventHandler}
                            placeholder='Enter your name'
                        />
                    </div>
                    <div className='my-2'>
                        <Label className='mb-2'>Email</Label>
                        <Input
                            type='email'
                            value={input.email}
                            name='email'
                            onChange={changeEventHandler}
                            placeholder='example@gmail.com'
                        />
                    </div>
                    <div className='my-2'>
                        <Label className='mb-2'>Phone Number</Label>
                        <Input
                            type='number'
                            value={input.phoneNumber}
                            name='phoneNumber'
                            onChange={changeEventHandler}
                            placeholder='+91'
                        />
                    </div>
                    <div className='my-2'>
                        <Label className='mb-2'>Password</Label>
                        <Input
                            type='password'
                            value={input.password}
                            name='password'
                            onChange={changeEventHandler}
                            placeholder='Enter new password'
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup defaultValue="Student" className='flex items-center gap-4 my-5'>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    name='role'
                                    value='Student'
                                    checked={input.role === 'Student'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    name='role'
                                    value='Recruiter'
                                    checked={input.role === 'Recruiter'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept='image/*'
                                type='file'
                                onChange={changeFileHandler}
                                className='cursor-pointer'
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className='w-full my-4'> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> : <Button
                            type='submit'
                            className='w-full my-4'
                        >Signup</Button>
                    }
                    <span className='text-sm'>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup