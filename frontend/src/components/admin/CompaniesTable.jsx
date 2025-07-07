import React, { useEffect } from 'react'
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CompaniesTable() {
    const navigate = useNavigate();
    const { allCompanies, searchedCompanies } = useSelector(store => store.company)
    // console.log("All Companies:", allCompanies);
    const [filterCompany,setFilterCompany] = React.useState(allCompanies);
    useEffect(()=>{
        const filteredCompany = allCompanies.length >=0 && allCompanies.filter((company)=>{
            if(!searchedCompanies){
                return true;
            }
            return company.name.toLowerCase().includes(searchedCompanies.toLowerCase())
        });
        setFilterCompany(filteredCompany);
    },[allCompanies, searchedCompanies ])
    return (
        <div>
            <Table className='border border-gray-300 shadow-xl'>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.map((company) => (
                    <TableRow key={company._id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={company.logo} />
                            </Avatar>
                        </TableCell>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                        <TableCell className='text-right cursor-pointer'>
                            <Popover>
                                <PopoverTrigger className='cursor-pointer'><MoreHorizontal/></PopoverTrigger>
                                <PopoverContent className='w-32'>
                                    <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                        <Edit2 />
                                        <span>Edit</span>
                                    </div>
                                </PopoverContent>
                            </Popover></TableCell >
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable