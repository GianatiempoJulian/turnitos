// ======== Partials ========//
import Logo from "../../Partials/Logo/Logo";
import "./appointmentState.css";

// ======== Importaciones de React ========//
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// ======== Librerias ========//
import axios from "axios";
import Countdown from "react-countdown";

const AppointmentState = () => {
  const [appointment, setAppointment] = useState(null);
  const [appointmentStatus, setAppointmentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // ======== Setea el turno llamando a la función. ========//
  useEffect(() => {
    getAppointmentById();
  }, [id]);

  // ======== Actualiza el estado cuando appointmentStatus cambia ========//
  useEffect(() => {
    const statusElements = document.getElementsByClassName(
      "appointment__state--status--box"
    );

    for (let i = 0; i < statusElements.length; i++) {
      statusElements[i].classList.remove("statusStep");
    }

    switch (appointmentStatus) {
      case 2:
        document.getElementById("temporary").classList.add("statusStep");
        break;
      case 3:
        document.getElementById("payment").classList.add("statusStep");
        break;
      case 4:
        document.getElementById("processing").classList.add("statusStep");
        break;
      case 5:
        document.getElementById("complete").classList.add("statusStep");
        break;
      default:
        console.log("Error obteniendo estado del turno.");
    }
  }, [appointmentStatus]);

  // ======== Obtiene un turno mediante una ID. ========//
  async function getAppointmentById() {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/appointments/${id}`
      );
      setAppointment(response.data.Appointment);
      setAppointmentStatus(response.data.Appointment.status_id);
    } catch (error) {
      console.log("Error obteniendo turno", error);
    } finally {
      setLoading(false); // Cambiamos el estado de carga cuando la solicitud termina
    }
  }

  // ======== Funcion que maneja el pago ========//
  async function handlePayment() {
    const status = {
      status_id: 3,
    };
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/appointments/${id}`,
        status
      );
      if (response.status === 200) {
        setAppointmentStatus(response.data.Appointment.status_id);
        // Llama nuevamente a getAppointmentById para refrescar el estado
        getAppointmentById();
      }
    } catch (error) {
      console.log("Error actualizando turno", error);
    }
  }

  // ======== Funcion que maneja el cancelamiento del pago ========//
  async function handleCancel() {
    const status = {
      status_id: 1,
    };

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/appointments/${id}`,
        status
      );
    } catch (error) {
      console.log("Error actualizando turno", error);
    }
    window.location.href = "http://localhost:5173/turnos";
  }

  // ======== Loading ========//
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <Logo />
        <h3>Estado de la reserva</h3>
        {appointmentStatus == 2 && (
          <div className="appointment__state--timer">
            <p>Tiempo restante para pagar:</p>
            <Countdown
              date={Date.now() + 20000}
              className="appointment__state--timer--countdown"
            >
              <p>Listo</p>
            </Countdown>
          </div>
        )}
        <div className="appointment__state--status">
          <div className="appointment__state--status--box" id="temporary">
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
          <div className="appointment__state--status--box" id="payment">
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
          <div className="appointment__state--status--box" id="processing">
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
          <div className="appointment__state--status--box" id="complete">
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
          <div className="appointment__state--card--info">
            <h4>{new Date(appointment.date).toLocaleDateString("en-GB")}</h4>
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
              <p>{appointment.time}</p>
            </div>
            <div className="appointments__list--card--info--data">
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
                class="lucide lucide-sparkle"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              </svg>
              <p>{appointment.servicie.type_servicie.name}</p>
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
          {appointmentStatus == 2 && (
            <button className="appointment__state--btn" onClick={handlePayment}>
              Pagar seña ${appointment.servicie.price}
            </button>
          )}
          <button
            className="appointment__state--btn--cancel"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default AppointmentState;
