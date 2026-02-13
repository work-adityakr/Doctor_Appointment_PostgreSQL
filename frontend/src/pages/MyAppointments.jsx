import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, MapPin, CreditCard } from 'lucide-react' 

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getuserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointment.reverse())
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getuserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            getuserAppointments()
            navigate('/my-appointment')
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      console.log(error);
      toast.error('Payment initialization failed')
    }
  }

  useEffect(() => {
    if (token) {
      getuserAppointments()
    }
  }, [token])

  return (
    <div className='w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10 font-sans'>
      
      {/* Header */}
      <h1 className='text-3xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200'>
        My Appointments
      </h1>

      <div className='flex flex-col gap-6'>
        {
          appointments.map((item) => (
            <div 
              key={item.id} 
              className='flex flex-col md:flex-row gap-6 bg-white border border-gray-100 rounded-[1.5rem] p-6 shadow-sm hover:shadow-lg transition-all duration-300'
            >
              
              {/* Doctor Image */}
              <div className='w-full md:w-48 h-48 flex-shrink-0'>
                <img 
                  className='w-full h-full rounded-2xl bg-[#EAEFFF] object-cover' 
                  src={item.docData.image} 
                  alt={item.docData.name} 
                />
              </div>

              {/* Appointment Details */}
              <div className='flex-1 flex flex-col justify-center gap-3'>
                <div>
                  <h2 className='text-xl md:text-2xl font-bold text-gray-800'>{item.docData.name}</h2>
                  <p className='text-gray-600 font-medium'>{item.docData.speciality}</p>
                </div>

                <div className='flex flex-col gap-2 mt-2'>
                  <div className='flex items-start gap-2 text-sm text-gray-600'>
                    <MapPin className='w-4 h-4 mt-1 text-[#5f6FFF]' />
                    <div>
                      <p>{item.docData.address.line1}</p>
                      <p>{item.docData.address.line2}</p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2 text-sm text-gray-600 mt-2'>
                    <div className='flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full text-indigo-700 font-medium'>
                      <Calendar className='w-4 h-4' /> 
                      {slotDateFormat(item.slotDate)}
                    </div>
                    <div className='flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full text-indigo-700 font-medium'>
                      <Clock className='w-4 h-4' /> 
                      {item.slotTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Column */}
              <div className='flex flex-col justify-center items-end gap-3 min-w-[200px]'>
                
                {/* Paid Badge */}
                { !item.cancelled && item.payment && !item.isCompleted && (
                   <button className='flex items-center justify-center gap-2 sm:min-w-40 py-2.5 px-6 border rounded-full bg-green-50 text-green-600 font-medium cursor-default'>
                     <CreditCard className="w-4 h-4"/> Paid
                   </button>
                )}

                {/* Pay Online Button */}
                { !item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => appointmentRazorpay(item.id)} 
                    className='sm:min-w-40 py-2.5 px-8 rounded-full text-white font-medium bg-[#5f6FFF] hover:bg-[#4e5bd4] hover:shadow-md transition-all duration-300'
                  >
                    Pay Online
                  </button>
                )}

                {/* Cancel Button */}
                { !item.cancelled && !item.isCompleted && (
                  <button 
                    onClick={() => cancelAppointment(item.id)} 
                    className='sm:min-w-40 py-2.5 px-8 border border-gray-300 rounded-full text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-500 transition-all duration-300 font-medium'
                  >
                    Cancel
                  </button>
                )}

                {/* Cancelled Status */}
                { item.cancelled && !item.isCompleted && (
                  <button className='sm:min-w-40 py-2.5 border border-red-500 bg-red-50 rounded-full text-red-600 font-medium cursor-default'>
                    Cancelled
                  </button>
                )}

                {/* Completed Status */}
                { item.isCompleted && (
                  <button className='sm:min-w-40 py-2.5 border border-[#10b981] text-[#10b981] rounded-full font-medium cursor-default'>
                    Completed
                  </button>
                )}

              </div>
            </div>
          ))
        }
        
        {appointments.length === 0 && (
           <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-lg">You have no appointments yet.</p>
           </div>
        )}
      </div>
    </div>
  )
}

export default MyAppointments