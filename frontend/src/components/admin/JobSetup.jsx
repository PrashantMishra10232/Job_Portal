import React, { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { JOB_API_ENDPOINT } from '@/utils/constant'
// import { useParams } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
// import { setSingleCompany } from '@/redux/companySlice'
// import useGetCompanyById from '@/hooks/useGetCompanyById'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { setSingleJob } from '@/redux/jobSlice'

function CompanySetup() {
    // const params = useParams();
    // useGetCompanyById(params.id);
    const [input, setInput] = React.useState({
        title: "",
        description: "",
        requirements: [],
        salary: 0,
        location: "",
        jobType: "",
        position: 0,
        company: "",



    })
    const { allCompanies } = useSelector((state) => state.company);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = allCompanies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, company:selectedCompany._id});
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("input", input);
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials: true,});
            if (res.data.success) {
                // dispatch(setSingleJob(res.data.data))
                toast.success(res.data.message);
                navigate('/admin/jobs')
            }
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
            toast.error(errorMessage);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10 border border-gray-100 p-8 shadow-2xl'>
                <form action='' onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button variant='outline' className="flex items-center gap-2 text-gray-500 font-semibold" onClick={() => navigate('/admin/jobs')}>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Job Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label className='text-lg mb-2'>Role</Label>
                            <Input
                                type='text'
                                name='title'
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label className='text-lg mb-2'>Requirements</Label>
                            <Input
                                type='text'
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label className='text-lg mb-2'>Salary</Label>
                            <Input
                                type='number'
                                name='salary'
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label className='text-lg mb-2'>Location</Label>
                            <Input
                                type='text'
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label className='text-lg mb-2'>Job Type</Label>
                            <Input
                                type='text'
                                name='jobType'
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label className='text-lg mb-2'>Position</Label>
                            <Input
                                type='number'
                                name='position'
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label className='text-lg mb-2'>Company</Label>
                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger className="w-[247px]">
                                    <SelectValue placeholder="Select a company" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Company</SelectLabel>
                                        {
                                            allCompanies.length >=0 && allCompanies.map((company)=>(
                                                <SelectItem value={company?.name?.toLowerCase()} key={company._id}>{company.name}</SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <Label className='text-lg mb-2 mt-5'>Description</Label>
                        {/* <Input
                type='text'
                name='description'
                value={input.description}
                onChange={changeEventHandler}
              /> */}
                        <textarea
                            name="description"
                            id=""
                            value={input.description}
                            onChange={changeEventHandler}
                            className='w-full h-32 border border-gray-300 rounded-md p-2'
                            placeholder='Description'
                        ></textarea>
                    </div>
                    {
                        loading ? <Button className='w-full my-4'> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> : <Button type='submit' className='w-full mt-8'>Update</Button>
                    }

                </form>
            </div>

        </div>
    )
}

export default CompanySetup