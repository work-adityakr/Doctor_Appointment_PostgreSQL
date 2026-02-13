import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom' 

const Footer = () => {
  return (
    <div className='md:mx-10 mt-40 font-sans'>
      
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>

        {/* ----- Left Section: Logo & Description ----- */}
        <div className='flex flex-col gap-4'>
            <img className='w-40 mb-2' src={assets.logo} alt="Logo" />
            <p className='w-full md:w-2/3 text-gray-600 leading-relaxed text-sm'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quas eum expedita 
              neque saepe nemo nobis molestiae, unde et in, doloremque explicabo vitae, 
              voluptatum repellendus dolorum!
            </p>
        </div>

        {/* ----- Center Section: Company Links ----- */}
        <div>
            <p className='text-lg font-bold text-gray-800 mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-3 text-gray-600'>
                <Link to='/' onClick={() => scrollTo(0,0)} className='hover:text-[#5f6FFF] hover:translate-x-1 transition-all duration-300 cursor-pointer w-fit'>
                    Home
                </Link>
                <Link to='/about' onClick={() => scrollTo(0,0)} className='hover:text-[#5f6FFF] hover:translate-x-1 transition-all duration-300 cursor-pointer w-fit'>
                    About us
                </Link>
                <Link to='/contact' onClick={() => scrollTo(0,0)} className='hover:text-[#5f6FFF] hover:translate-x-1 transition-all duration-300 cursor-pointer w-fit'>
                    Contact us
                </Link>
                <li className='hover:text-[#5f6FFF] hover:translate-x-1 transition-all duration-300 cursor-pointer w-fit'>
                    Privacy policy
                </li>
            </ul>
        </div>

        {/* ----- Right Section: Contact Info ----- */}
        <div>
            <p className='text-lg font-bold text-gray-800 mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-3 text-gray-600'>
                <li className='hover:text-[#5f6FFF] transition-colors cursor-pointer'>
                    +1-212-456-7890
                </li>
                <li className='hover:text-[#5f6FFF] transition-colors cursor-pointer'>
                    adk14639@gmail.com
                </li>
            </ul>
        </div>

      </div>
      
      {/* ----- Copyright Section ----- */}
      <div>
          <hr className='border-gray-200' />
          <p className='py-5 text-sm text-center text-gray-500'>
              Copyright © 2025 Prescripto - All Right Reserved.
          </p>
      </div>

    </div>
  )
}

export default Footer