import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Camera, User, Mail, Phone, MapPin, Calendar, Check, Edit2 } from 'lucide-react'

const MyProfile = () => {

  const { userData, setUserData, backendUrl, token, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData && (
    <div className='max-w-4xl mx-auto mt-10 mb-20 px-4'>
      
      {/* ================= PROFILE CARD ================= */}
      <div className='bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden relative'>
        
        {/* Decorative Background Header */}
        <div className='h-32 bg-gradient-to-r from-[#5f6FFF] to-[#806bf9] relative'></div>

        <div className='px-6 md:px-10 pb-10'>
          
          {/* ----- Profile Image Section (Overlapping Header) ----- */}
          <div className='relative -mt-16 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6'>
            
            <label htmlFor='image' className='relative cursor-pointer group'>
              <div className='w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200'>
                <img 
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isEdit ? 'opacity-70 group-hover:opacity-50' : ''}`} 
                  src={image ? URL.createObjectURL(image) : userData.image} 
                  alt="Profile" 
                />
              </div>
              
              {/* Camera Icon Overlay (Only in Edit Mode) */}
              {isEdit && (
                <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                  <Camera className='w-10 h-10 text-gray-700 opacity-80' />
                </div>
              )}
              
              {/* Upload Overlay Icon (Bottom Right) */}
              {isEdit && (
                <div className='absolute bottom-2 right-2 bg-[#5f6FFF] p-2 rounded-full border-2 border-white shadow-sm'>
                   <img className='w-4 h-4 invert' src={assets.upload_icon} alt="" />
                </div>
              )}
              
              {/* Hidden Input */}
              {isEdit && <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />}
            </label>

            {/* Name Section */}
            <div className='flex-1 text-center md:text-left mb-2'>
              {isEdit ? (
                <input 
                  className='text-3xl font-bold text-gray-800 bg-gray-50 border-b-2 border-[#5f6FFF] focus:outline-none w-full max-w-sm text-center md:text-left px-2 py-1' 
                  type='text' 
                  value={userData.name} 
                  onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                />
              ) : (
                <h1 className='text-3xl font-bold text-gray-800'>{userData.name}</h1>
              )}
            </div>

            {/* Action Buttons (Desktop Position) */}
            <div className='hidden md:block mb-4'>
               {isEdit ? (
                  <button 
                    onClick={updateUserProfileData}
                    className='flex items-center gap-2 bg-[#5f6FFF] hover:bg-[#4e5bd4] text-white px-8 py-3 rounded-full font-medium transition-all shadow-md hover:shadow-lg'
                  >
                    <Check className='w-4 h-4' /> Save Changes
                  </button>
               ) : (
                  <button 
                    onClick={() => setIsEdit(true)}
                    className='flex items-center gap-2 border border-gray-300 hover:border-[#5f6FFF] hover:text-[#5f6FFF] px-8 py-3 rounded-full font-medium transition-all text-gray-600'
                  >
                    <Edit2 className='w-4 h-4' /> Edit Profile
                  </button>
               )}
            </div>
          </div>

          <hr className='border-gray-200 mb-8' />

          {/* ================= DETAILS GRID ================= */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>

            {/* ----- Left Column: Contact Information ----- */}
            <div className='flex flex-col gap-6'>
                <h2 className='text-gray-500 font-semibold uppercase tracking-wider text-sm border-b pb-2 flex items-center gap-2'>
                    <Mail className='w-4 h-4' /> Contact Information
                </h2>
                
                <div className='space-y-4'>
                    <div className='grid grid-cols-[100px_1fr] items-center gap-2'>
                        <span className='font-medium text-gray-700'>Email:</span>
                        <span className='text-blue-500 truncate'>{userData.email}</span>
                    </div>

                    <div className='grid grid-cols-[100px_1fr] items-center gap-2'>
                        <span className='font-medium text-gray-700'>Phone:</span>
                        {isEdit ? (
                            <input 
                                className='bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-[#5f6FFF] outline-none w-full max-w-xs' 
                                type='text' 
                                value={userData.phone} 
                                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                            />
                        ) : (
                            <span className='text-gray-600'>{userData.phone}</span>
                        )}
                    </div>

                    <div className='grid grid-cols-[100px_1fr] items-start gap-2'>
                        <span className='font-medium text-gray-700 mt-1'>Address:</span>
                        {isEdit ? (
                            <div className='space-y-2 w-full max-w-xs'>
                                <input 
                                    className='bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-[#5f6FFF] outline-none w-full'
                                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                    value={userData.address.line1} 
                                    type="text" 
                                    placeholder="Line 1"
                                />
                                <input 
                                    className='bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-[#5f6FFF] outline-none w-full'
                                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                    value={userData.address.line2} 
                                    type="text" 
                                    placeholder="Line 2"
                                />
                            </div>
                        ) : (
                            <span className='text-gray-600 leading-relaxed'>
                                {userData.address.line1}<br />
                                {userData.address.line2}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* ----- Right Column: Basic Information ----- */}
            <div className='flex flex-col gap-6'>
                <h2 className='text-gray-500 font-semibold uppercase tracking-wider text-sm border-b pb-2 flex items-center gap-2'>
                    <User className='w-4 h-4' /> Basic Information
                </h2>
                
                <div className='space-y-4'>
                    <div className='grid grid-cols-[100px_1fr] items-center gap-2'>
                        <span className='font-medium text-gray-700'>Gender:</span>
                        {isEdit ? (
                            <select 
                                className='bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-[#5f6FFF] outline-none w-32 cursor-pointer' 
                                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                value={userData.gender}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        ) : (
                            <span className='text-gray-600'>{userData.gender}</span>
                        )}
                    </div>

                    <div className='grid grid-cols-[100px_1fr] items-center gap-2'>
                        <span className='font-medium text-gray-700'>Birthday:</span>
                        {isEdit ? (
                            <input 
                                className='bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-[#5f6FFF] outline-none w-40 cursor-pointer' 
                                type="date" 
                                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                value={userData.dob} 
                            />
                        ) : (
                            <span className='text-gray-600'>{userData.dob}</span>
                        )}
                    </div>
                </div>
            </div>

          </div>

          {/* Action Button (Mobile Position) */}
          <div className='md:hidden mt-10 flex justify-center'>
               {isEdit ? (
                  <button 
                    onClick={updateUserProfileData}
                    className='bg-[#5f6FFF] text-white px-10 py-3 rounded-full font-medium w-full shadow-md'
                  >
                    Save Changes
                  </button>
               ) : (
                  <button 
                    onClick={() => setIsEdit(true)}
                    className='border border-gray-300 text-gray-600 px-10 py-3 rounded-full font-medium w-full hover:bg-gray-50'
                  >
                    Edit Profile
                  </button>
               )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default MyProfile