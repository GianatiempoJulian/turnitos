// ======== Partials ========//
import Logo from "../../Partials/Logo/Logo";
import Backward from "../../Partials/Backward/Backward"
import "./customerEditProfile.css";

// ======== Importaciones de React ========//
import { useState, useEffect } from "react";

// ======== Librerias ========//
import axios from "axios";

const CustomerEditProfile = () => {
  const id = 1;
  const [successMessage, setSuccessMessage] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/customers/${id}`)
      .then((response) => {
        setCustomer({
          name: response.data.customer.name,
          lastname: response.data.customer.lastname,
          phone: response.data.customer.phone,
          email: response.data.customer.email,
        });
      })
      .catch((error) => {
        console.log("Error obteniendo cliente", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  async function handleUpdate(event) {
    event.preventDefault();
    await axios
    .put(`http://127.0.0.1:8000/api/customers/1`, JSON.stringify(customer), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setSuccessMessage("Datos actualizados exitosamente.");
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    })
    .catch((error) => {
      console.log("Error obteniendo cliente", error);
    });
  }

  return (
    <>
      <div className="customer__edit">
        <div className="backward__logo">
          <Backward/>
          <Logo />
        </div>
        <h2>Editar datos</h2>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <form
          action=""
          className="customer__edit--form"
          onSubmit={handleUpdate}
        >
          <div className="customer__edit--form--data">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              value={customer.name}
              placeholder={customer.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="customer__edit--form--data">
            <label htmlFor="lastname">Apellido</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={customer.lastname}
              placeholder={customer.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div className="customer__edit--form--data">
            <label htmlFor="phone">Telefono</label>
            <input
              type="number"
              name="phone"
              id="phone"
              value={customer.phone}
              placeholder={customer.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="customer__edit--form--data">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={customer.email}
              placeholder={customer.email}
              onChange={handleInputChange}
            />
          </div>
          <button className="customer__edit--btn" type="submit">
            Guardar cambios
          </button>
        </form>
      </div>
    </>
  );
};

export default CustomerEditProfile;
