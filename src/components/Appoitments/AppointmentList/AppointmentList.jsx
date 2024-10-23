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
import FilterEmployee from "./FilterEmployee";
import AppointmentCard from "./AppointmentCard";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterTypeServicie, setFilterTypeServicie] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");

  async function getAllAppointments() {
    await axios
      .get("http://127.0.0.1:8000/api/appointments/availables")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.log("Error obteniendo turnos", error);
      });
  }

  useEffect(() => {
    getAllAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesDate = filterDate ? appointment.date === filterDate : true;
    const matchesTypeService = filterTypeServicie ? appointment.servicie.type_servicie.name === filterTypeServicie : true;
    const matchesEmployee = filterEmployee ? appointment.employee.name === filterEmployee : true;
    return matchesDate && matchesTypeService && matchesEmployee;
  });

  return (
    <>
      <div className="appointment__list--container">
        <Logo />
        <h2>
          Hola, <a href="/perfil">Julian</a>! 👋
        </h2>
        <FilterSlider setFilterTypeServicie={setFilterTypeServicie}/>
        <FilterSearch setFilterDate={setFilterDate} />
        <FilterEmployee setFilterEmployee={setFilterEmployee} />
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
