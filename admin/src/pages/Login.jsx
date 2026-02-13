import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'
import { Mail, Lock, Stethoscope, ShieldCheck, ChevronRight } from 'lucide-react'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });

        if (data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token);
        } else {
          toast.error(data.message)
        }

      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password });

        if (data.success) {
          localStorage.setItem('dtoken', data.token)
          setDToken(data.token);
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      
      <div className='bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 transition-all duration-300'>
        
        {/* Header Icon & Title */}
        <div className='flex flex-col items-center mb-8'>
            <div className={`p-4 rounded-full mb-4 ${state === 'Admin' ? 'bg-indigo-50' : 'bg-green-50'}`}>
                {state === 'Admin' 
                    ? <ShieldCheck className={`w-8 h-8 ${state === 'Admin' ? 'text-[#5f6FFF]' : 'text-green-600'}`} />
                    : <Stethoscope className={`w-8 h-8 ${state === 'Admin' ? 'text-[#5f6FFF]' : 'text-green-600'}`} />
                }
            </div>
            <h2 className='text-3xl font-bold text-gray-800'>
                <span className={`${state === 'Admin' ? 'text-[#5f6FFF]' : 'text-green-600'}`}>{state}</span> Login
            </h2>
            <p className='text-gray-500 text-sm mt-2'>
                {state === 'Admin' ? 'Welcome back, Administrator' : 'Welcome back, Doctor'}
            </p>
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-5'>
          
          {/* Email Input */}
          <div className='relative'>
             <div className='absolute top-3.5 left-3 text-gray-400'>
                <Mail className='w-5 h-5' />
             </div>
             <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent transition-all text-sm' 
                type='email' 
                placeholder='Email Address'
                required 
             />
          </div>

          {/* Password Input */}
          <div className='relative'>
             <div className='absolute top-3.5 left-3 text-gray-400'>
                <Lock className='w-5 h-5' />
             </div>
             <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent transition-all text-sm' 
                type='password' 
                placeholder='Password'
                required 
             />
          </div>

          {/* Submit Button */}
          <button className={`w-full text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mt-2 ${state === 'Admin' ? 'bg-[#5f6FFF] hover:bg-[#4e5dd1]' : 'bg-green-600 hover:bg-green-700'}`}>
            Login
          </button>

          {/* Role Toggle */}
          <div className='mt-4 text-center'>
            {
              state === 'Admin'
                ? <p className='text-sm text-gray-600'>
                    Doctor Login? <span className='text-[#5f6FFF] font-semibold underline cursor-pointer hover:text-[#4e5dd1]' onClick={() => setState('Doctor')}>Click here</span>
                  </p>
                : <p className='text-sm text-gray-600'>
                    Admin Login? <span className='text-[#5f6FFF] font-semibold underline cursor-pointer hover:text-[#4e5dd1]' onClick={() => setState('Admin')}>Click here</span>
                  </p>
            }
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login