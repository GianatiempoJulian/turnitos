// ======== Partials ========//
import Logo from "../../Partials/Logo/Logo"
import "../AppoitmentList/appoitmentList.css";

// ======== Importaciones de React ========//
import { useEffect, useState } from "react";

// ======== Librerias ========//
import axios from "axios";

// ======== Componentes ========//
import FilterSearch from "../AppoitmentList/FilterSearch";
import AppointmentCard from "../AppoitmentList/AppointmentCard";

const UserAppointments = () => {

    const [appoitments, SetAppoitments] = useState([]);

    async function getAllAppointments(){
        await axios.get('http://127.0.0.1:8000/api/appointments')
        .then((response) => {
            SetAppoitments(response.data);
            console.log(response.data)
        })
        .catch((error) =>{
            console.log("Error obteniendo turnos", error);
        });
    }

    useEffect(() =>{
        getAllAppointments();
    },[]);

    return(
        <>
        <div className="appoitment__list--container">
            <Logo/>
            <h2>Tus turnos</h2>
            <FilterSearch/>
            <div className="appoitments__list">
                {appoitments.map((appoitment) => (
                 <AppointmentCard appoitment={appoitment} btnText="Cancelar" btnTo={`/turnos/${appoitment.id}/estado/`}/>
                ))}
            </div>
        </div>
        </>
    );
}

export default UserAppointments