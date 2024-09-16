import { useEffect, useState } from "react";
import "./appoitmentList.css";
import axios from "axios";

const AppointmentList = () => {

    const [appoitments, SetAppoitments] = useState([]);

    async function getAllAppointments(){
        await axios.get('http://127.0.0.1:8000/api/appointments')
        .then((response) => {
            SetAppoitments(response.data);
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
            <div className="logo--info"><img src="https://image.similarpng.com/very-thumbnail/2020/04/Popular-Logo-facebook-icon-png.png" alt="logo" id="logo--small"/><h4>Example nails</h4></div>
            <h2>Hola, Cliente! 👋</h2>
            <div className="filter__slider">
                <button className="filter__slider--btn">Uñas</button>
                <button className="filter__slider--btn">Cejas</button>
                <button className="filter__slider--btn">Pestañas</button>
            </div>
            <div className="filter__search">
                <input type="date" className="filter__search--date"/>
                <button className="filter__search--btn">Buscar</button>
            </div>
            <div className="appoitments__list">
                {appoitments.map((appoitment) => (
                <div className="appoitments__list--card">
                    <img src="https://images.pexels.com/photos/939835/pexels-photo-939835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="foto_carta" />
                    <div className="appoitments__list--card--info">
                        <h2>{appoitment.date_time.slice(0,10)}</h2>
                        <div className="appoitments__list--card--info--data">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            <p>{appoitment.date_time.slice(12)}</p>
                        </div>
                        <div className="appoitments__list--card--info--data">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-contact"><path d="M16 2v2"/><path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/><path d="M8 2v2"/><circle cx="12" cy="11" r="3"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg>                           
                            <p>{appoitment.employee.name}</p>
                        </div>
                        <p id="estimated">precio estimativo ~{appoitment.servicie.price}</p>
                        <button className="appoitments__list--card--btn">Reservar</button>
                    </div>
                </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default AppointmentList