import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { Calendar, User, Clock, Check, X, CreditCard, Search } from 'lucide-react'

const DoctorAppointment = () => {

    const { dtoken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

    useEffect(() => {
        if (dtoken) {
            getAppointments()
        }
    }, [dtoken])

    return (
        <div className='w-full p-6'>

            {/* Header */}
            <h1 className='text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
                <Calendar className='w-6 h-6 text-[#5f6FFF]' /> All Appointments
            </h1>

            {/* Table Container */}
            <div className='bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden'>

                {/* Table Header */}
                <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_1fr_3fr_1fr_1fr] items-center gap-4 py-4 px-6 bg-[#F9FAFB] border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                {/* Table Body */}
                <div className='divide-y divide-gray-100'>
                    {
                        appointments.slice().reverse().map((item, index) => (
                            <div
                                className='flex flex-wrap justify-between items-center max-sm:gap-4 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_1fr_3fr_1fr_1fr] gap-4 py-4 px-6 hover:bg-[#FDFDFD] transition-colors duration-200'
                                key={index}
                            >
                                {/* Index */}
                                <p className='max-sm:hidden text-gray-400 font-medium'>{index + 1}</p>

                                {/* Patient Info */}
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center overflow-hidden border border-gray-200 flex-shrink-0'>
                                        <img className='w-full h-full object-cover' src={item.userData.image} alt={item.userData.name} />
                                    </div>
                                    <div>
                                        <p className='font-semibold text-gray-800 text-sm'>{item.userData.name}</p>
                                        <p className='text-xs text-gray-500 sm:hidden'>Age: {calculateAge(item.userData.dob)}</p>
                                    </div>
                                </div>

                                {/* Payment Status */}
                                <div>
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.payment ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                        <CreditCard className='w-3 h-3' />
                                        {item.payment ? 'Online' : 'Cash'}
                                    </span>
                                </div>

                                {/* Age (Desktop) */}
                                <p className='max-sm:hidden text-sm text-gray-600'>{calculateAge(item.userData.dob)}</p>

                                {/* Date & Time */}
                                <div className='flex items-center gap-2 text-sm text-gray-600'>
                                    <Clock className='w-4 h-4 text-gray-400' />
                                    <p>
                                        <span className='font-medium text-gray-700'>{slotDateFormat(item.slotDate)}</span>, {item.slotTime}
                                    </p>
                                </div>

                                {/* Fees */}
                                <p className='text-sm font-semibold text-gray-700'>
                                    {currency}{item.amount}
                                </p>

                                {/* Actions / Status */}
                                <div className='flex items-center'>
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
                                                        className='group flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-all duration-300'
                                                        title='Cancel Appointment'
                                                    >
                                                        <X className='w-4 h-4 text-gray-400 group-hover:text-red-500' />
                                                    </button>

                                                    {/* Complete Button */}
                                                    <button
                                                        onClick={() => completeAppointment(item.id)}
                                                        className='group flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 hover:bg-green-50 hover:border-green-200 transition-all duration-300'
                                                        title='Complete Appointment'
                                                    >
                                                        <Check className='w-4 h-4 text-gray-400 group-hover:text-green-500' />
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

export default DoctorAppointment