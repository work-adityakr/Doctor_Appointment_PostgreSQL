import React from 'react'
import { assets } from '../assets/assets'
import { Heart, Pill, Stethoscope, Syringe } from 'lucide-react' 
import { useNavigate } from 'react-router-dom'

const AboutSection = () => {
  const navigate = useNavigate();
  return (
    <div className='w-11/12 mx-auto my-16 space-y-20'>

      <div className='flex flex-col gap-6'>
        <h3 className='text-xl font-bold text-gray-800'>Our Trusted Partners</h3>
        <div className='flex flex-wrap justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500'>
            <img src={assets.google_logo || "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"} alt="Google" className="h-8 md:h-10 object-contain" />
            <img src={assets.slack_logo || "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"} alt="Slack" className="h-8 md:h-10 object-contain" />
            <img src={assets.dropbox_logo || "https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg"} alt="Dropbox" className="h-8 md:h-10 object-contain" />
            <img src={assets.microsoft_logo || "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"} alt="Microsoft" className="h-8 md:h-10 object-contain" />
            <img src={assets.amazon_logo || "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"} alt="Amazon" className="h-8 md:h-10 object-contain" />
        </div>
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <div className='flex flex-col md:flex-row items-center gap-12 lg:gap-24'>

        <div className='w-full md:w-1/2 flex justify-center relative py-10'>
           
           {/* Outer Orbit Ring (Dashed) */}
           <div className='w-[280px] h-[280px] md:w-[350px] md:h-[350px] border-2 border-dashed border-indigo-200 rounded-full relative flex items-center justify-center animate-[spin_20s_linear_infinite]'>
              
              <div className='absolute -top-4 left-10 bg-white p-4 rounded-full shadow-lg flex flex-col items-center gap-1 animate-[spin_20s_linear_infinite_reverse]'>
                 <div className='bg-purple-100 p-2 rounded-full'>
                    <Pill className='w-5 h-5 text-purple-600' />
                 </div>
                 <span className='text-[10px] font-bold text-gray-600'>My Pharmacy</span>
              </div>

              <div className='absolute top-1/2 -right-6 -translate-y-1/2 bg-blue-600 p-4 rounded-full shadow-xl flex flex-col items-center gap-1 animate-[spin_20s_linear_infinite_reverse] transform hover:scale-110 transition-transform'>
                 <div className='bg-white/20 p-2 rounded-full backdrop-blur-sm'>
                    <Stethoscope className='w-6 h-6 text-white' />
                 </div>
                 <span className='text-[10px] font-bold text-white'>My Doctor</span>
              </div>

              <div className='absolute bottom-0 left-10 bg-white p-4 rounded-full shadow-lg flex flex-col items-center gap-1 animate-[spin_20s_linear_infinite_reverse]'>
                 <div className='bg-green-100 p-2 rounded-full'>
                    <Syringe className='w-5 h-5 text-green-600' />
                 </div>
                 <span className='text-[10px] font-bold text-gray-600'>My Diagnostic</span>
              </div>
           </div>

           {/* Center Core: MyHospital Logo */}
           <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-tr from-[#5E43D6] to-[#806bf9] rounded-full flex items-center justify-center shadow-2xl z-10'>
              <Heart className='w-16 h-16 text-white fill-white animate-pulse' />
           </div>

        </div>

        <div className='w-full md:w-1/2 space-y-6'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>About MyHospital</h2>
            
            <p className='text-gray-500 leading-relaxed'>
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
               when an unknown printer took a galley of type.
            </p>
            
            <p className='text-gray-500 leading-relaxed'>
               It has survived not only five centuries, but also the leap into electronic typesetting, 
               remaining essentially unchanged. It was popularised in the 1960s with the release of 
               Letraset sheets containing Lorem Ipsum passages.
            </p>

            <button className='bg-gradient-to-r from-[#5E43D6] to-[#806bf9] text-white px-8 py-3 rounded-md font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300' onClick={() => navigate('/doctors')} >
               Book an Appointment
            </button>
        </div>

      </div>
    </div>
  )
}

export default AboutSection