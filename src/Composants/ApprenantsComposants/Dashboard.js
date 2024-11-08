import React, { useState } from 'react'
import { Calendar } from 'primereact/calendar';


const Dashbord = () => {
    const [date, setDate] = useState(null);
  return (
    <div className='w-full'>
       
    {/* Dhasbord */}
        <div className='container p-10 pt-16 ml-64'>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8'>
        <div
            className='bg-[#f8492a] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7'>
            <div className='text-4xl mb-4'></div>
            <h1 className='text-lg font-semibold text-center px-3'>
            </h1>
        </div>
        <div
            className='bg-[#478b56] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7'>
            <div className='text-4xl mb-4'></div>
            <h1 className='text-lg font-semibold text-center px-3'>
            </h1>
        </div>
        <div
            className='bg-[#d16923] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7'>
            <div className='text-4xl mb-4'></div>
            <h1 className='text-lg font-semibold text-center px-3'>
            </h1>
        </div>
    </div>

    <div className="bg-[#e2d9d7] mt-7 p-3 w-90">
    <div className="flex items-center justify-between space-x-4">
    <h1 className='text-lg font-semibold p-3'>
         <span className="pi pi-search"></span> Recherche une livraison
         </h1>
    <div className="relative">
             <Calendar
          value={date}
          onChange={(e) => setDate(e.value)}
          showIcon
          className="mt-0"
          style={{ display: 'inline-block' }} />
          <i className="pi pi-trash me-4 text-red-500" style={{ fontSize: '24px' }}></i>

        </div>
    </div>
        
  
    </div>
  </div>
    </div>
    
  )
}

export default Dashbord