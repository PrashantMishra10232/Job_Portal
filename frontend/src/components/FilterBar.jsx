import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "./ui/menubar"
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '@/redux/jobSlice';
import { Check } from 'lucide-react';

const filterData = [
    {
        filterType: "Location",
        filterKey: "location",
        array: ["Delhi", "Noida", "Hyderabad", "Pune", "Mumbai", "Gurugram"]
    },
    {
        filterType: "Industry",
        filterKey: "industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        filterKey: "salary",
        array: ["0-2LPA", "2-5LPA", "6-10LPA"]
    },

]

function FilterBar() {
    const dispatch = useDispatch();
    const { filters = { location: [], industry: [], salary: [] } } = useSelector(state => state.job || {});

    const filterHandler = (filterKey, value) => {
        const currentArray = filters?.[filterKey] || [];
        const isSelected = currentArray.includes(value);
        
        let updatedArray;
        if (isSelected) {
            // Remove from array
            updatedArray = currentArray.filter(item => item !== value);
        } else {
            // Add to array
            updatedArray = [...currentArray, value];
        }
        
        dispatch(setFilters({ [filterKey]: updatedArray }));
    }

    return (
        <div>
            <Menubar className='flex justify-evenly'>
                {
                    filterData.map((data, index) => {
                        const filterArray = filters?.[data.filterKey] || [];
                        const filterCount = filterArray.length;
                        return (
                            <MenubarMenu key={index}>
                                <MenubarTrigger>
                                    {data.filterType}
                                    {filterCount > 0 && (
                                        <span className='ml-2 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs'>
                                            {filterCount}
                                        </span>
                                    )}
                                </MenubarTrigger>
                                <MenubarContent>
                                    {
                                        data.array.map((item) => {
                                            const isSelected = filterArray.includes(item);
                                            return (
                                                <MenubarItem
                                                    key={item}
                                                    onClick={() => filterHandler(data.filterKey, item)}
                                                    className='flex items-center justify-between cursor-pointer'
                                                >
                                                    <span>{item}</span>
                                                    {isSelected && <Check className='w-4 h-4 ml-2' />}
                                                </MenubarItem>
                                            )
                                        })
                                    }
                                </MenubarContent>
                            </MenubarMenu>
                        )
                    })
                }
            </Menubar>
        </div >
    )
}

export default FilterBar