// ======== Partials ========//
import "./appointmentList.css";

// ======== Importaciones de React ========//
import { useState, useEffect } from "react";

// ======== Librerias ========//
import axios from "axios";

const FilterEmployee = ({ setFilterEmployee }) => {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employees, setEmployees] = useState([]);

  const handleSearch = () => {
    setFilterEmployee(selectedEmployee);
  };

  async function getAllEmployees() {
    await axios
      .get("http://127.0.0.1:8000/api/employees")
      .then((response) => {
        setEmployees(response.data);
        console.log(employees)
      })
      .catch((error) => {
        console.log("Error obteniendo empleados", error);
      });
  }

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <div className="filter__search">
      <select
        value={selectedEmployee}
        onChange={(e) => setSelectedEmployee(e.target.value)}
        className="filter__search--employee"
      >
        <option value="">Todos los empleados</option>
        {employees.map((employee) => (
          <option value={employee.name}>{employee.name}</option>
        ))}
      </select>
      <button className="filter__search--btn" onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};

export default FilterEmployee;
