import React, { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_ENDPOINT } from "@/utils/constant"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser, setToken } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'



function Login() {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    })

    const { loading, user } = useSelector(store => store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })

            if (res.data.success) {
                dispatch(setUser(res.data.data.loggedInUser));
                localStorage.setItem("loggedInUser", JSON.stringify(res.data.data.loggedInUser))

                //save the token in memory
                dispatch(setToken(res.data.data.accessToken))

                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Login Error:", error);
            console.error("Error Response:", error.response);

            const errorMessage =
                error.response?.data?.message || error.message || "Something went wrong!";

            toast.error(errorMessage);
        } finally {
            dispatch(setLoading(false))
        }
    }
    // useEffect(() => {
    //     if (!user) {
    //         navigate('/login'); // <- this will loop if not properly guarded
    //     }
    // }, []);


    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
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
                        <Label className='mb-2'>Password</Label>
                        <Input
                            type='password'
                            value={input.password}
                            name='password'
                            onChange={changeEventHandler}
                            placeholder='Enter your password here'
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup defaultValue="comfortable" className='flex items-center gap-4 my-5'>
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
                    </div>
                    {
                        loading ? <Button className='w-full my-4'> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> : <Button
                            type='submit'
                            className='w-full my-4'
                        >Login</Button>
                    }

                    <span className='text-sm'>Don't have an account? <Link to='/signup' className='text-blue-500'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login