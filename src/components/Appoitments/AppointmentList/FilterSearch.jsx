import { useState } from "react";
import "./appointmentList.css";

const FilterSearch = ({ setFilterDate }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleSearch = () => {
    setFilterDate(selectedDate); // Actualizar la fecha en AppoitmentList
  };

  const handleClear = () => {
    setFilterDate(""); // Actualizar la fecha en AppoitmentList
  };

  return (
    <div className="filter__search">
      <input
        type="date"
        className="filter__search--date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)} // Actualizar el estado local
      />
      <button className="filter__search--btn" onClick={handleSearch}>
        Buscar
      </button>
      <button className="filter__search--btn" onClick={handleClear}>
        Limpiar
      </button>
    </div>
  );
};
export default FilterSearch;
