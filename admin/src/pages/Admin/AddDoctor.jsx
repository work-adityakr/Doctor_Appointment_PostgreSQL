import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Upload, User, Mail, Lock, Stethoscope, GraduationCap, MapPin, DollarSign, FileText, CheckCircle, Loader2 } from 'lucide-react'

const AddDoctor = () => {

    const { backendUrl, aToken } = useContext(AdminContext)

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [expreience, setExpreience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [addres1, setAddress1] = useState('')
    const [addres2, setAddress2] = useState('')
    
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true); 

        try {
            if (!docImg) {
                setLoading(false);
                return toast.error('Image Not Selected')
            }

            const formData = new FormData()

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', expreience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: addres1, line2: addres2 }))

            const { data } = await axios.post(
                backendUrl + '/api/admin/add-doctor',
                formData,
                { headers: { aToken } }
            );

            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        } finally {
            setLoading(false); 
        }
    }

    return (
        <div className='w-full max-w-5xl m-5'>
            
            <h1 className='mb-6 text-2xl font-bold text-gray-800 flex items-center gap-2'>
                <User className='text-[#5f6FFF]' /> Add New Doctor
            </h1>

            <form onSubmit={onSubmitHandler} className='bg-white px-8 py-8 border border-gray-100 rounded-[2rem] shadow-xl w-full max-h-[80vh] overflow-y-auto custom-scrollbar'>
                
                <div className='flex items-center gap-6 mb-8 p-4 bg-indigo-50 rounded-2xl border border-dashed border-indigo-200'>
                    <label htmlFor='doc-img' className='cursor-pointer group relative'>
                        <div className={`w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105 ${!docImg ? 'bg-indigo-100 flex items-center justify-center' : ''}`}>
                            <img 
                                className='w-full h-full object-cover' 
                                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
                                alt="" 
                            />
                            {!docImg && <Upload className='w-8 h-8 text-indigo-400' />}
                        </div>
                        <div className='absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                            <p className='text-white text-xs font-semibold'>Change</p>
                        </div>
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type='file' id='doc-img' hidden />
                    <div>
                        <p className='text-gray-700 font-medium'>Upload Doctor's Photo</p>
                        <p className='text-gray-500 text-sm'>Allowed *.jpeg, *.jpg, *.png, *.webp</p>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    
                    <div className='w-full lg:flex-1 flex flex-col gap-5'>
                        
                        <div className='group'>
                            <p className='mb-1 font-medium text-gray-700'>Doctor Name</p>
                            <div className='flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-[#5f6FFF] transition-all'>
                                <User className='w-5 h-5 text-gray-400 mr-2' />
                                <input onChange={(e) => setName(e.target.value)} value={name} className='bg-transparent outline-none w-full text-gray-800' type='text' placeholder='e.g. Dr. Richard James' required />
                            </div>
                        </div>

                        <div className='group'>
                            <p className='mb-1 font-medium text-gray-700'>Doctor Email</p>
                            <div className='flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-[#5f6FFF] transition-all'>
                                <Mail className='w-5 h-5 text-gray-400 mr-2' />
                                <input onChange={(e) => setEmail(e.target.value)} value={email} className='bg-transparent outline-none w-full text-gray-800' type='email' placeholder='doctor@example.com' required />
                            </div>
                        </div>

                        <div className='group'>
                            <p className='mb-1 font-medium text-gray-700'>Password</p>
                            <div className='flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-[#5f6FFF] transition-all'>
                                <Lock className='w-5 h-5 text-gray-400 mr-2' />
                                <input onChange={(e) => setPassword(e.target.value)} value={password} className='bg-transparent outline-none w-full text-gray-800' type='password' placeholder='Set a strong password' required />
                            </div>
                        </div>

                        <div className='group'>
                            <p className='mb-1 font-medium text-gray-700'>Experience</p>
                            <div className='flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-[#5f6FFF] transition-all'>
                                <CheckCircle className='w-5 h-5 text-gray-400 mr-2' />
                                <select onChange={(e) => setExpreience(e.target.value)} value={expreience} className='bg-transparent outline-none w-full text-gray-800 cursor-pointer'>
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i} value={`${i + 1} Year`}>{i + 1} Year</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className='group'>
                            <p className='mb-1 font-medium text-gray-700'>Fees</p>
                            <div className='flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-[#5f6FFF] transition-all'>
                                <DollarSign className='w-5 h-5 text-gray-400 mr-2' />
                                <input onChange={(e) => setFees(e.target.value)} value={fees} className='bg-transparent outline-none w-full text-gray-800' type='number' placeholder='Consultation fees' required />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className='w-full lg:flex-1 flex flex-col gap-5'>
                        
                        <div className='group'>
                            <p className='mb-1 font-medium text-gray-700'>Speciality</p>
                            <div className='flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-[#5f6FFF] transition-all'>
                                <Stethoscope className='w-5 h-5 text-gray-400 mr-2' />
                                <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='bg-transparent outline-none w-full text-gray-800 cursor-pointer'>
                                    <option value="General physician">General physician</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Pediatricians">Pediatricians</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                </select>
                            </div>
                        </div>

                        <div className='group'>
                            <p className='mb-1 font-medium text-gray-700'>Education</p>
                            <div className='flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-[#5f6FFF] transition-all'>
                                <GraduationCap className='w-5 h-5 text-gray-400 mr-2' />
                                <input onChange={(e) => setDegree(e.target.value)} value={degree} className='bg-transparent outline-none w-full text-gray-800' type="text" placeholder='MBBS, MD, etc.' required />
                            </div>
                        </div>

                        <div className='group'>
                            <p className='mb-1 font-medium text-gray-700'>Address</p>
                            <div className='flex flex-col gap-3'>
                                <div className='flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-[#5f6FFF] transition-all'>
                                    <MapPin className='w-5 h-5 text-gray-400 mr-2' />
                                    <input onChange={(e) => setAddress1(e.target.value)} value={addres1} className='bg-transparent outline-none w-full text-gray-800' type="text" placeholder='Address Line 1' required />
                                </div>
                                <div className='flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-[#5f6FFF] transition-all'>
                                    <MapPin className='w-5 h-5 text-gray-400 mr-2 opacity-50' />
                                    <input onChange={(e) => setAddress2(e.target.value)} value={addres2} className='bg-transparent outline-none w-full text-gray-800' type="text" placeholder='Address Line 2' required />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='mt-8'>
                    <p className='mb-2 font-medium text-gray-700 flex items-center gap-2'>
                        <FileText className='w-4 h-4 text-gray-500' /> About Doctor
                    </p>
                    <textarea 
                        onChange={(e) => setAbout(e.target.value)} 
                        value={about} 
                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5f6FFF] outline-none transition-all' 
                        placeholder='Write a brief bio about the doctor...' 
                        required 
                        rows={5}
                    ></textarea>
                </div>

                <button 
                    type='submit' 
                    disabled={loading}
                    className='bg-[#5f6FFF] hover:bg-[#4e5dd1] text-white px-10 py-4 mt-8 rounded-full w-full sm:w-auto font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Adding...
                        </>
                    ) : (
                        "Add Doctor"
                    )}
                </button>
            </form>
        </div>
    )
}

export default AddDoctor