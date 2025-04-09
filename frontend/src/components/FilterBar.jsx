import React, { useState, useEffect } from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "./ui/menubar"
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Noida", "Hyderabad", "Pune", "Mumbai", "Gurugram"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-2LPA", "2-5LPA", "6-10LPA"]
    },

]

function FilterBar() {

    const [selectedValue, setselectedValue] = useState("");
    const dispatch = useDispatch();

    const filterHandler = (value) => {
        setselectedValue(value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])

    return (
        <div>
            <Menubar className='flex justify-evenly'>
                {
                    filterData.map((data, index) => (
                        <MenubarMenu key={index}>
                            <MenubarTrigger>{data.filterType}</MenubarTrigger>
                            <MenubarContent>
                                {
                                    data.array.map((item) => (
                                        <MenubarItem
                                            key={item}
                                            onClick={() => filterHandler(item)} >{item}
                                        </MenubarItem>
                                    ))
                                }
                            </MenubarContent>
                        </MenubarMenu>
                    ))
                }
            </Menubar>
        </div >
    )
}

export default FilterBar