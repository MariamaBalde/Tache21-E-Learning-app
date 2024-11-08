// import React, { useState } from 'react'
// import Navbar from './Navbar'
// import NavbarSidebar from './NavbarSidebar'
// import { Calendar } from 'primereact/calendar';

// const Layout = () => {
//     const [date, setDate] = useState(null);
//     return (
//         <div className="flex flex-col min-h-screen">
//             {/* Navbar */}
//             <Navbar />

//             <div className="flex flex-1">
//                 {/* Sidebar */}
//                 <NavbarSidebar />

//                 {/* Main Content */}
//                 <main className="flex-1 p-8 bg-gray-100">
//                     {/* Dhasbord */}
//                     <div className='grid lg:grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-72'>
//                         <div
//                             className='bg-[#f8492a] rounded-2xl w-64 h-40 flex flex-col gap-4 items-center justify-center p-4 py-7'>
//                             <div className='text-4xl mb-4'></div>
//                             <h1 className='text-lg font-semibold text-center px-3'>
//                             </h1>
//                         </div>
//                         <div
//                             className='bg-[#478b56] rounded-2xl w-64 h-40 flex flex-col gap-4 items-center justify-center p-4 py-7'>
//                             <div className='text-4xl mb-4'></div>
//                             <h1 className='text-lg font-semibold text-center px-3'>
//                             </h1>
//                         </div>
//                         <div
//                             className='bg-[#d16923] rounded-2xl w-64 h-40 flex flex-col gap-4 items-center justify-center p-4 py-7'>
//                             <div className='text-4xl mb-4'></div>
//                             <h1 className='text-lg font-semibold text-center px-3'>
//                             </h1>
//                         </div>
//                     </div>
//                     <div className="bg-[#e2d9d7] w-88 mt-7 p-3">
//                         <div className="flex items-center justify-between space-x-4">
//                             <h1 className='text-lg font-semibold p-3'>
//                                 <span className="pi pi-search"></span> Recherche une livraison
//                             </h1>
//                             <div className="relative">
//                                 <Calendar
//                                     value={date}
//                                     onChange={(e) => setDate(e.value)}
//                                     showIcon
//                                     className="mt-0"
//                                     style={{ display: 'inline-block' }} />
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     )
// }

// export default Layout

// src/components/Layout.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import NavbarSidebar from './NavbarSidebar';
import { Calendar } from 'primereact/calendar';

const Layout = () => {
    const [date, setDate] = useState(null);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            <div className="flex flex-1">
                {/* Sidebar */}
                <NavbarSidebar />

                {/* Main Content */}
                <main className="flex-1 p-8 bg-gray-100">
                    {/* Dashboard Section */}
                    <div className='grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                        <div className='bg-[#f8492a] rounded-2xl w-full h-40 flex flex-col gap-4 items-center justify-center p-4'>
                            <div className='text-4xl mb-4'></div>
                            <h1 className='text-lg font-semibold text-center px-3'>Card 1</h1>
                        </div>
                        <div className='bg-[#478b56] rounded-2xl w-full h-40 flex flex-col gap-4 items-center justify-center p-4'>
                            <div className='text-4xl mb-4'></div>
                            <h1 className='text-lg font-semibold text-center px-3'>Card 2</h1>
                        </div>
                        <div className='bg-[#d16923] rounded-2xl w-full h-40 flex flex-col gap-4 items-center justify-center p-4'>
                            <div className='text-4xl mb-4'></div>
                            <h1 className='text-lg font-semibold text-center px-3'>Card 3</h1>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="bg-[#e2d9d7] w-full mt-7 p-5 rounded-lg">
                        <div className="flex items-center justify-between space-x-4">
                            <h1 className='text-lg font-semibold'>
                                <span className="pi pi-search"></span> Recherche une livraison
                            </h1>
                            <div className="relative">
                                <Calendar
                                    value={date}
                                    onChange={(e) => setDate(e.value)}
                                    showIcon
                                    className="mt-0"
                                    style={{ display: 'inline-block' }}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Layout;

