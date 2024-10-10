// ======== Partials ========//
import Logo from "../../Partials/Logo/Logo";
import "../../Appoitments/AppointmentList/appointmentList.css";
import "./customerProfile.css";

// ======== Importaciones de React ========//
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

// ======== Librerias ========//
import axios from "axios";

// ======== Componentes ========//
import FilterSearch from "../../Appoitments/AppointmentList/FilterSearch";

const CustomerProfile = () => {
  const [appointment, setAppointment] = useState([]);
  const [customer, setCustomer] = useState([]);

  async function getCustomer(){
    await axios
      .get(`http://127.0.0.1:8000/api/customers/1`)
      .then((response) => {
        setCustomer(response.data.customer);
      })
      .catch((error) => {
        console.log("Error obteniendo cliente", error);
      });
  }

  async function getAllAppointments() {
    await axios
      .get("http://127.0.0.1:8000/api/appointments")
      .then((response) => {
        setAppointment(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error obteniendo turnos", error);
      });
  }

  useEffect(() => {
    getAllAppointments();
    getCustomer();
  }, []);

  async function handleCancel(id) {
    const customer = {
      customer_id: null,
    };
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/appointments/${id}`,
        customer
      );
      if (response.status === 200) {
        console.log("Turno cancelado con exito");
      }
    } catch (error) {
      console.log("Error actualizando turno", error);
    }
  }

  return (
    <>
      <div className="appointments__list--container">
        <Logo />
        <h2>Tus datos</h2>
        <div className="customer__profile">
          <ul className="customer__profile--info">
            <li>
              <h4>Nombre completo: </h4>
              <span>{customer.name} {customer.lastname}</span>
            </li>
            <li>
              <h4>Telefono: </h4>
              <span>{customer.phone}</span>
            </li>
            <li>
              <h4>Email: </h4>
              <span>{customer.email}</span>
            </li>
          </ul>
          <Link className="customer__profile--btn" to={`/perfil/editar`}>Editar datos</Link>
        </div>
        <hr className="customer__profile--divisor"/>
        <h2>Tus turnos</h2>
        <FilterSearch />
        <div className="appointments__list">
          {appointment.map((appoitment) => (
            <div className="appointments__list--card">
              <img
                src="https://images.pexels.com/photos/939835/pexels-photo-939835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="foto_carta"
              />
              <div className="appointments__list--card--info">
                <h2>{new Date(appoitment.date).toLocaleDateString("en-GB")}</h2>
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
                    class="lucide lucide-clock"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <p>{appoitment.time}</p>
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
                    class="lucide lucide-contact"
                  >
                    <path d="M16 2v2" />
                    <path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
                    <path d="M8 2v2" />
                    <circle cx="12" cy="11" r="3" />
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                  </svg>
                  <p>{appoitment.employee.name}</p>
                </div>
                <p id="estimated">
                  precio seña ~ {appoitment.servicie.price} ARS
                </p>
                <button
                  className="appointments__list--card--btn"
                  onClick={() => handleCancel(appoitment.id)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomerProfile;
