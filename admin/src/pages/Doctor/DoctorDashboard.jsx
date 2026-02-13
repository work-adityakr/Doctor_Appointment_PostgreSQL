import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { Banknote, Calendar, Users, List, Check, X, Clock } from 'lucide-react'

const DoctorDashboard = () => {

  const { dtoken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dtoken) {
      getDashData()
    }
  }, [dtoken])

  return dashData && (
    <div className='w-full p-6'>
      
      <h1 className='text-2xl font-bold text-gray-800 mb-8'>Doctor Dashboard</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
        
        {/* Earnings Card */}
        <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <div className='p-4 bg-indigo-50 rounded-full'>
            <Banknote className='w-8 h-8 text-[#5f6FFF]' />
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-800'>{currency} {dashData.earning}</p>
            <p className='text-gray-500 font-medium text-sm'>Total Earnings</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <div className='p-4 bg-blue-50 rounded-full'>
            <Calendar className='w-8 h-8 text-blue-600' />
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-800'>{dashData.appointments}</p>
            <p className='text-gray-500 font-medium text-sm'>Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <div className='p-4 bg-green-50 rounded-full'>
            <Users className='w-8 h-8 text-green-600' />
          </div>
          <div>
            <p className='text-3xl font-bold text-gray-800'>{dashData.patients}</p>
            <p className='text-gray-500 font-medium text-sm'>Unique Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
        
        {/* Header */}
        <div className='flex items-center gap-3 px-6 py-5 border-b border-gray-100 bg-[#F9FAFB]'>
          <List className='w-5 h-5 text-[#5f6FFF]' />
          <p className='font-bold text-gray-700 text-lg'>Latest Bookings</p>
        </div>

        {/* List */}
        <div className='divide-y divide-gray-100'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div className='flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition-colors duration-200' key={index}>
                
                {/* Patient Avatar */}
                <div className='w-12 h-12 rounded-full overflow-hidden border border-gray-200 flex-shrink-0'>
                   <img className='w-full h-full object-cover' src={item.userData.image} alt={item.userData.name} />
                </div>
                
                {/* Details */}
                <div className='flex-1 min-w-0'>
                  <p className='text-gray-800 font-semibold truncate text-base'>
                    {item.userData.name}
                  </p>
                  <div className='flex items-center gap-1 text-gray-500 text-sm mt-0.5'>
                     <Clock className='w-3 h-3' />
                     <p>{slotDateFormat(item.slotDate)}</p>
                  </div>
                </div>

                {/* Actions / Status */}
                <div className='flex-shrink-0'>
                {
                  item.cancelled
                    ? <span className='inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100'>
                        Cancelled
                      </span>
                    : item.isCompleted 
                      ? <span className='inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-100'>
                          Completed
                        </span>
                      : <div className='flex items-center gap-2'>
                          {/* Cancel Button */}
                          <button 
                             onClick={() => cancelAppointment(item.id)}
                             className='group flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all duration-300'
                             title='Cancel Appointment'
                          >
                             <X className='w-5 h-5 text-gray-400 group-hover:text-red-500' />
                          </button>

                          {/* Complete Button */}
                          <button 
                             onClick={() => completeAppointment(item.id)}
                             className='group flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 hover:bg-green-50 hover:border-green-200 transition-all duration-300'
                             title='Complete Appointment'
                          >
                             <Check className='w-5 h-5 text-gray-400 group-hover:text-green-500' />
                          </button>
                        </div>
                }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard