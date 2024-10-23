// ======== Partials ========//
import "./appointmentList.css";

// ======== Importaciones de React ========//

// ======== Librerias ========//
import axios from "axios";

const AppointmentCard = ({ appointment, btnText, btnTo }) => {

  async function handleRedirect() {
    const status = {
      status_id: 2,
    };

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/appointments/${appointment.id}`,
        status
      );
      if (response.status === 200) {
        window.location.href = btnTo;
      }
    } catch (error) {
      console.log("Error obteniendo turno", error);
    }
  }

  function formatDate(date){
    const dateParts = date.split("-"); // Divide el string en año, mes y día
    const correctDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); // Meses en JavaScript son base 0
    return correctDate.toLocaleDateString("es-ES");
  }

  console.log(appointment);
  return (
    <div className="appointments__list--card">
      <div className="appointments__list--card--info">
        <h2>{formatDate(appointment.date)}</h2>
        <h3>{appointment.servicie.name}</h3>
        <div className="appointments__list--card--info--data">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-clock"
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-sparkle"
          >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
          </svg>
          <p>{appointment.servicie.type_servicie.name}</p>
        </div>
        <div className="appointments__list--card--info--data">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-contact"
          >
            <path d="M16 2v2" />
            <path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
            <path d="M8 2v2" />
            <circle cx="12" cy="11" r="3" />
            <rect x="3" y="4" width="18" height="18" rx="2" />
          </svg>
          <p>{appointment.employee.name}</p>
        </div>
        <p id="estimated">precio seña ~ {appointment.servicie.price} ARS</p>
        <button
          className="appointments__list--card--btn"
          onClick={handleRedirect}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};
export default AppointmentCard;
