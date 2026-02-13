import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

    const navigate = useNavigate();
    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-bold'>Top Doctors To Book</h1>
            <p className='sm:w-1/3 text-center text-sm text-gray-600'>Simply browse through our extensive list of trusted doctors.</p>
            
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-4 sm:px-0'>
                {
                    doctors.slice(0, 10).map((item, index) => (
                        <div 
                            key={index} 
                            className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center'
                        >
                            {/* Circular Image Container */}
                            <div className='w-24 h-24 mb-4'>
                                <img 
                                    className='w-full h-full rounded-full object-cover bg-blue-50 border-2 border-white shadow-sm' 
                                    src={item.image} 
                                    alt={item.name} 
                                />
                            </div>

                            <div className='flex flex-col items-center gap-1 w-full mb-4'>
                                <p className='text-gray-900 text-lg font-bold text-center'>{item.name}</p>
                                <p className='text-gray-500 text-sm text-center'>{item.speciality}</p>
                                
                                <div className={`flex items-center gap-2 text-sm mt-2 ${item.available ? 'text-green-500' : 'text-gray-400'} `}>
                                    <span className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-400'} rounded-full`}></span>
                                    <p className='font-medium'>{item.available ? 'Available' : 'Not Available'}</p>
                                </div>
                            </div>

                            <button 
                                onClick={() => { navigate(`/appointment/${item.id}`); window.scrollTo(0, 0); }}
                                className='w-full bg-[#10b981] hover:bg-[#059669] text-white text-sm font-semibold py-2.5 rounded-full transition-colors duration-300'
                            >
                                View Profile
                            </button>
                        </div>
                    ))
                }
            </div>

            <button 
                onClick={() => { navigate('/doctors'); scrollTo(0,0) }} 
                className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 font-medium hover:bg-blue-100 transition-colors'
            >
                More
            </button>
        </div>
    )
}

export default TopDoctors