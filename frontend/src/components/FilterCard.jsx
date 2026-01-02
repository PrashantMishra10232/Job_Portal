import React, { useEffect, useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '@/redux/jobSlice';

const filterData = [
  {
    filterType:"Location",
    filterKey: "location",
    array:["Delhi", "Noida", "Hyderabad", "Pune", "Mumbai", "Gurugram"]
  },
  {
    filterType:"Industry",
    filterKey: "industry",
    array:["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType:"Salary",
    filterKey: "salary",
    array:["0-2LPA", "2-5LPA", "6-10LPA"]
  },
  
]

function FilterCard() {
  const dispatch = useDispatch();
  const { filters = { location: [], industry: [], salary: [] } } = useSelector(state => state.job || {});
  const [localFilters, setLocalFilters] = useState({
    location: filters?.location || [],
    industry: filters?.industry || [],
    salary: filters?.salary || []
  });

  const filterHandler = (filterKey, value, checked) => {
    setLocalFilters(prev => {
      const currentArray = prev[filterKey] || [];
      let updatedArray;
      
      if (checked) {
        // Add to array if not already present
        updatedArray = currentArray.includes(value) ? currentArray : [...currentArray, value];
      } else {
        // Remove from array
        updatedArray = currentArray.filter(item => item !== value);
      }
      
      const newFilters = {
        ...prev,
        [filterKey]: updatedArray
      };
      
      // Dispatch to Redux
      dispatch(setFilters({ [filterKey]: updatedArray }));
      
      return newFilters;
    });
  }

  const handleClearFilters = () => {
    setLocalFilters({
      location: [],
      industry: [],
      salary: []
    });
    dispatch(clearFilters());
  }

  useEffect(() => {
    setLocalFilters({
      location: filters?.location || [],
      industry: filters?.industry || [],
      salary: filters?.salary || []
    });
  }, [filters]);

  const activeFiltersCount = (localFilters.location?.length || 0) + (localFilters.industry?.length || 0) + (localFilters.salary?.length || 0);

  return (
    <div className='w-full bg-white p-5 rounded-xl shadow-lg border border-gray-100 hidden sm:block sticky top-20'>
      <div className='flex justify-between items-center mb-4 pb-3 border-b border-gray-200'>
        <div>
          <h1 className='font-bold text-xl text-gray-800'>Filters</h1>
          {activeFiltersCount > 0 && (
            <p className='text-xs text-gray-500 mt-1'>{activeFiltersCount} active</p>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearFilters}
            className='text-xs text-[#6B4EFF] hover:text-[#5a3dd9] hover:bg-purple-50'
          >
            Clear All
          </Button>
        )}
      </div>
      {
        filterData.map((data,index)=>(
          <div key={index} className='mb-6 last:mb-0'>
            <h2 className='font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide'>{data.filterType}</h2>
            <div className='space-y-2'>
              {data.array.map((item,idx)=>{
                const itemId = `${data.filterKey}-${idx}`
                const isChecked = localFilters[data.filterKey]?.includes(item) || false;
                return (
                  <div key={itemId} className='flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group'>
                    <Checkbox 
                      id={itemId}
                      checked={isChecked}
                      onCheckedChange={(checked) => filterHandler(data.filterKey, item, checked)}
                      className='data-[state=checked]:bg-[#6B4EFF] data-[state=checked]:border-[#6B4EFF]'
                    />
                    <Label 
                      htmlFor={itemId} 
                      className={`cursor-pointer flex-1 text-sm ${
                        isChecked ? 'text-[#6B4EFF] font-medium' : 'text-gray-700 group-hover:text-gray-900'
                      } transition-colors`}
                    >
                      {item}
                    </Label>
                  </div>
                )
              })}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default FilterCard