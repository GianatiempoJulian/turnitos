import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./appointmentList.css";

const FilterSlider = () => {

    
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 3
        }
      };
      
    return (
        <Carousel className="filter__slider" 
        responsive={responsive} 
        removeArrowOnDeviceType={["tablet", "mobile"]}
        >
            <button className="filter__slider--btn">Uñas</button>
            <button className="filter__slider--btn">Cejas</button>
            <button className="filter__slider--btn">Pestañas</button>
            <button className="filter__slider--btn">ETC</button>
            <button className="filter__slider--btn">ETC</button>
            <button className="filter__slider--btn">ETC</button>
        </Carousel>
    );
}
export default FilterSlider;