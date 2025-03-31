import React, { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { COMPANY_API_ENDPOINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import useGetCompanyById from '@/hooks/useGetCompanyById'

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
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    const logo = e.target.files[0];
    setInput({ ...input, logo })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("input", input);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.logo) formData.append("logo", input.logo);
    setLoading(true);
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_ENDPOINT}/update/${params.id}`, formData, {
        Headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/companies')
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
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      logo: singleCompany?.logo || "",
    })
  }, [singleCompany]);
  return (
    <div>
      <Navbar />
      <div className='max-w-xl mx-auto my-10'>
        <form action='' onSubmit={submitHandler}>
          <div className='flex items-center gap-5 p-8'>
            <Button variant='outline' className="flex items-center gap-2 text-gray-500 font-semibold" onClick={() => navigate('/admin/companies')}>
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className='font-bold text-xl'>Company Setup</h1>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label className='text-lg mb-2'>Company Name</Label>
              <Input
                type='text'
                name='name'
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className='text-lg mb-2'>Logo</Label>
              <Input
                type='file'
                accept='image/*'
                onChange={changeFileHandler}
              />
            </div>
            <div>
              <Label className='text-lg mb-2'>Website</Label>
              <Input
                type='text'
                name='website'
                value={input.website}
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