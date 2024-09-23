// ======== Partials ========//
import "./appoitmentList.css";

// ======== Importaciones de React ========//

// ======== Librerias ========//
import axios from "axios";

const AppointmentCard = ({ appoitment, btnText, btnTo} ) => {

  async function handleRedirect(){

    const status = {
      status_id: 2
    };

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/appointments/${appoitment.id}`,  status)
      if(response.status === 200){
        window.location.href = btnTo;
      }
    } catch (error) {
      console.log("Error actualizando turno", error);
    }
  }


  return (
    <div className="appoitments__list--card">
      <img
        src="https://images.pexels.com/photos/939835/pexels-photo-939835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="foto_carta"
      />
      <div className="appoitments__list--card--info">
        <h2>{new Date(appoitment.date).toLocaleDateString('en-GB')}</h2>
        <div className="appoitments__list--card--info--data">
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
        <div className="appoitments__list--card--info--data">
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
        <p id="estimated">precio seña ~ {appoitment.servicie.price} ARS</p>
        <button className="appoitments__list--card--btn" onClick={handleRedirect}>{btnText}</button>
      </div>
    </div>
  );
};
export default AppointmentCard;
