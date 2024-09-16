import Logo from "../../Partials/Logo/Logo";
import "./appoitmentState.css";
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AppoitmentState = () => {
    const [appointment, setAppoitment] = useState([])
    const { id } = useParams();

    async function getAppointmentById() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/appointments/${id}`);
            setAppoitment(response.data.Appointment);
            console.log(response.data.Appointment)
        } catch (error) {
            console.log("Error obteniendo turno", error);
        }
    }

    useEffect(() =>{
        getAppointmentById();
    }, []);

    return(
        <>
        <div>
            <Logo/>
            <div className="appoitment__state--status">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                    <span>Reserva temporal</span>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>                    
                    <span>Pago realizado</span>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-history"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
                    <span>Procesando pago</span>                
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>                    
                    <span>Reserva completada</span>
                </div>
            </div>
            <button>Cancelar</button>
        </div>
        </>
    );
}

export default AppoitmentState