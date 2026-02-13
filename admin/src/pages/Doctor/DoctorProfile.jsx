import React, { useContext, useState, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Edit3, Save, MapPin, Banknote, Clock, Info, CheckCircle, XCircle } from 'lucide-react'

const DoctorProfile = () => {
  const { dtoken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dtoken } })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        await getProfileData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update profile.";
      toast.error(errorMessage)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dtoken) {
      getProfileData()
    }
  }, [dtoken])

  return profileData && (
    <div className='w-full max-w-5xl mx-auto m-5 p-2'>
      
      {/* ================= HEADER CARD ================= */}
      <div className='bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden mb-6 relative'>
        {/* Decorative Background */}
        <div className='h-32 bg-gradient-to-r from-[#5f6FFF] to-[#806bf9]'></div>
        
        <div className='px-6 sm:px-10 pb-8 flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16'>
            {/* Doctor Image */}
            <div className='w-40 h-40 rounded-3xl border-4 border-white shadow-md overflow-hidden bg-white'>
                <img 
                    className='w-full h-full object-cover' 
                    src={profileData.image} 
                    alt={profileData.name} 
                />
            </div>

            {/* Name & Basic Info */}
            <div className='flex-1 text-center md:text-left mb-2'>
                <h1 className='text-3xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-2'>
                    {profileData.name}
                    {/* Availability Badge (View Mode Only) */}
                    {!isEdit && (
                         <span className={`text-xs px-3 py-1 rounded-full border ${profileData.available ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-500 border-red-200 bg-red-50'}`}>
                            {profileData.available ? 'Available' : 'Unavailable'}
                         </span>
                    )}
                </h1>
                
                <div className='flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2 text-gray-600'>
                    <span className='font-medium'>{profileData.degree} - {profileData.speciality}</span>
                    <span className='w-1 h-1 bg-gray-400 rounded-full hidden sm:block'></span>
                    <span className='flex items-center gap-1 text-sm bg-indigo-50 text-[#5f6FFF] px-3 py-0.5 rounded-full border border-indigo-100'>
                        <Clock className='w-3 h-3' /> {profileData.experience}
                    </span>
                </div>
            </div>

            {/* Action Button */}
            <div className='mb-4'>
                {isEdit ? (
                    <button 
                        onClick={updateProfile} 
                        className='flex items-center gap-2 bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-medium hover:bg-[#4e5bd4] shadow-lg transition-all transform hover:-translate-y-1'
                    >
                        <Save className='w-4 h-4' /> Save Changes
                    </button>
                ) : (
                    <button 
                        onClick={() => setIsEdit(true)} 
                        className='flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 hover:border-[#5f6FFF] hover:text-[#5f6FFF] transition-all'
                    >
                        <Edit3 className='w-4 h-4' /> Edit Profile
                    </button>
                )}
            </div>
        </div>
      </div>

      {/* ================= DETAILS GRID ================= */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        
        {/* ----- LEFT: About Section ----- */}
        <div className='lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
            <h2 className='text-lg font-bold text-gray-800 mb-4 flex items-center gap-2'>
                <Info className='w-5 h-5 text-[#5f6FFF]' /> About
            </h2>
            <p className='text-gray-600 leading-relaxed text-sm md:text-base'>
                {profileData.about}
            </p>
        </div>

        {/* ----- RIGHT: Settings/Details Section ----- */}
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6'>
            
            <h2 className='text-lg font-bold text-gray-800 mb-2 border-b pb-3'>Profile Details</h2>

            {/* Appointment Fee */}
            <div>
                <label className='text-sm text-gray-500 font-medium flex items-center gap-2 mb-2'>
                    <Banknote className='w-4 h-4 text-[#5f6FFF]' /> Appointment Fee
                </label>
                {isEdit ? (
                    <div className='flex items-center'>
                        <span className='bg-gray-100 border border-r-0 border-gray-300 rounded-l px-3 py-2 text-gray-500'>{currency}</span>
                        <input
                            className='w-full bg-gray-50 border border-gray-300 rounded-r px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent transition-all'
                            type='number'
                            onChange={(e) => setProfileData(prev => ({ ...prev, fees: Number(e.target.value) }))}
                            value={profileData.fees}
                        />
                    </div>
                ) : (
                    <p className='text-xl font-bold text-gray-800 pl-1'>{currency} {profileData.fees}</p>
                )}
            </div>

            {/* Address */}
            <div>
                <label className='text-sm text-gray-500 font-medium flex items-center gap-2 mb-2'>
                    <MapPin className='w-4 h-4 text-[#5f6FFF]' /> Clinic Address
                </label>
                {isEdit ? (
                    <div className='flex flex-col gap-2'>
                        <input 
                            className='w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] transition-all text-sm' 
                            type="text" 
                            onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                            value={profileData.address.line1} 
                            placeholder="Address Line 1"
                        />
                        <input 
                            className='w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] transition-all text-sm' 
                            type="text" 
                            onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                            value={profileData.address.line2} 
                            placeholder="Address Line 2"
                        />
                    </div>
                ) : (
                    <div className='pl-1'>
                        <p className='text-gray-700 font-medium text-sm'>{profileData.address.line1}</p>
                        <p className='text-gray-700 font-medium text-sm'>{profileData.address.line2}</p>
                    </div>
                )}
            </div>

            <div className='flex items-center justify-between pt-4 border-t'>
                <span className='text-gray-700 font-medium'>Availability Status</span>
                {isEdit ? (
                    <label className='relative inline-flex items-center cursor-pointer'>
                        <input 
                            type="checkbox" 
                            className="sr-only peer"
                            onChange={() => setProfileData(prev => ({ ...prev, available: !prev.available }))}
                            checked={profileData.available}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5f6FFF]"></div>
                    </label>
                ) : (
                    <div className='flex items-center gap-1'>
                        {profileData.available 
                            ? <CheckCircle className='w-5 h-5 text-green-500' /> 
                            : <XCircle className='w-5 h-5 text-red-500' />
                        }
                    </div>
                )}
            </div>

        </div>
      </div>
    </div>
  )
}

export default DoctorProfile