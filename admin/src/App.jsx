import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Contexts
import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';

// Components
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import AllAppointment from './pages/Admin/AllAppointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';

// Doctor Pages
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);


  const role = aToken ? 'admin' : dtoken ? 'doctor' : 'guest';

  if (role === 'guest') {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }


  return (
    <div className='bg-[#f8f9fd]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        {/*  Pass the role to the Sidebar to show the correct links */}
        <Sidebar role={role} />
        <Routes>

          {role === 'admin' && (
            <>
              {/* --- Admin Routes --- */}
              <Route path='/admin-dashboard' element={<Dashboard />} />
              <Route path='/all-appointments' element={<AllAppointment />} />
              <Route path='/add-doctor' element={<AddDoctor />} />
              <Route path='/doctor-list' element={<DoctorList />} />

              <Route path='*' element={<Navigate to="/admin-dashboard" />} />
            </>
          )}

          {role === 'doctor' && (
            <>
              {/* --- Doctor Routes --- */}
              <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
              <Route path='/doctor-appointments' element={<DoctorAppointment />} />
              <Route path='/doctor-profile' element={<DoctorProfile />} />
              <Route path='*' element={<Navigate to="/doctor-dashboard" />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;