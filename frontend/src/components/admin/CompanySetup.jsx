import React, { useEffect } from 'react'
import { toast } from 'sonner'
import { COMPANY_API_ENDPOINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Building2, Globe, MapPin, FileText, Upload, Loader2, Image as ImageIcon } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import axiosInstance from '@/utils/axiosInstance'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'

function CompanySetup() {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = React.useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: ""
  })
  const { singleCompany } = useSelector((state) => state.company);
  const [loading, setLoading] = React.useState(false)
  const [logoPreview, setLogoPreview] = React.useState(null)
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    const logo = e.target.files[0];
    if (logo) {
      setInput({ ...input, logo })
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(logo);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.logo && typeof input.logo !== 'string') {
      formData.append("logo", input.logo);
    }
    
    setLoading(true);
    try {
      const res = await axiosInstance.put(`${COMPANY_API_ENDPOINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/companies/dashboard')
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

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany?.name || "",
        description: singleCompany?.description || "",
        website: singleCompany?.website || "",
        location: singleCompany?.location || "",
        logo: singleCompany?.logo || "",
      })
      setLogoPreview(singleCompany?.logo || null);
    }
  }, [singleCompany]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 via-white to-purple-50/30'>
      <Navbar />
      
      {/* Header Section */}
      <div className='bg-gradient-to-r from-[#6B4EFF] via-[#5a3dd9] to-[#4d32c2] text-white py-8'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/companies/dashboard')}
            className='mb-4 text-white hover:bg-white/10'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Companies
          </Button>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center'>
              <Building2 className='w-6 h-6' />
            </div>
            <div>
              <h1 className='text-3xl sm:text-4xl font-bold mb-1'>Company Setup</h1>
              <p className='text-white/80 text-sm'>Update your company information and details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8'>
          <form onSubmit={submitHandler} className='space-y-8'>
            {/* Company Logo Section */}
            <div>
              <h2 className='text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200'>Company Logo</h2>
              <div className='flex items-center gap-6'>
                <div className='flex-shrink-0'>
                  {logoPreview ? (
                    <Avatar className='w-24 h-24 border-4 border-gray-200'>
                      <AvatarImage src={logoPreview} alt="Company logo" />
                      <AvatarFallback className='bg-[#6B4EFF] text-white text-2xl font-bold'>
                        {input.name?.charAt(0) || 'C'}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-gray-200'>
                      <ImageIcon className='w-10 h-10 text-gray-400' />
                    </div>
                  )}
                </div>
                <div className='flex-1'>
                  <Label className='text-base font-semibold text-gray-700 flex items-center gap-2 mb-2'>
                    <Upload className='w-4 h-4 text-[#6B4EFF]' />
                    Upload Logo
                  </Label>
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={changeFileHandler}
                    className='h-11 border-gray-200 focus:border-[#6B4EFF] focus:ring-[#6B4EFF]'
                  />
                  <p className='text-sm text-gray-500 mt-2'>Recommended: Square image, at least 200x200px</p>
                </div>
              </div>
            </div>

            {/* Basic Information Section */}
            <div>
              <h2 className='text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200'>Basic Information</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label className='text-base font-semibold text-gray-700 flex items-center gap-2'>
                    <Building2 className='w-4 h-4 text-[#6B4EFF]' />
                    Company Name *
                  </Label>
                  <Input
                    type='text'
                    name='name'
                    value={input.name}
                    onChange={changeEventHandler}
                    placeholder='e.g., Tech Solutions Inc.'
                    required
                    className='h-11 border-gray-200 focus:border-[#6B4EFF] focus:ring-[#6B4EFF]'
                  />
                </div>
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
                    placeholder='e.g., Delhi, India'
                    required
                    className='h-11 border-gray-200 focus:border-[#6B4EFF] focus:ring-[#6B4EFF]'
                  />
                </div>
                <div className='space-y-2 md:col-span-2'>
                  <Label className='text-base font-semibold text-gray-700 flex items-center gap-2'>
                    <Globe className='w-4 h-4 text-[#6B4EFF]' />
                    Website
                  </Label>
                  <Input
                    type='url'
                    name='website'
                    value={input.website}
                    onChange={changeEventHandler}
                    placeholder='https://www.example.com'
                    className='h-11 border-gray-200 focus:border-[#6B4EFF] focus:ring-[#6B4EFF]'
                  />
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div>
              <h2 className='text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200'>About Company</h2>
              <div className='space-y-2'>
                <Label className='text-base font-semibold text-gray-700 flex items-center gap-2'>
                  <FileText className='w-4 h-4 text-[#6B4EFF]' />
                  Company Description
                </Label>
                <textarea
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className='w-full min-h-[150px] border border-gray-200 rounded-lg p-4 focus:border-[#6B4EFF] focus:ring-2 focus:ring-[#6B4EFF]/20 outline-none transition-all resize-y'
                  placeholder='Tell us about your company, its mission, values, and what makes it unique...'
                />
                <p className='text-sm text-gray-500 mt-1'>Describe your company in detail to attract the right candidates</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex items-center gap-4 pt-4 border-t border-gray-200'>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/companies/dashboard')}
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
                    Updating...
                  </>
                ) : (
                  <>
                    <Building2 className='w-4 h-4 mr-2' />
                    Update Company
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

export default CompanySetup
