import { useNavigate } from "react-router-dom";
import "./backward.css";

const Backward = () =>{

    const navigate = useNavigate();

    const handleGoBack = (e) => {
        e.preventDefault();
        navigate(-1); 
    }

    return (
        <>
            <a className="backward__container" onClick={handleGoBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                <span>Regresar</span>
            </a>
        </>
    );
}

export default Backward