import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
   return (
      <div className='w-11/12 mx-auto my-8 rounded-[2rem] overflow-hidden relative'>

         <div className='bg-gradient-to-r from-[#5E43D6] to-[#5391E7] relative min-h-[500px] flex items-center'>

            {/* Background Image */}
            <img
               className='absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-overlay pointer-events-none'
               src={assets.doctorgp}
               alt=""
            />

            {/* Content Container */}
            <div className='relative z-20 flex flex-col md:flex-row items-center justify-between w-full px-6 py-16 md:px-12 lg:px-20 gap-10 md:gap-0 md:pl-52 md:h-[600px]'>

               {/* Left Side: Text */}
               <div className='flex flex-col w-full md:w-1/2 text-center md:text-left items-center md:items-start space-y-6'>
                  <h1 className='text-3xl md:text-3xl lg:text-5xl xl:text-6xl text-white font-bold leading-tight'>
                     Book Appointment <br /> With Trusted Doctors
                  </h1>

                  <div className='flex flex-col sm:flex-row items-center gap-4 text-white font-light'>
                     <img className='w-24 h-auto rounded-full shadow-sm' src={assets.group_profiles} alt="Patient profiles" />
                     <p className='text-sm md:text-base'>
                        Simply browse through our extensive list of trusted doctors,
                        <br className='hidden sm:block' /> schedule your appointment hassle-free.
                     </p>
                  </div>

                  <a
                     href='#speciality'
                     className='flex items-center gap-3 bg-white px-8 py-3 rounded-full text-[#5E43D6] text-sm font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out'
                  >
                     Book appointment
                     <img className="w-3" src={assets.arrow_icon} alt="" />
                  </a>
               </div>

               {/* Right Side: Doctor Image */}
               <div className='w-full md:w-1/2 flex justify-center md:justify-end relative z-30 mt-8 md:mt-0 md:-mb-16 lg:-mb-24'>
                  <div className='w-64 h-64 md:w-80 md:h-80 lg:w-[26rem] lg:h-[26rem] p-[6px] rounded-full bg-gradient-to-tr from-fuchsia-500 to-cyan-400  overflow-hidden hover:scale-[1.02] transition-transform duration-500'>
                     <img
                        className='w-full h-full rounded-full object-cover bg-indigo-100/50'
                        src={assets.doc13}
                        alt="Trusted Doctor"
                     />
                  </div>
               </div>

            </div>

            <div className='absolute bottom-0 left-0 w-full z-10 leading-none pointer-events-none translate-y-[1px]'>
               <svg className="w-full h-auto" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                  <path 
                     fill="#ffffff" 
                     fillOpacity="1" 
                     d="M0,256L60,245.3C120,235,240,213,360,208C480,203,600,213,720,229.3C840,245,960,267,1080,256C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
                  </path>
               </svg>
            </div>

         </div>
         
      </div>
   )
}

export default Header



