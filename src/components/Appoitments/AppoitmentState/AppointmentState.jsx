import Logo from "../../Partials/Logo/Logo";
import "./appointmentState.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AppointmentState = () => {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getAppointmentById();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  async function getAppointmentById() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/appointments/${id}`
      );
      setAppointment(response.data.Appointment);
      console.log(response.data.Appointment);
    } catch (error) {
      console.log("Error obteniendo turno", error);
    } finally {
      setLoading(false); // Cambiamos el estado de carga cuando la solicitud termina
    }
  }

  return (
    <>
      <div>
        <Logo />
        <h3>Estado de la reserva</h3>
        <div className="appointment__state--status">
          <div className="appointment__state--status--box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-calendar"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
            <span>Reserva temporal</span>
          </div>
          <div className="appointment__state--status--box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-dollar-sign"
            >
              <line x1="12" x2="12" y1="2" y2="22" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span>Pago realizado</span>
          </div>
          <div className="appointment__state--status--box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-history"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M12 7v5l4 2" />
            </svg>
            <span>Procesando pago</span>
          </div>
          <div className="appointment__state--status--box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-circle-check-big"
            >
              <path d="M21.801 10A10 10 0 1 1 17 3.335" />
              <path d="m9 11 3 3L22 4" />
            </svg>
            <span>Reserva completada</span>
          </div>
        </div>
        <div className="appointment__state--card">
          <img
            src="https://images.pexels.com/photos/939835/pexels-photo-939835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="foto_carta"
          />
          <div className="appointment__state--card--info">
            <h4>{appointment.date_time.slice(0, 10)}</h4>
            <div className="appoitments__state--card--info--data">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-clock"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <p>{appointment.date_time.slice(12)}</p>
            </div>
            <div className="appoitments__state--card--info--data">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-contact"
              >
                <path d="M16 2v2" />
                <path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
                <path d="M8 2v2" />
                <circle cx="12" cy="11" r="3" />
                <rect x="3" y="4" width="18" height="18" rx="2" />
              </svg>
              <p>{appointment.employee.name}</p>
            </div>
          </div>
        </div>
        <div className="appointment__state--buttons">
          <button className="appointment__state--btn">Pagar seña ${appointment.servicie.price}</button>
          <button className="appointment__state--btn--small">Cancelar</button>
        </div>
      </div>
    </>
  );
};

export default AppointmentState;
