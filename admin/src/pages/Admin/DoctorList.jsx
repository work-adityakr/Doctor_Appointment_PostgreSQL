import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { Stethoscope, Mail, Phone } from 'lucide-react' 

const DoctorList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll custom-scrollbar pb-10'>
      
      <h1 className='text-2xl font-bold text-gray-800 flex items-center gap-2 mb-8'>
        <Stethoscope className='text-[#5f6FFF]' /> All Doctors List
      </h1>
      
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {
          doctors.length > 0
            ? doctors.map((item) => (
              <div 
                key={item.id} 
                className='bg-white border border-indigo-100 rounded-2xl overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-2 transition-all duration-500'
              >
                {/* Doctor Image Container */}
                <div className='relative overflow-hidden bg-indigo-50 group-hover:bg-[#5f6FFF] transition-colors duration-500'>
                  <img 
                    className='w-full h-56 object-cover object-top transition-transform duration-500 group-hover:scale-105' 
                    src={item.image} 
                    alt={item.name} 
                  />
                  
                  <div className='absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <p className='text-white text-xs font-light text-center'>Edit Profile</p>
                  </div>
                </div>

                {/* Details Section */}
                <div className='p-5'>
                  <p className='text-gray-900 text-lg font-bold truncate'>{item.name}</p>
                  <p className='text-[#5f6FFF] text-xs font-semibold uppercase tracking-wide mb-3'>{item.speciality}</p>
                  
                  {/* Interactive Availability Switch */}
                  <div className='flex items-center gap-2 text-sm mt-2'>
                    <input 
                      onChange={() => changeAvailability(item.id)} 
                      type='checkbox' 
                      checked={item.available} 
                      className='w-4 h-4 text-[#5f6FFF] bg-gray-100 border-gray-300 rounded focus:ring-[#5f6FFF] cursor-pointer accent-[#5f6FFF]'
                    />
                    <p className={`${item.available ? 'text-green-500 font-medium' : 'text-gray-400'} transition-colors`}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </p>
                  </div>
                </div>
              </div>
            ))
            : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                <p>No doctors found in the database.</p>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default DoctorList