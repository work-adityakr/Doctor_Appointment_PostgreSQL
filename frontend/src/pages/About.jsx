import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='md:mx-10 my-10 font-sans'>

      <div className='flex flex-col gap-4 mb-16'>
        <div className='flex flex-wrap justify-center items-center gap-8 md:gap-46 opacity-50 grayscale hover:grayscale-0 transition-all duration-500'>
          <h2 className='text-xl font-bold font-serif tracking-tighter flex items-center gap-1'><span className='text-blue-500 text-3xl'>G</span>oogle</h2>
          <h2 className='text-xl font-bold tracking-tight flex items-center gap-1'># slack</h2>
          <h2 className='text-xl font-bold flex items-center gap-1 text-blue-700'>Dropbox</h2>
          <h2 className='text-xl font-semibold flex items-center gap-1 text-gray-700'>Microsoft</h2>
        </div>
      </div>

      <div className='flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-20'>

        <div className='w-full md:w-1/2 flex justify-center relative py-10'>
      

        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        </div>

        <div className='flex flex-col justify-center gap-6 md:w-1/2 text-sm text-gray-600 leading-relaxed'>
          <h2 className='text-3xl font-bold text-[#2d2d2d]'>About Prescripto</h2>
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently.
            At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>

          <div className='mt-4'>
            <h3 className='text-gray-900 font-bold text-lg mb-2'>Our Vision</h3>
            <p>
              Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>
      </div>

      <div className='my-16'>
        <div className='text-center mb-10'>
          <h2 className='text-2xl font-bold text-gray-800'>Why Choose Us</h2>
          <p className='text-gray-500 text-sm mt-2'>We provide the best services for your health needs</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>

          {/* Card 1 */}
          <div className='group border border-gray-100 rounded-[2rem] p-8 md:p-10 flex flex-col gap-4 text-gray-600 cursor-pointer shadow-sm hover:bg-[#5f6FFF] hover:text-white hover:shadow-2xl transition-all duration-300'>
            <b className='text-gray-800 text-lg group-hover:text-white uppercase'>Efficiency:</b>
            <p className='text-sm leading-6'>Streamlined appointment scheduling that fits into your busy lifestyle. Save time and manage your health efficiently.</p>
          </div>

          {/* Card 2 */}
          <div className='group border border-gray-100 rounded-[2rem] p-8 md:p-10 flex flex-col gap-4 text-gray-600 cursor-pointer shadow-sm hover:bg-[#5f6FFF] hover:text-white hover:shadow-2xl transition-all duration-300'>
            <b className='text-gray-800 text-lg group-hover:text-white uppercase'>Convenience:</b>
            <p className='text-sm leading-6'>Access to a network of trusted healthcare professionals in your area. Find the right doctor near you instantly.</p>
          </div>

          {/* Card 3 */}
          <div className='group border border-gray-100 rounded-[2rem] p-8 md:p-10 flex flex-col gap-4 text-gray-600 cursor-pointer shadow-sm hover:bg-[#5f6FFF] hover:text-white hover:shadow-2xl transition-all duration-300'>
            <b className='text-gray-800 text-lg group-hover:text-white uppercase'>Personalization:</b>
            <p className='text-sm leading-6'>Tailored recommendations and reminders to help you stay on top of your health. Your well-being is our priority.</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default About