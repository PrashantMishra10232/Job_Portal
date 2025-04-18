import React, {useEffect} from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchedCompanies } from '@/redux/companySlice'

function Companies() {
    useGetAllCompanies();
    const [input,setInput]= React.useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setSearchedCompanies(input))
    },[input])
    return (
        <div className='bg-gradient-to-b from-purple-100 to-white'>
            <Navbar />
            <div className=' max-w-6xl mx-4 sm:mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className='w-fit'
                        placeholder='Filter by name'
                        onChange = {(e)=>setInput(e.target.value)}
                    />
                    <Button onClick={()=>navigate('/admin/companies/create')}>New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies