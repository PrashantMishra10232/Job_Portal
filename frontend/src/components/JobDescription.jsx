import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { setSingleJob, setSavedJobs, removeSavedJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_ENDPOINT } from '@/utils/constant'
import { APPLICATION_API_ENDPOINT } from '@/utils/constant'
import { COMPANY_API_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { 
    MapPin, 
    Calendar, 
    Users, 
    Briefcase, 
    DollarSign, 
    Clock, 
    Bookmark,
    Share2,
    Building2,
    ArrowLeft,
    CheckCircle2
} from 'lucide-react'

function JobDescription() {
    const { singleJob, savedJobs } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.application?.some(application => application.applicant === user?._id);
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const [saved, setSaved] = useState(false);
    const params = useParams();
    const jobId = params.id;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Check if job is saved - sync with Redux state
    useEffect(() => {
        if (singleJob) {
            const isJobSaved = savedJobs.some((j) => j._id === singleJob._id);
            setSaved(isJobSaved);
        }
    }, [singleJob, savedJobs]);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, application: [...singleJob.application, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
            toast.error(errorMessage);
        }
    }

    const saveJobHandler = () => {
        const isAlreadySaved = savedJobs.some((j) => j._id === singleJob._id);
        
        if (!isAlreadySaved) {
            dispatch(setSavedJobs(singleJob));
            setSaved(true);
            toast.success("Job saved successfully!");
        } else {
            dispatch(removeSavedJob(singleJob._id));
            setSaved(false);
            toast.success("Job removed from saved!");
        }
    }

    const shareJobHandler = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: singleJob?.title,
                    text: `Check out this job: ${singleJob?.title} at ${singleJob?.company?.name}`,
                    url: window.location.href,
                });
            } catch (error) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    console.error('Share error:', error);
                    toast.error("Failed to share. Please try again.");
                }
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
            } catch (error) {
                console.error('Failed to copy to clipboard:', error);
                toast.error("Failed to copy link. Please try again.");
            }
        }
    }

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSingleJob = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true })
                if (res.data.success) {
                    let jobData = res.data.data;
                    
                    if (jobData.company && typeof jobData.company === 'string') {
                        try {
                            const companyRes = await axios.get(`${COMPANY_API_ENDPOINT}/get/${jobData.company}`, { withCredentials: true });
                            if (companyRes.data.success) {
                                jobData.company = companyRes.data.data || companyRes.data;
                            }
                        } catch (companyError) {
                            console.error('Failed to fetch company data:', companyError);
                            jobData.company = null;
                        }
                    }
                    
                    dispatch(setSingleJob(jobData))
                    setIsApplied(jobData.application.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.error(error);
                const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const daysAgo = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
        if (daysAgo === 0) return 'Today';
        if (daysAgo === 1) return 'Yesterday';
        return `${daysAgo} days ago`;
    };

    if (loading || !singleJob) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-64 bg-gray-200 rounded"></div>
                        <div className="h-96 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6 text-gray-600 hover:text-[#6B4EFF]"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>

                {/* Hero Section */}
                <div className='bg-gradient-to-r from-[#6B4EFF] via-[#5a3dd9] to-[#4d32c2] rounded-2xl p-8 mb-8 text-white shadow-2xl'>
                    <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-6'>
                        <div className='flex-1'>
                            {/* Company Info */}
                            <div className='flex items-center gap-4 mb-4'>
                                <div className='p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30'>
                                    <Avatar className='h-16 w-16'>
                                        <AvatarImage src={singleJob?.company?.logo} alt={singleJob?.company?.name} />
                                        <AvatarFallback className='bg-white/20 text-white text-lg font-bold'>
                                            {singleJob?.company?.name?.charAt(0) || 'C'}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <div>
                                    <div className='flex items-center gap-2 mb-1'>
                                        <Building2 className='w-5 h-5' />
                                        <h2 className='text-xl font-bold'>{singleJob?.company?.name || "Company"}</h2>
                                    </div>
                                    <div className='flex items-center gap-2 text-white/80'>
                                        <MapPin className='w-4 h-4' />
                                        <span className='text-sm'>{singleJob?.location || "Location"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Job Title */}
                            <h1 className='text-3xl md:text-4xl font-bold mb-4 leading-tight'>
                                {singleJob?.title}
                            </h1>

                            {/* Badges */}
                            <div className='flex items-center gap-3 flex-wrap'>
                                <Badge className='bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-colors'>
                                    <Briefcase className='w-3 h-3 mr-1' />
                                    {singleJob?.position} {singleJob?.position === 1 ? 'Position' : 'Positions'}
                                </Badge>
                                <Badge className='bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-colors'>
                                    <Clock className='w-3 h-3 mr-1' />
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className='bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-colors'>
                                    <DollarSign className='w-3 h-3 mr-1' />
                                    {singleJob?.salary} LPA
                                </Badge>
                                <Badge className='bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-colors'>
                                    <Users className='w-3 h-3 mr-1' />
                                    {singleJob?.application?.length || 0} Applicants
                                </Badge>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-col gap-3 md:min-w-[200px]'>
                            <Button
                                disabled={isApplied}
                                onClick={isApplied ? null : applyJobHandler}
                                className={`w-full h-12 text-base font-semibold shadow-lg ${
                                    isApplied 
                                        ? 'bg-white/20 text-white/70 cursor-not-allowed' 
                                        : 'bg-white text-[#6B4EFF] hover:bg-white/90 hover:scale-105 transition-transform'
                                }`}
                            >
                                {isApplied ? (
                                    <>
                                        <CheckCircle2 className='w-5 h-5 mr-2' />
                                        Already Applied
                                    </>
                                ) : (
                                    'Apply Now'
                                )}
                            </Button>
                            <div className='flex gap-2'>
                                <Button
                                    variant="outline"
                                    onClick={saveJobHandler}
                                    className={`flex-1 border-2 ${
                                        saved 
                                            ? 'bg-white/20 border-white text-white hover:bg-white/30' 
                                            : 'bg-transparent border-white/50 text-white hover:bg-white/10'
                                    }`}
                                >
                                    <Bookmark className={`w-4 h-4 mr-2 ${saved ? 'fill-current' : ''}`} />
                                    {saved ? 'Saved' : 'Save'}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={shareJobHandler}
                                    className='flex-1 bg-transparent border-2 border-white/50 text-white hover:bg-white/10'
                                >
                                    <Share2 className='w-4 h-4' />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Left Column - Main Content */}
                    <div className='lg:col-span-2 space-y-6'>
                        {/* Job Description */}
                        <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100'>
                            <h2 className='text-2xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200'>
                                Job Description
                            </h2>
                            <div 
                                className='prose prose-sm max-w-none text-gray-700 leading-relaxed'
                                dangerouslySetInnerHTML={{ __html: singleJob?.description }}
                            />
                        </div>

                        {/* Additional Details */}
                        <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100'>
                            <h2 className='text-2xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200'>
                                Job Details
                            </h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='flex items-start gap-3 p-4 bg-gray-50 rounded-lg'>
                                    <Briefcase className='w-5 h-5 text-[#6B4EFF] mt-0.5' />
                                    <div>
                                        <p className='text-sm text-gray-500 mb-1'>Role</p>
                                        <p className='font-semibold text-gray-800'>{singleJob?.title}</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-3 p-4 bg-gray-50 rounded-lg'>
                                    <MapPin className='w-5 h-5 text-[#6B4EFF] mt-0.5' />
                                    <div>
                                        <p className='text-sm text-gray-500 mb-1'>Location</p>
                                        <p className='font-semibold text-gray-800'>{singleJob?.location}</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-3 p-4 bg-gray-50 rounded-lg'>
                                    <DollarSign className='w-5 h-5 text-[#6B4EFF] mt-0.5' />
                                    <div>
                                        <p className='text-sm text-gray-500 mb-1'>Salary</p>
                                        <p className='font-semibold text-gray-800'>{singleJob?.salary} LPA</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-3 p-4 bg-gray-50 rounded-lg'>
                                    <Clock className='w-5 h-5 text-[#6B4EFF] mt-0.5' />
                                    <div>
                                        <p className='text-sm text-gray-500 mb-1'>Job Type</p>
                                        <p className='font-semibold text-gray-800'>{singleJob?.jobType}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className='space-y-6'>
                        {/* Quick Info Card */}
                        <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100 sticky top-8'>
                            <h3 className='text-lg font-bold text-gray-800 mb-4'>Quick Info</h3>
                            <div className='space-y-4'>
                                <div className='flex items-center gap-3 pb-3 border-b border-gray-100'>
                                    <Calendar className='w-5 h-5 text-[#6B4EFF]' />
                                    <div>
                                        <p className='text-xs text-gray-500'>Posted</p>
                                        <p className='font-semibold text-gray-800'>{formatDate(singleJob?.createdAt)}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3 pb-3 border-b border-gray-100'>
                                    <Users className='w-5 h-5 text-[#6B4EFF]' />
                                    <div>
                                        <p className='text-xs text-gray-500'>Total Applicants</p>
                                        <p className='font-semibold text-gray-800'>{singleJob?.application?.length || 0}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3 pb-3 border-b border-gray-100'>
                                    <Briefcase className='w-5 h-5 text-[#6B4EFF]' />
                                    <div>
                                        <p className='text-xs text-gray-500'>Open Positions</p>
                                        <p className='font-semibold text-gray-800'>{singleJob?.position}</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <MapPin className='w-5 h-5 text-[#6B4EFF]' />
                                    <div>
                                        <p className='text-xs text-gray-500'>Location</p>
                                        <p className='font-semibold text-gray-800'>{singleJob?.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Company Card */}
                        {singleJob?.company && (
                            <div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100'>
                                <h3 className='text-lg font-bold text-gray-800 mb-4'>About Company</h3>
                                <div className='flex items-center gap-3 mb-4'>
                                    <Avatar className='h-12 w-12'>
                                        <AvatarImage src={singleJob?.company?.logo} alt={singleJob?.company?.name} />
                                        <AvatarFallback className='bg-[#6B4EFF] text-white'>
                                            {singleJob?.company?.name?.charAt(0) || 'C'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className='font-semibold text-gray-800'>{singleJob?.company?.name}</p>
                                        <p className='text-sm text-gray-500'>{singleJob?.company?.industry || 'Company'}</p>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className='w-full border-[#6B4EFF] text-[#6B4EFF] hover:bg-[#6B4EFF] hover:text-white'
                                >
                                    View Company Profile
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription
