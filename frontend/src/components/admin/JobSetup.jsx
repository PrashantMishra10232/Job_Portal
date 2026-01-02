import React, { useEffect } from 'react'
import { toast } from 'sonner'
import { JOB_API_ENDPOINT } from '@/utils/constant'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Briefcase, DollarSign, MapPin, Users, Building2, FileText, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { Editor } from '@tinymce/tinymce-react'
import axiosInstance from '@/utils/axiosInstance'

function JobSetup() {
    const [input, setInput] = React.useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        position: "",
        company: "",
    })
    const { allCompanies } = useSelector((state) => state.company);
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = allCompanies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, company: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const jobData = {
                ...input,
                salary: Number(input.salary),
                position: Number(input.position),
                requirements: input.requirements.split(',').map(req => req.trim()).filter(req => req)
            };
            
            const res = await axiosInstance.post(`${JOB_API_ENDPOINT}/post`, jobData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs/dashboard')
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
        <div className='min-h-screen bg-gradient-to-b from-gray-50 via-white to-purple-50/30'>
            <Navbar />
            
            {/* Header Section */}
            <div className='bg-gradient-to-r from-[#6B4EFF] via-[#5a3dd9] to-[#4d32c2] text-white py-8'>
                <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/admin/jobs/dashboard')}
                        className='mb-4 text-white hover:bg-white/10'
                    >
                        <ArrowLeft className='w-4 h-4 mr-2' />
                        Back to Jobs
                    </Button>
                    <div className='flex items-center gap-3'>
                        <div className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center'>
                            <Briefcase className='w-6 h-6' />
                        </div>
                        <div>
                            <h1 className='text-3xl sm:text-4xl font-bold mb-1'>Create New Job</h1>
                            <p className='text-white/80 text-sm'>Fill in the details to post a new job opening</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8'>
                    <form onSubmit={submitHandler} className='space-y-8'>
                        {/* Basic Information Section */}
                        <div>
                            <h2 className='text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200'>Basic Information</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <Label className='text-base font-semibold text-gray-700 flex items-center gap-2'>
                                        <Briefcase className='w-4 h-4 text-[#6B4EFF]' />
                                        Job Title / Role *
                                    </Label>
                                    <Input
                                        type='text'
                                        name='title'
                                        value={input.title}
                                        onChange={changeEventHandler}
                                        placeholder='e.g., Senior Frontend Developer'
                                        required
                                        className='h-11 border-gray-200 focus:border-[#6B4EFF] focus:ring-[#6B4EFF]'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className='text-base font-semibold text-gray-700 flex items-center gap-2'>
                                        <Building2 className='w-4 h-4 text-[#6B4EFF]' />
                                        Company *
                                    </Label>
                                    <Select onValueChange={selectChangeHandler} required>
                                        <SelectTrigger className="h-11 border-gray-200 focus:border-[#6B4EFF] focus:ring-[#6B4EFF]">
                                            <SelectValue placeholder="Select a company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Companies</SelectLabel>
                                                {allCompanies.length > 0 ? (
                                                    allCompanies.map((company) => (
                                                        <SelectItem value={company?.name?.toLowerCase()} key={company._id}>
                                                            {company.name}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="no-companies" disabled>No companies available</SelectItem>
                                                )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Job Details Section */}
                        <div>
                            <h2 className='text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200'>Job Details</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <Label className='text-base font-semibold text-gray-700 flex items-center gap-2'>
                                        <MapPin className='w-4 h-4 text-[#6B4EFF]' />
                                        Location *
                                    </Label>
                                    <Input
                                        type='text'
                                        name='location'
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        placeholder='e.g., Delhi, Noida, Mumbai'
                                        required
                                        className='h-11 border-gray-200 focus:border-[#6B4EFF] focus:ring-[#6B4EFF]'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className='text-base font-semibold text-gray-700 flex items-center gap-2'>
                                        <DollarSign className='w-4 h-4 text-[#6B4EFF]' />
                                        Salary (LPA) *
                                    </Label>
                                    <Input
                                        type='number'
                                        name='salary'
                                        value={input.salary}
                                        onChange={changeEventHandler}
                                        placeholder='e.g., 5'
                                        required
                                        min="0"
                                        className='h-11 border-gray-200 focus:border-[#6B4EFF] focus:ring-[#6B4EFF]'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className='text-base font-semibold text-gray-700 flex items-center gap-2'>
                                        <FileText className='w-4 h-4 text-[#6B4EFF]' />
                                        Job Type *
                                    </Label>
                                    <Select onValueChange={(value) => setInput({ ...input, jobType: value })} required>
                                        <SelectTrigger className="h-11 border-gray-200 focus:border-[#6B4EFF] focus:ring-[#6B4EFF]">
                                            <SelectValue placeholder="Select job type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Full-time">Full-time</SelectItem>
                                            <SelectItem value="Part-time">Part-time</SelectItem>
                                            <SelectItem value="Contract">Contract</SelectItem>
                                            <SelectItem value="Internship">Internship</SelectItem>
                                            <SelectItem value="Remote">Remote</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='space-y-2'>
                                    <Label className='text-base font-semibold text-gray-700 flex items-center gap-2'>
                                        <Users className='w-4 h-4 text-[#6B4EFF]' />
                                        Open Positions *
                                    </Label>
                                    <Input
                                        type='number'
                                        name='position'
                                        value={input.position}
                                        onChange={changeEventHandler}
                                        placeholder='e.g., 2'
                                        required
                                        min="1"
                                        className='h-11 border-gray-200 focus:border-[#6B4EFF] focus:ring-[#6B4EFF]'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Requirements Section */}
                        <div>
                            <h2 className='text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200'>Requirements</h2>
                            <div className='space-y-2'>
                                <Label className='text-base font-semibold text-gray-700'>
                                    Skills / Requirements (comma-separated)
                                </Label>
                                <Input
                                    type='text'
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    placeholder='e.g., React, Node.js, MongoDB, AWS'
                                    className='h-11 border-gray-200 focus:border-[#6B4EFF] focus:ring-[#6B4EFF]'
                                />
                                <p className='text-sm text-gray-500 mt-1'>Separate multiple requirements with commas</p>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div>
                            <h2 className='text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200'>Job Description *</h2>
                            <div className='space-y-2'>
                                <Label className='text-base font-semibold text-gray-700'>
                                    Detailed Job Description
                                </Label>
                                <div className='border border-gray-200 rounded-lg overflow-hidden'>
                                    <Editor
                                        apiKey="p3ykwsrogkavpyjlzch5xcigs0vifjxdpefknm42gmskarph"
                                        value={input.description}
                                        onEditorChange={(newValue) =>
                                            setInput({ ...input, description: newValue })
                                        }
                                        init={{
                                            height: 400,
                                            menubar: false,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                                                'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                'insertdatetime', 'media', 'table', 'paste', 'help', 'wordcount'
                                            ],
                                            toolbar:
                                                'undo redo | formatselect | bold italic underline | \
                                                alignleft aligncenter alignright alignjustify | \
                                                bullist numlist outdent indent | removeformat | help',
                                            content_style: 'body { font-family:Inter,Arial,sans-serif; font-size:14px }'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='flex items-center gap-4 pt-4 border-t border-gray-200'>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/admin/jobs/dashboard')}
                                className='flex-1 border-gray-300'
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                disabled={loading}
                                className='flex-1 bg-gradient-to-r from-[#6B4EFF] to-[#5a3dd9] hover:from-[#5a3dd9] hover:to-[#4d32c2] text-white shadow-lg hover:shadow-xl transition-all'
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Creating Job...
                                    </>
                                ) : (
                                    <>
                                        <Briefcase className='w-4 h-4 mr-2' />
                                        Create Job
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JobSetup
