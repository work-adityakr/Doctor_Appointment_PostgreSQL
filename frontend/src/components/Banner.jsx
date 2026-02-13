import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate();

    return (
        <div className='md:mx-10 my-20'>
            <div className='flex bg-gradient-to-r from-[#5f6FFF] to-[#9282ff] rounded-[2rem] px-6 sm:px-10 md:px-14 lg:px-16 overflow-hidden shadow-xl relative'>
                
                {/* ----- Left Side: Content ----- */}
                <div className='flex-1 py-10 sm:py-12 md:py-20 lg:py-28 lg:pl-5 z-10'>
                    <div className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight'>
                        <p>Book Appointment</p>
                        <p className='mt-2 text-white/90'>With 100+ Trusted Doctors</p>
                    </div>
                    
                    <p className='text-white/80 text-sm md:text-base mt-4 max-w-md'>
                        Create an account today to get started with your health journey.
                    </p>

                    <button 
                        onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
                        className='bg-white text-[#5f6FFF] text-sm sm:text-base font-bold px-10 py-4 rounded-full mt-8 hover:scale-105 hover:shadow-lg transition-all duration-300'
                    >
                        Create account
                    </button>
                </div>

                {/* ----- Right Side: Image ----- */}
                <div className='hidden md:block md:w-1/2 lg:w-[400px] relative'>
                    <img 
                        className='w-full absolute bottom-0 right-0 max-w-md object-cover hover:scale-[1.02] transition-transform duration-500' 
                        src={assets.appointment_img} 
                        alt="Appointment" 
                    />
                </div>
            </div>
        </div>
    )
}

export default Banner