import React from 'react'
import { assets } from '../assets/assets'
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react'

const Contact = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 font-sans'>
        
        {/* Header */}
        <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-800 tracking-tight'>Contact <span className='text-[#5f6FFF]'>Us</span></h2>
            <p className='text-gray-500 mt-2 text-sm'>We are here to help you</p>
        </div>

        <div className='flex flex-col md:flex-row gap-12 lg:gap-20 items-center justify-center mb-28'>
            
            {/* Left: Image */}
            <div className='w-full md:max-w-[420px]'>
                <img 
                    className='w-full h-auto rounded-[2rem] shadow-xl hover:scale-[1.02] transition-transform duration-500 object-cover' 
                    src={assets.contact_image} 
                    alt='Contact Us'
                />
            </div>

            {/* Right: Contact Details */}
            <div className='flex flex-col gap-8 w-full md:w-1/2'>
                
                {/* Office Card */}
                <div className='bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300'>
                    <h3 className='font-bold text-xl text-gray-800 mb-6 flex items-center gap-2'>
                        Our Office
                    </h3>
                    
                    <div className='flex flex-col gap-6 text-gray-600'>
                        <div className='flex items-start gap-4 group cursor-pointer'>
                            <div className='p-3 bg-indigo-50 rounded-full text-[#5f6FFF] group-hover:bg-[#5f6FFF] group-hover:text-white transition-colors duration-300'>
                                <MapPin className='w-5 h-5' />
                            </div>
                            <div>
                                <p className='font-medium text-gray-900 mb-1'>Location</p>
                                <p className='text-sm leading-relaxed'>54709 Wilms Station <br/>Suite 350, Washington, USA</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4 group cursor-pointer'>
                            <div className='p-3 bg-indigo-50 rounded-full text-[#5f6FFF] group-hover:bg-[#5f6FFF] group-hover:text-white transition-colors duration-300'>
                                <Phone className='w-5 h-5' />
                            </div>
                            <div>
                                <p className='font-medium text-gray-900 mb-1'>Phone</p>
                                <p className='text-sm'>(415) 555-0132</p>
                            </div>
                        </div>

                        <div className='flex items-start gap-4 group cursor-pointer'>
                            <div className='p-3 bg-indigo-50 rounded-full text-[#5f6FFF] group-hover:bg-[#5f6FFF] group-hover:text-white transition-colors duration-300'>
                                <Mail className='w-5 h-5' />
                            </div>
                            <div>
                                <p className='font-medium text-gray-900 mb-1'>Email</p>
                                <p className='text-sm'>adk14639@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Careers Card */}
                <div className='bg-[#F8F9FF] p-8 rounded-[2rem] border border-indigo-50'>
                    <div className='flex flex-col gap-4'>
                        <h3 className='font-bold text-xl text-gray-800 flex items-center gap-2'>
                            <Briefcase className='w-5 h-5 text-[#5f6FFF]' />
                            Careers at Prescripto
                        </h3>
                        <p className='text-gray-600 text-sm leading-relaxed'>
                            Learn more about our teams and job openings. We are always looking for talented individuals to join us.
                        </p>
                        <div>
                            <button className='mt-2 border border-gray-900 text-gray-900 px-8 py-3 rounded-full text-sm font-semibold hover:bg-black hover:text-white hover:shadow-lg transition-all duration-300' >
                                Explore Jobs
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
  )
}

export default Contact