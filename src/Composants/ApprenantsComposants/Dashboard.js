
import React, { useState } from 'react'
import { FiList } from "react-icons/fi";
import { FaCheck, FaFile } from "react-icons/fa";


const Dashbord = () => {
    
  return (
    <div>

        {/* Main Content */}
        <main className='main-container mt-16 mr-80'>
            <div className='main-title'>
                <h3>Dashboard</h3>
            </div>

            <div className='main-cards'>
           <div className='card'>
           <div className='card-inner w-32 h-32'>
                    {/* <h3>Products</h3> */}
                    <FiList className='card_icon'/>
                    {/* <h1>300</h1> */}
                </div>
           </div>
           <div className='card'>
           <div className='card-inner  w-32 h-32'>
                    {/* <h3>Products</h3> */}
                    <FaCheck className='card_icon'/>
                    {/* <h1>300</h1> */}
                </div>
           </div>
           <div className='card'>
           <div className='card-inner  w-32 h-32'>
                    {/* <h3>Products</h3> */}
                    < FaFile className='card_icon'/>
                    {/* <h1>300</h1> */}
                </div>
           </div>
            </div>
        </main>

        
  </div>
    
  )
}

export default Dashbord


