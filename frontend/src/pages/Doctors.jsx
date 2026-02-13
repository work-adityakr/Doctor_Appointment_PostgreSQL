import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ];

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className='md:mx-10 my-10'>
      <p className='text-gray-600 text-sm'>Browse through the doctors specialist</p>
      
      <div className='flex flex-col sm:flex-row items-start gap-8 mt-5'>
        
        {/* ============ Filter Sidebar (Rectangular Type) ============ */}
        <div className='flex flex-col gap-4 w-full sm:w-64'>
            {/* Mobile Filter Toggle */}
            <button
                className={`py-2 px-4 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-[#5f6FFF] text-white' : 'text-gray-600'}`}
                onClick={() => setShowFilter(!showFilter)}
            >
                Filters {showFilter ? '▲' : '▼'}
            </button>

            {/* Filter List */}
            <div className={`flex-col gap-3 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
            {specialities.map((item, index) => (
                <div
                key={index}
                onClick={() => speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)}
                className={`
                    w-full pl-4 py-3 pr-4 border border-gray-300 rounded-md transition-all duration-300 cursor-pointer 
                    ${speciality === item 
                        ? "bg-[#e2e5ff] text-black font-semibold shadow-sm" 
                        : "bg-white hover:bg-gray-50 hover:text-black hover:translate-x-1" 
                    }
                `}
                >
                {item}
                </div>
            ))}
            </div>
        </div>

        {/* ============ Doctor Grid (Professional Card Style) ============ */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {
            filterDoc.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/appointment/${item.id}`)}
                className='bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center cursor-pointer'
              >
                {/* Circular Image Container */}
                <div className='w-24 h-24 mb-4 relative'>
                    <img 
                        className='w-full h-full rounded-full object-cover bg-blue-50 border-2 border-gray-100 shadow-sm' 
                        src={item.image} 
                        alt={item.name} 
                    />
                </div>

                {/* Text Content */}
                <div className='flex flex-col items-center gap-1 w-full mb-4'>
                    <p className='text-gray-900 text-lg font-bold text-center leading-tight'>{item.name}</p>
                    <p className='text-gray-500 text-xs text-center'>{item.speciality}</p>
                    
                    {/* Status Indicator */}
                    <div className={`flex items-center gap-2 text-xs mt-2 px-3 py-1 rounded-full ${item.available ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'} `}>
                        <span className={`w-1.5 h-1.5 ${item.available ? 'bg-green-500' : 'bg-gray-400'} rounded-full`}></span>
                        <p className='font-medium'>{item.available ? 'Available' : 'Not Available'}</p>
                    </div>
                </div>

                {/* Green View Profile Button */}
                <button 
                    className='w-full bg-white border border-[#10b981] text-[#10b981] hover:bg-[#10b981] hover:text-white text-sm font-semibold py-2 rounded-full transition-all duration-300'
                >
                    View Profile
                </button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Doctors;