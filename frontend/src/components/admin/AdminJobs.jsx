import React, {useEffect} from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import JobsTable from './JobsTable'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminsJobs from '@/hooks/useGetAllAdminsJobs'
import { useDispatch } from 'react-redux'
import { setSearchedJobs } from '@/redux/jobSlice'

function Companies() {
    useGetAllAdminsJobs();
    const [input,setInput]= React.useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setSearchedJobs(input))
    },[input])
    return (
        <div>
            <Navbar />
            <div className=' max-w-6xl mx-4 sm:mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className='w-fit'
                        placeholder='Filter by name'
                        onChange = {(e)=>setInput(e.target.value)}
                    />
                    <Button onClick={()=>navigate('/admin/jobs/create')}>New Job</Button>
                </div>
                <JobsTable/>
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default Companies