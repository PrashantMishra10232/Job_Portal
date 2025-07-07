import { Plus } from 'lucide-react'
import React from 'react'

function Meetings() {
    return (
        <>
            <div className='flex items-center gap-1'>
                <h1 className='font-bold text-[#071C50] m-2'>Upcoming Meetings </h1>
                <button className='w-5 h-5 flex items-center justify-center rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold'><Plus /></button>
            </div>
            <div className='overflow-y-auto h-[calc(100%-2.5rem)] pr-1'>
                <div className='today mt-2'>
                    <h1>Today</h1>
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-3 bg-blue-100 hover:bg-blue-300 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-blue-300 pr-1 text-[#1B5CBE] font-semibold'>Sep3</div>
                            <div className='pb-1'><span className='text-[#1B5CBE] font-semibold'>username;</span> <span className='text-[#1B5CBE]'>Position;</span> <span className='text-[#1B5CBE]'>4th phase interview</span>  <span className='text-[#1B5CBE] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-blue-100 hover:bg-blue-300 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-blue-300 pr-1 text-[#1B5CBE] font-semibold'>Sep3</div>
                            <div className='pb-1'><span className='text-[#1B5CBE] font-semibold'>username;</span> <span className='text-[#1B5CBE]'>Position;</span> <span className='text-[#1B5CBE]'>4th phase interview</span>  <span className='text-[#1B5CBE] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-blue-100 hover:bg-blue-300 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-blue-300 pr-1 text-[#1B5CBE] font-semibold'>Sep3</div>
                            <div className='pb-1'><span className='text-[#1B5CBE] font-semibold'>username;</span> <span className='text-[#1B5CBE]'>Position;</span> <span className='text-[#1B5CBE]'>4th phase interview</span>  <span className='text-[#1B5CBE] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-green-100 hover:bg-green-200 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-green-300 pr-1 text-[#2B5708] font-semibold'>Time</div>
                            <div className='pb-1'><span className='text-[#2B5708] font-semibold'>username;</span> <span className='text-[#2B5708]'>Position;</span> <span className='text-[#2B5708]'>4th phase interview</span>  <span className='text-[#2B5708] font-semibold'>| time slot</span></div>
                        </div>
                    </div>

                </div>
                <div className='today mt-2'>
                    <h1>Tommorow</h1>
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-3 bg-blue-100 hover:bg-blue-300 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-blue-300 pr-1 text-[#1B5CBE] font-semibold'>Sep3</div>
                            <div className='pb-1'><span className='text-[#1B5CBE] font-semibold'>username;</span> <span className='text-[#1B5CBE]'>Position;</span> <span className='text-[#1B5CBE]'>4th phase interview</span>  <span className='text-[#1B5CBE] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-blue-100 hover:bg-blue-300 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-blue-300 pr-1 text-[#1B5CBE] font-semibold'>Sep3</div>
                            <div className='pb-1'><span className='text-[#1B5CBE] font-semibold'>username;</span> <span className='text-[#1B5CBE]'>Position;</span> <span className='text-[#1B5CBE]'>4th phase interview</span>  <span className='text-[#1B5CBE] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-blue-100 hover:bg-blue-300 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-blue-300 pr-1 text-[#1B5CBE] font-semibold'>Sep3</div>
                            <div className='pb-1'><span className='text-[#1B5CBE] font-semibold'>username;</span> <span className='text-[#1B5CBE]'>Position;</span> <span className='text-[#1B5CBE]'>4th phase interview</span>  <span className='text-[#1B5CBE] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-green-100 hover:bg-green-200 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-green-300 pr-1 text-[#2B5708] font-semibold'>Time</div>
                            <div className='pb-1'><span className='text-[#2B5708] font-semibold'>username;</span> <span className='text-[#2B5708]'>Position;</span> <span className='text-[#2B5708]'>4th phase interview</span>  <span className='text-[#2B5708] font-semibold'>| time slot</span></div>
                        </div>
                    </div>

                </div>
                <div className='today mt-2'>
                    <h1>This week</h1>
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-3 bg-blue-100 hover:bg-blue-300 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-blue-300 pr-1 text-[#1B5CBE] font-semibold'>Sep3</div>
                            <div className='pb-1'><span className='text-[#1B5CBE] font-semibold'>username;</span> <span className='text-[#1B5CBE]'>Position;</span> <span className='text-[#1B5CBE]'>4th phase interview</span>  <span className='text-[#1B5CBE] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-blue-100 hover:bg-blue-300 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-blue-300 pr-1 text-[#1B5CBE] font-semibold'>Sep3</div>
                            <div className='pb-1'><span className='text-[#1B5CBE] font-semibold'>username;</span> <span className='text-[#1B5CBE]'>Position;</span> <span className='text-[#1B5CBE]'>4th phase interview</span>  <span className='text-[#1B5CBE] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-green-100 hover:bg-green-200 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-green-300 pr-1 text-[#2B5708] font-semibold'>Time</div>
                            <div className='pb-1'><span className='text-[#2B5708] font-semibold'>username;</span> <span className='text-[#2B5708]'>Position;</span> <span className='text-[#2B5708]'>4th phase interview</span>  <span className='text-[#2B5708] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-green-100 hover:bg-green-200 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-green-300 pr-1 text-[#2B5708] font-semibold'>Time</div>
                            <div className='pb-1'><span className='text-[#2B5708] font-semibold'>username;</span> <span className='text-[#2B5708]'>Position;</span> <span className='text-[#2B5708]'>4th phase interview</span>  <span className='text-[#2B5708] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-blue-100 hover:bg-blue-300 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-blue-300 pr-1 text-[#1B5CBE] font-semibold'>Sep3</div>
                            <div className='pb-1'><span className='text-[#1B5CBE] font-semibold'>username;</span> <span className='text-[#1B5CBE]'>Position;</span> <span className='text-[#1B5CBE]'>4th phase interview</span>  <span className='text-[#1B5CBE] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-blue-100 hover:bg-blue-300 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-blue-300 pr-1 text-[#1B5CBE] font-semibold'>Sep3</div>
                            <div className='pb-1'><span className='text-[#1B5CBE] font-semibold'>username;</span> <span className='text-[#1B5CBE]'>Position;</span> <span className='text-[#1B5CBE]'>4th phase interview</span>  <span className='text-[#1B5CBE] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-green-100 hover:bg-green-200 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-green-300 pr-1 text-[#2B5708] font-semibold'>Time</div>
                            <div className='pb-1'><span className='text-[#2B5708] font-semibold'>username;</span> <span className='text-[#2B5708]'>Position;</span> <span className='text-[#2B5708]'>4th phase interview</span>  <span className='text-[#2B5708] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-blue-100 hover:bg-blue-300 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-blue-300 pr-1 text-[#1B5CBE] font-semibold'>Sep3</div>
                            <div className='pb-1'><span className='text-[#1B5CBE] font-semibold'>username;</span> <span className='text-[#1B5CBE]'>Position;</span> <span className='text-[#1B5CBE]'>4th phase interview</span>  <span className='text-[#1B5CBE] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-green-100 hover:bg-green-200 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-green-300 pr-1 text-[#2B5708] font-semibold'>Time</div>
                            <div className='pb-1'><span className='text-[#2B5708] font-semibold'>username;</span> <span className='text-[#2B5708]'>Position;</span> <span className='text-[#2B5708]'>4th phase interview</span>  <span className='text-[#2B5708] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-blue-100 hover:bg-blue-300 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-blue-300 pr-1 text-[#1B5CBE] font-semibold'>Sep3</div>
                            <div className='pb-1'><span className='text-[#1B5CBE] font-semibold'>username;</span> <span className='text-[#1B5CBE]'>Position;</span> <span className='text-[#1B5CBE]'>4th phase interview</span>  <span className='text-[#1B5CBE] font-semibold'>| time slot</span></div>
                        </div>
                        <div className='flex gap-3 bg-green-100 hover:bg-green-200 rounded-lg pl-1'>
                            <div className='flex items-center border-r-2 border-green-300 pr-1 text-[#2B5708] font-semibold'>Time</div>
                            <div className='pb-1'><span className='text-[#2B5708] font-semibold'>username;</span> <span className='text-[#2B5708]'>Position;</span> <span className='text-[#2B5708]'>4th phase interview</span>  <span className='text-[#2B5708] font-semibold'>| time slot</span></div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Meetings