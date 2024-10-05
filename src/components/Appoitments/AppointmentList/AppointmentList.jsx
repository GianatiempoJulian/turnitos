// ======== Partials ========//
import Logo from "../../Partials/Logo/Logo";
import "./appointmentList.css";

// ======== Importaciones de React ========//
import { useEffect, useState } from "react";

// ======== Librerias ========//
import axios from "axios";

// ======== Componentes ========//
import FilterSlider from "./FilterSlider";
import FilterSearch from "./FilterSearch";
import AppointmentCard from "./AppointmentCard";

const AppointmentList = () => {
  const [appointments, Setappointments] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  async function getAllAppointments() {
    await axios
      .get("http://127.0.0.1:8000/api/appointments")
      .then((response) => {
        Setappointments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error obteniendo turnos", error);
      });
  }

  useEffect(() => {
    getAllAppointments();
  }, []);

  const filteredAppointments = filterDate
    ? appointments.filter((appointment) => appointment.date === filterDate)
    : appointments;

  return (
    <>
      <div className="appointment__list--container">
        <Logo />
        <h2>
          Hola, <a href="/perfil">Julian</a>! 👋
        </h2>
        <FilterSlider />
        <FilterSearch setFilterDate={setFilterDate} />
        <div className="appointments__list">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              btnText="Reservar"
              btnTo={`/turnos/${appointment.id}/estado/`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AppointmentList;
