import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
    ArrowLeft, 
    Search, 
    Download, 
    CheckCircle2, 
    XCircle, 
    CheckCircle, 
    Clock,
    User,
    Mail,
    Phone,
    FileText,
    Calendar,
    MoreVertical
} from 'lucide-react'
import { APPLICATION_API_ENDPOINT } from '@/utils/constant'
import { useParams, useNavigate } from 'react-router-dom'
import { setAllApplicants } from '@/redux/applicationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axiosInstance from '@/utils/axiosInstance'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const shortListingStatus = ["Approved", "Rejected"]

function JobApplicantsTable() {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allApplicants } = useSelector(store => store.application)
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredApplicants, setFilteredApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    const statusHandler = async(status, id) => {
        try {
            const res = await axiosInstance.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, {status}, {withCredentials: true})
            if(res.data.success){
                toast.success(res.data.message)
                // Refresh applicants list
                fetchAllApplicants();
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update status")
        }
    }

    const fetchAllApplicants = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`${APPLICATION_API_ENDPOINT}/${jobId}/applicants`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setAllApplicants(res.data.data))
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "Something went wrong";
            toast.error(errorMessage)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllApplicants()
    }, [jobId])

    useEffect(() => {
        if (allApplicants?.application) {
            if (searchQuery.trim() === '') {
                setFilteredApplicants(allApplicants.application);
            } else {
                const filtered = allApplicants.application.filter((applicant) => {
                    const query = searchQuery.toLowerCase();
                    return (
                        applicant?.applicant?.fullName?.toLowerCase().includes(query) ||
                        applicant?.applicant?.email?.toLowerCase().includes(query) ||
                        applicant?.applicant?.phoneNumber?.toString().includes(query) ||
                        applicant?.status?.toLowerCase().includes(query)
                    );
                });
                setFilteredApplicants(filtered);
            }
        }
    }, [searchQuery, allApplicants]);

    const getStatusBadge = (status) => {
        switch(status?.toLowerCase()) {
            case 'approved':
                return <Badge className='bg-green-50 text-green-700 border-green-200'><CheckCircle2 className='w-3 h-3 mr-1' />Approved</Badge>;
            case 'rejected':
                return <Badge className='bg-red-50 text-red-700 border-red-200'><XCircle className='w-3 h-3 mr-1' />Rejected</Badge>;
            case 'pending':
                return <Badge className='bg-yellow-50 text-yellow-700 border-yellow-200'><Clock className='w-3 h-3 mr-1' />Pending</Badge>;
            default:
                return <Badge className='bg-gray-50 text-gray-700 border-gray-200'><Clock className='w-3 h-3 mr-1' />Pending</Badge>;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-50 via-white to-purple-50/30'>
            <Navbar />
            
            {/* Header Section */}
            <div className='bg-gradient-to-r from-[#6B4EFF] via-[#5a3dd9] to-[#4d32c2] text-white py-8'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/admin/jobs/dashboard')}
                        className='mb-4 text-white hover:bg-white/10'
                    >
                        <ArrowLeft className='w-4 h-4 mr-2' />
                        Back to Jobs
                    </Button>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='text-3xl sm:text-4xl font-bold mb-2'>Job Applicants</h1>
                            <p className='text-white/80 text-sm sm:text-base'>
                                {allApplicants?.application?.length || 0} {allApplicants?.application?.length === 1 ? 'applicant' : 'applicants'} for this position
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Search Bar */}
                <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-6'>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                        <Input
                            type='text'
                            placeholder='Search applicants by name, email, or phone...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='pl-10 pr-4 py-6 text-base border-gray-200 focus:border-[#6B4EFF] focus:ring-[#6B4EFF]'
                        />
                    </div>
                    {searchQuery && (
                        <p className='text-sm text-gray-500 mt-2'>
                            Found {filteredApplicants.length} {filteredApplicants.length === 1 ? 'applicant' : 'applicants'} matching "{searchQuery}"
                        </p>
                    )}
                </div>

                {/* Applicants Table */}
                {loading ? (
                    <div className='text-center py-12'>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B4EFF] mx-auto'></div>
                        <p className='text-gray-500 mt-4'>Loading applicants...</p>
                    </div>
                ) : filteredApplicants.length === 0 ? (
                    <div className='text-center py-16 bg-white rounded-xl shadow-lg border border-gray-100'>
                        <User className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                        <h3 className='text-xl font-bold text-gray-800 mb-2'>
                            {searchQuery ? 'No applicants found' : 'No applicants yet'}
                        </h3>
                        <p className='text-gray-500 mb-4'>
                            {searchQuery 
                                ? 'Try adjusting your search criteria' 
                                : 'Applicants will appear here once they apply for this job'}
                        </p>
                        {searchQuery && (
                            <Button
                                variant="outline"
                                onClick={() => setSearchQuery('')}
                                className='border-[#6B4EFF] text-[#6B4EFF] hover:bg-[#6B4EFF] hover:text-white'
                            >
                                Clear Search
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden'>
                        <div className='overflow-x-auto'>
                            <Table>
                                <TableHeader>
                                    <TableRow className='bg-gray-50 hover:bg-gray-50'>
                                        <TableHead className='font-semibold text-gray-700'>Applicant</TableHead>
                                        <TableHead className='font-semibold text-gray-700'>Contact</TableHead>
                                        <TableHead className='font-semibold text-gray-700'>Resume</TableHead>
                                        <TableHead className='font-semibold text-gray-700'>Applied Date</TableHead>
                                        <TableHead className='font-semibold text-gray-700'>Status</TableHead>
                                        <TableHead className='text-right font-semibold text-gray-700'>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredApplicants.map((applicant) => (
                                        <TableRow key={applicant._id} className='hover:bg-gray-50 transition-colors'>
                                            <TableCell>
                                                <div className='flex items-center gap-3'>
                                                    <div className='w-10 h-10 bg-gradient-to-br from-[#6B4EFF] to-[#5a3dd9] rounded-full flex items-center justify-center text-white font-bold text-sm'>
                                                        {applicant?.applicant?.fullName?.charAt(0) || 'A'}
                                                    </div>
                                                    <div>
                                                        <p className='font-semibold text-gray-800'>{applicant?.applicant?.fullName || 'N/A'}</p>
                                                        <p className='text-sm text-gray-500 flex items-center gap-1'>
                                                            <Mail className='w-3 h-3' />
                                                            {applicant?.applicant?.email || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className='flex items-center gap-1 text-gray-600'>
                                                    <Phone className='w-4 h-4' />
                                                    <span>{applicant?.applicant?.phoneNumber || 'N/A'}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {applicant?.applicant?.profile?.resume ? (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => window.open(applicant.applicant.profile.resume, '_blank')}
                                                        className='border-[#6B4EFF] text-[#6B4EFF] hover:bg-[#6B4EFF] hover:text-white'
                                                    >
                                                        <Download className='w-4 h-4 mr-2' />
                                                        Resume
                                                    </Button>
                                                ) : (
                                                    <span className='text-gray-400 text-sm'>No resume</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className='flex items-center gap-1 text-gray-600'>
                                                    <Calendar className='w-4 h-4' />
                                                    <span>{formatDate(applicant?.applicant?.createdAt)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(applicant?.status)}
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className='h-8 w-8'>
                                                            <MoreVertical className='w-4 h-4' />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className='w-40'>
                                                        <DropdownMenuItem
                                                            onClick={() => statusHandler('Approved', applicant._id)}
                                                            className='cursor-pointer text-green-700 focus:text-green-700'
                                                        >
                                                            <CheckCircle className='w-4 h-4 mr-2' />
                                                            Approve
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => statusHandler('Rejected', applicant._id)}
                                                            className='cursor-pointer text-red-700 focus:text-red-700'
                                                        >
                                                            <XCircle className='w-4 h-4 mr-2' />
                                                            Reject
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobApplicantsTable
