import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Loader2, LogIn, UserPlus } from 'lucide-react';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [mode, setMode] = useState('Sign Up');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const url = mode === 'Sign Up'
      ? `${backendUrl}/api/user/register`
      : `${backendUrl}/api/user/login`;

    const payload = mode === 'Sign Up'
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const { data } = await axios.post(url, payload);
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        toast.success(`Welcome ${mode === 'Sign Up' ? 'to Prescripto!' : 'Back!'}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-10'>
      
      <div className='bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 transition-all duration-300'>
        
        {/* Header */}
        <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-4'>
                {mode === 'Sign Up' 
                    ? <UserPlus className='w-8 h-8 text-emerald-600' />
                    : <LogIn className='w-8 h-8 text-emerald-600' />
                }
            </div>
            <h1 className='text-3xl font-bold text-gray-800'>
               {mode === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className='text-gray-500 mt-2 text-sm'>
               {mode === 'Sign Up' ? 'Join us to book your first appointment' : 'Log in to manage your appointments'}
            </p>
        </div>

        <form onSubmit={onSubmitHandler} className='flex flex-col gap-5'>
          
          {/* Name Input (Only for Sign Up) */}
          {mode === 'Sign Up' && (
            <div className='relative group'>
                <div className='absolute top-3.5 left-3 text-gray-400 group-focus-within:text-emerald-600 transition-colors'>
                    <User className='w-5 h-5' />
                </div>
                <input
                    id='name'
                    name='name' 
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm bg-gray-50 focus:bg-white'
                    type='text'
                    placeholder='Full Name'
                    onChange={onChangeHandler}
                    value={formData.name}
                    required
                />
            </div>
          )}

          {/* Email Input */}
          <div className='relative group'>
              <div className='absolute top-3.5 left-3 text-gray-400 group-focus-within:text-emerald-600 transition-colors'>
                  <Mail className='w-5 h-5' />
              </div>
              <input
                id='email'
                name='email'
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm bg-gray-50 focus:bg-white'
                type='email'
                placeholder='Email Address'
                onChange={onChangeHandler}
                value={formData.email}
                required
              />
          </div>

          {/* Password Input */}
          <div className='relative group'>
              <div className='absolute top-3.5 left-3 text-gray-400 group-focus-within:text-emerald-600 transition-colors'>
                  <Lock className='w-5 h-5' />
              </div>
              <input
                id='password'
                name='password'
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm bg-gray-50 focus:bg-white'
                type='password'
                placeholder='Password'
                onChange={onChangeHandler}
                value={formData.password}
                required
              />
          </div>

          {/* Submit Button */}
          <button
            className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2 disabled:bg-emerald-400 disabled:cursor-not-allowed'
            type='submit'
            disabled={isLoading} 
          >
            {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                </>
            ) : (
                mode === 'Sign Up' ? 'Create Account' : 'Login'
            )}
          </button>

          {/* Toggle Mode */}
          <div className='text-center mt-4'>
            {mode === 'Sign Up' ? (
              <p className='text-sm text-gray-600'>
                Already have an account?{' '}
                <span 
                    onClick={() => setMode('Login')} 
                    className='text-emerald-600 font-bold hover:text-emerald-700 hover:underline cursor-pointer transition-colors'
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className='text-sm text-gray-600'>
                Don't have an account?{' '}
                <span 
                    onClick={() => setMode('Sign Up')} 
                    className='text-emerald-600 font-bold hover:text-emerald-700 hover:underline cursor-pointer transition-colors'
                >
                  Sign up here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;