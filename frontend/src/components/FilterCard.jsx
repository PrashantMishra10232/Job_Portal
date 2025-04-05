import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType:"Location",
    array:["Delhi", "Noida", "Hyderabad", "Pune", "Mumbai", "Gurugram"]
  },
  {
    filterType:"Industry",
    array:["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType:"Salary",
    array:["0-2LPA", "2-5LPA", "6-10LPA"]
  },
  
]

function FilterCard() {
  const [selectedValue,setselectedValue] = useState("");
  const dispatch = useDispatch();

  const filterHandler = (value)=>{
    setselectedValue(value);
  }

  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue))
  },[selectedValue])


  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup value={selectedValue} onValueChange={filterHandler}>
        {
          filterData.map((data,index)=>(
            <div key={index}>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item,idx)=>{
                  const itemId = `r${index}-${idx}`
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={itemId}/>
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard