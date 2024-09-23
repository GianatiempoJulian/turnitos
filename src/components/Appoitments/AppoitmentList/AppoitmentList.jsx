// ======== Partials ========//
import Logo from "../../Partials/Logo/Logo"
import "./appoitmentList.css";

// ======== Importaciones de React ========//
import { useEffect, useState } from "react";

// ======== Librerias ========//
import axios from "axios";

// ======== Componentes ========//
import FilterSlider from "./FilterSlider";
import FilterSearch from "./FilterSearch";
import AppointmentCard from "./AppointmentCard";


const AppointmentList = () => {

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
            <h2>Hola, <a href="/perfil">Julian</a>! 👋</h2>
            <FilterSlider/>
            <FilterSearch/>
            <div className="appoitments__list">
                {appoitments.map((appoitment) => (
                 <AppointmentCard appoitment={appoitment} btnText="Reservar" btnTo={`/turnos/${appoitment.id}/estado/`}/>
                ))}
            </div>
        </div>
        </>
    );
}

export default AppointmentList