import React, { useState } from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  const [view, setView] = useState(false);
  return (
    <div className='flex flex-col items-center gap-6 py-16 text-gray-800 bg-[#f9f9fd]' id='speciality'>

      <h1 className='text-3xl md:text-4xl font-bold text-[#2d2d2d]'>
        We offer Special Services
      </h1>
      <p className='sm:w-1/2 text-center text-sm text-gray-500 leading-relaxed'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
      </p>

      <div className='w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-10 px-4'>
        {

          !view ? (
            specialityData.slice(0, 3).map((item, index) => (
              <Link
                onClick={() => scrollTo(0, 0)}
                key={index}
                to={`/doctors/${item.speciality}`}
                className='group bg-white rounded-[2rem] p-8 transition-all duration-300 hover:bg-gradient-to-br hover:from-[#5E43D6] hover:to-[#5391E7] hover:text-white hover:shadow-2xl shadow-sm border border-gray-100'
              >
                {/* Icon Container */}
                <div className='w-16 h-16 bg-[#f0f3ff] rounded-full flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors'>
                  <img className='w-8 h-8 object-contain' src={item.image} alt={item.speciality} />
                </div>

                {/* Title */}
                <h2 className='text-xl font-bold mb-3'>{item.speciality}</h2>

                <p className='text-xs text-gray-500 leading-6 group-hover:text-gray-100'>
                  Training and qualification levels members and employees of vary widely
                  throughout the world. In some emergency medical and employees services.
                </p>
              </Link>
            ))
          ) : (

            specialityData.map((item, index) => (
              <Link
                onClick={() => scrollTo(0, 0)}
                key={index}
                to={`/doctors/${item.speciality}`}
                className='group bg-white rounded-[2rem] p-8 transition-all duration-300 hover:bg-gradient-to-br hover:from-[#5E43D6] hover:to-[#5391E7] hover:text-white hover:shadow-2xl shadow-sm border border-gray-100'
              >
                {/* Icon Container */}
                <div className='w-16 h-16 bg-[#f0f3ff] rounded-full flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors'>
                  <img className='w-8 h-8 object-contain' src={item.image} alt={item.speciality} />
                </div>

                {/* Title */}
                <h2 className='text-xl font-bold mb-3'>{item.speciality}</h2>

                {/* Description (Placeholder text from your UI) */}
                <p className='text-xs text-gray-500 leading-6 group-hover:text-gray-100'>
                  Training and qualification levels members and employees of vary widely
                  throughout the world. In some emergency medical and employees services.
                </p>
              </Link>
            ))
          )
        }
        
      </div>

      {/* ============ Bottom Button ============ */}
      <button className='mt-10 bg-gradient-to-r from-[#5E43D6] to-[#5391E7] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ' onClick={() => setView((prev)=> !prev)}>
        View All Specialities
      </button>

    </div>
  )
}

export default SpecialityMenu