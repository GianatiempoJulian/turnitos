// ======== Partials ========//
import "./appointmentList.css";

// ======== Importaciones de React ========//
import { useState, useEffect } from "react";

// ======== Librerias ========//
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FilterSlider = ({ setFilterTypeServicie }) => {
  const [typeServicies, setTypeServicie] = useState([]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  const handleFilterClick = (type) => {
    setFilterTypeServicie(type);
  };

  async function getAllTypeServicies() {
    await axios
      .get("http://127.0.0.1:8000/api/typesservicie")
      .then((response) => {
        setTypeServicie(response.data);
        console.log(typeServicies);
      })
      .catch((error) => {
        console.log("Error obteniendo tipo de servicios", error);
      });
  }

  useEffect(() => {
    getAllTypeServicies();
  }, []);

  return (
    <Carousel
      className="filter__slider"
      responsive={responsive}
      removeArrowOnDeviceType={["tablet", "mobile"]}
    >
      <button
        className="filter__slider--btn"
        onClick={() => handleFilterClick("")}
      >
        Todos
      </button>
      {typeServicies.map((type) => (
        <button
          className="filter__slider--btn"
          onClick={() => handleFilterClick(type.name)}
        >
          {type.name}
        </button>
      ))}
    </Carousel>
  );
};
export default FilterSlider;
