import { useEffect, useState } from "react";
import "./appoitmentList.css";
import axios from "axios";

import Logo from "../../Partials/Logo/Logo"
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
            <h2>Hola, Cliente! 👋</h2>
            <FilterSlider/>
            <FilterSearch/>
            <div className="appoitments__list">
                {appoitments.map((appoitment) => (
                 <AppointmentCard appoitment={appoitment}/>
                ))}
            </div>
        </div>
        </>
    );
}

export default AppointmentList