import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { Calendar, User, Clock, X, CheckCircle, Search } from 'lucide-react' 

const AllAppointment = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full p-6'>
      
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-4'>
        <h1 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
          <Calendar className='w-6 h-6 text-[#5f6FFF]' /> All Appointments
        </h1>
        
        {/* Optional: Search/Filter placeholder for future functionality */}
        <div className='relative w-full sm:w-64'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
            <input 
                type="text" 
                placeholder="Search appointments..." 
                className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#5f6FFF] focus:ring-1 focus:ring-[#5f6FFF]'
            />
        </div>
      </div>

      {/* Table Container */}
      <div className='bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden'>
        
        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center gap-x-6 py-4 px-6 bg-[#F9FAFB] border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Table Body */}
        <div className='divide-y divide-gray-100'>
          {
            appointments.map((item, index) => (
              <div 
                key={item.id} 
                className='flex flex-wrap justify-between items-center max-sm:gap-4 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] sm:gap-x-6 py-4 px-6 hover:bg-[#FDFDFD] transition-colors duration-200'
              >
                {/* Index */}
                <p className='max-sm:hidden text-gray-400 font-medium'>{index + 1}</p>
                
                {/* Patient Info */}
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center overflow-hidden border border-gray-200'>
                     <img className='w-full h-full object-cover' src={item.userData?.image} alt={item.userData?.name} />
                  </div>
                  <div>
                    <p className='font-semibold text-gray-800 text-sm'>{item.userData?.name}</p>
                    <p className='text-xs text-gray-500 sm:hidden'>Age: {calculateAge(item.userData?.dob)}</p>
                  </div>
                </div>

                {/* Age (Desktop) */}
                <p className='max-sm:hidden text-sm text-gray-600'>{calculateAge(item.userData?.dob)}</p>

                {/* Date & Time */}
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                    <Clock className='w-4 h-4 text-gray-400' />
                    <p>
                        <span className='font-medium text-gray-700'>{slotDateFormat(item.slotDate)}</span>, {item.slotTime}
                    </p>
                </div>

                {/* Doctor Info */}
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center overflow-hidden border border-gray-200'>
                     <img className='w-full h-full object-cover' src={item.docData?.image} alt={item.docData?.name} />
                  </div>
                  <div className='truncate'>
                    <p className='font-medium text-gray-800 text-sm truncate'>{item.docData?.name}</p>
                    <p className='text-xs text-gray-500 truncate'>{item.docData?.speciality}</p>
                  </div>
                </div>

                {/* Fees */}
                <p className='text-sm font-semibold text-gray-700'>
                    {currency}{item.amount}
                </p>

                {/* Action / Status */}
                <div className='flex items-center'>
                    {item.cancelled ? (
                        <span className='inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100'>
                           <X className='w-3 h-3' /> Cancelled
                        </span>
                    ) : item.isCompleted ? (
                        <span className='inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-100'>
                           <CheckCircle className='w-3 h-3' /> Completed
                        </span>
                    ) : (
                        <button 
                            onClick={() => cancelAppointment(item.id)} 
                            className='group flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all duration-300'
                            title='Cancel Appointment'
                        >
                            <X className='w-4 h-4 text-gray-400 group-hover:text-red-500' />
                        </button>
                    )}
                </div>

              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default AllAppointment