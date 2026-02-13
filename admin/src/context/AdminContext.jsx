import { createContext, useCallback } from "react"
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import authAdmin from "../../../backend/middlewares/authAdmin";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('aToken')) {
            return localStorage.getItem('aToken');
        }
        return '';
    });

    const [doctors, setDoctors] = useState([]);
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = useCallback(async () => {
         if (!aToken) {
            return;
        }

        

        try {
            const { data } = await axios.get(backendUrl + '/api/admin/all-doctors', {
                headers: { aToken}
            })
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message || 'Failed to fetch doctors');
        }
    }, [aToken]);


    const changeAvailability = useCallback(async (docId) => {
         if (!aToken) {
            return;
        }

        try {
            const { data } = await axios.get(backendUrl + '/api/admin/change-availability/' + docId, {
                headers: { aToken}
            })
            if (data.success) {
                toast.success(data.message)
                await getAllDoctors()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message || 'Failed to change availability');
        }
    }, [aToken, getAllDoctors]);


    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/appointments',{headers:{aToken}})

            if(data.success){
                setAppointments(data.appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async(appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})

            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
             toast.error(error.message)
        }
    }

    const getDashData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}})

            if(data.success){
                setDashData(data.dashData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }



    const value = {
        aToken, setAToken,
        backendUrl, doctors,
        getAllDoctors, changeAvailability,
        appointments,setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,getDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider