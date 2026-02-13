import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken, userData } = useContext(AppContext);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
        navigate("/");
    }

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-200 mx-4 sm:mx-[10%] bg-white'>

            {/* Logo */}
            <img onClick={() => navigate('/')} className='w-44 cursor-pointer hover:opacity-80 transition-opacity' src={assets.logo} alt='logo' />

            {/* Desktop Navigation */}
            <ul className='hidden md:flex items-start gap-8 font-medium'>

                {['HOME', 'ALL DOCTORS', 'ABOUT', 'CONTACT'].map((item, index) => {
                    const paths = ['/', '/doctors', '/about', '/contact'];
                    return (
                        <NavLink key={index} to={paths[index]}>
                            {({ isActive }) => (
                                <li className={`py-1 cursor-pointer transition-colors duration-300 ${isActive ? 'text-[#5f6FFF]' : 'text-gray-700'}`}>
                                    {item}
                                    <hr className={`border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto transition-all duration-300 ease-in-out ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                                </li>
                            )}
                        </NavLink>
                    )
                })}
            </ul>

            <div className='flex items-center gap-4'>
                {
                    token && userData ?
                        <div className='flex items-center gap-2 cursor-pointer group relative z-10'>
                            <img className='w-9 h-9 rounded-full object-cover border border-gray-200' src={userData.image} alt="pic" />
                            <img className='w-2.5 transition-transform duration-300 group-hover:rotate-180' src={assets.dropdown_icon} alt="icon" />

                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 
                                            transition-all duration-500 ease-in-out
                                            invisible opacity-0 scale-95 origin-top-right
                                            group-hover:visible group-hover:opacity-100 group-hover:scale-100'>

                                <div className='min-w-48 bg-white shadow-xl rounded-lg flex flex-col gap-4 p-4 border border-gray-100' >
                                    <p onClick={() => navigate('my-profile')} className='hover:text-[#5f6FFF] cursor-pointer transition-colors'>My Profile</p>
                                    <p onClick={() => navigate('my-appointment')} className='hover:text-[#5f6FFF] cursor-pointer transition-colors'>My Appointment</p>
                                    <p onClick={logout} className='hover:text-red-500 cursor-pointer transition-colors'>Logout</p>
                                </div>
                            </div>
                        </div>
                        :
                        <button onClick={() => navigate('/login')} className='bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 hidden md:block'>
                            Create account
                        </button>
                }

                {/* Mobile Menu Icon */}
                <img className='w-6 md:hidden cursor-pointer' onClick={() => setShowMenu(true)} src={assets.menu_icon} alt="" />

                {/* Mobile Menu Overlay */}
                <div className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 ease-in-out overflow-hidden ${showMenu ? 'w-full' : 'w-0'}`}>
                    <div className='flex items-center justify-between px-5 py-6 border-b'>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-7 cursor-pointer' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-4 mt-8 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/' className={({ isActive }) => isActive ? 'text-[#5f6FFF]' : ''}><p className='px-4 py-2'>HOME</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctors' className={({ isActive }) => isActive ? 'text-[#5f6FFF]' : ''}><p className='px-4 py-2'>ALL DOCTORS</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about' className={({ isActive }) => isActive ? 'text-[#5f6FFF]' : ''}><p className='px-4 py-2'>ABOUT</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact' className={({ isActive }) => isActive ? 'text-[#5f6FFF]' : ''}><p className='px-4 py-2'>CONTACT</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;