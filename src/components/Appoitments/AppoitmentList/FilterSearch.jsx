import "./appoitmentList.css";

const FilterSearch = () => {

    return (
        <div className="filter__search">
            <input type="date" className="filter__search--date"/>
            <button className="filter__search--btn">Buscar</button>
        </div>
    );
}
export default FilterSearch;