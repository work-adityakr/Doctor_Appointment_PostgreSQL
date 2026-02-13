import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    if (doctors.length > 0) {
      const foundDoc = doctors.find(doc => doc.id === docId);
      setDocInfo(foundDoc);
    }
  };

  const getAvailableSlots = () => {
    if (!docInfo) return;
    
    setDocSlots([]);
    let today = new Date();
    const allTimeSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let startTime = new Date(currentDate);
      startTime.setHours(10, 0, 0, 0);

      if (i === 0) {
        let now = new Date();
        if (now.getHours() > 9) {
          const minutes = now.getMinutes();
          if (minutes < 30) {
            now.setMinutes(30, 0, 0);
          } else {
            now.setHours(now.getHours() + 1, 0, 0, 0);
          }
          if (now > startTime) {
            startTime = now;
          }
        }
      }

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      let timeSlotsForDay = [];
      let currentTime = new Date(startTime);

      while (currentTime < endTime) {
        let formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        const bookedTimesForDate = docInfo.slots_booked?.[slotDate] || [];
        const isSlotAvailable = !bookedTimesForDate.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlotsForDay.push({
            datetime: new Date(currentTime),
            time: formattedTime
          });
        }
        currentTime.setMinutes(currentTime.getMinutes() + 30);
      }
      allTimeSlots.push(timeSlotsForDay); // Push even if empty to keep index alignment
    }
    setDocSlots(allTimeSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to Book appointment');
      navigate('/login');
      return;
    }

    if (!slotTime) {
      toast.error("Please select a time slot.");
      return;
    }

    try {
      const selectedSlot = docSlots[slotIndex].find(slot => slot.time === slotTime);
      if (!selectedSlot) {
        toast.error("Selected slot is not valid.");
        return;
      }

      const date = selectedSlot.datetime;
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

      const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, { docId, slotDate, slotTime }, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        await getDoctorsData();
        navigate('/my-appointment');
        scrollTo(0, 0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "An error occurred during booking.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return docInfo && (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8'>
      
      {/* ================= DOCTOR DETAILS CARD ================= */}
      <div className='flex flex-col md:flex-row gap-8 bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 md:p-8 animate-fade-in-up'>
        
        {/* Left: Doctor Image */}
        <div className='w-full md:w-80 h-auto flex-shrink-0'>
          <div className='w-full h-80 rounded-2xl overflow-hidden bg-[#EAEFFF] relative group'>
            <img 
              className='w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105' 
              src={docInfo.image} 
              alt={docInfo.name} 
            />
          </div>
        </div>

        <div className='flex-1 flex flex-col justify-center'>

          <div className='flex items-center gap-3 mb-2'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>{docInfo.name}</h2>
            <img className='w-6 h-6' src={assets.verified_icon} alt="Verified" />
          </div>

          {/* Degree & Speciality */}
          <div className='flex flex-wrap items-center gap-3 text-gray-600 mb-6'>
            <span className='font-medium text-lg'>{docInfo.degree} - {docInfo.speciality}</span>
            <span className='px-3 py-1 text-xs font-semibold text-gray-700 border border-gray-300 rounded-full bg-gray-50'>
              {docInfo.experience} Experience
            </span>
          </div>

          {/* About Section */}
          <div className='mb-6'>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2'>
              About <img className='w-4 h-4 opacity-60' src={assets.info_icon} alt="Info" />
            </h3>
            <p className='text-gray-500 text-sm leading-relaxed max-w-2xl'>
              {docInfo.about}
            </p>
          </div>

          {/* Fee */}
          <div className='mt-auto'>
            <p className='text-gray-600 font-medium'>
              Appointment fee: <span className='text-gray-900 text-xl font-bold ml-2'>{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ================= BOOKING SECTION ================= */}
      <div className='mt-10 bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 md:p-10'>
        <h3 className='text-2xl font-bold text-gray-800 mb-6'>Book an Appointment</h3>
        
        <div className='mb-8'>
          <p className='text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide'>Select Date</p>
          <div className='flex gap-4 items-center w-full overflow-x-auto pb-4 hide-scrollbar'>
            {
              docSlots.length > 0 && docSlots.map((item, index) => (
                item.length > 0 && ( // Only render if the day has slots
                  <div 
                    key={index} 
                    onClick={() => { setSlotIndex(index); setSlotTime(''); }} 
                    className={`
                      flex flex-col items-center justify-center min-w-[4.5rem] h-20 rounded-2xl cursor-pointer transition-all duration-300 border
                      ${slotIndex === index 
                        ? 'bg-[#5f6FFF] text-white shadow-lg scale-105 border-[#5f6FFF]' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#5f6FFF] hover:bg-gray-50'
                      }
                    `}
                  >
                    <p className='text-xs font-medium opacity-80 mb-1'>
                      {daysOfWeek[item[0].datetime.getDay()]}
                    </p>
                    <p className='text-xl font-bold'>
                      {item[0].datetime.getDate()}
                    </p>
                  </div>
                )
              ))
            }
          </div>
        </div>

        {/* Time Selection (Grid Layout) */}
        <div className='mb-10'>
          <p className='text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide'>Select Time</p>
          
          {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].length > 0 ? (
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4'>
              {docSlots[slotIndex].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`
                    px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border
                    ${item.time === slotTime 
                      ? 'bg-[#5f6FFF] text-white border-[#5f6FFF] shadow-md' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#5f6FFF] hover:text-[#5f6FFF]'
                    }
                  `}
                >
                  {item.time.toLowerCase()}
                </button>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200'>
              <p>No available slots for this date.</p>
            </div>
          )}
        </div>

        {/* Book Button */}
        <div className='flex justify-end'>
          <button 
            onClick={bookAppointment}
            disabled={!slotTime}
            className={`
              px-10 py-4 rounded-full text-white font-bold text-lg shadow-xl transition-all duration-300
              ${!slotTime 
                ? 'bg-gray-300 cursor-not-allowed shadow-none' 
                : 'bg-[#5f6FFF] hover:bg-[#4e5dd1] hover:-translate-y-1 hover:shadow-2xl'
              }
            `}
          >
            Confirm Booking
          </button>
        </div>
      </div>

      {/* ================= RELATED DOCTORS ================= */}
      <div className='mt-16'>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>

    </div>
  )
}

export default Appointment;