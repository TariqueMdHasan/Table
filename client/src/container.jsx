import { useState } from "react";
import "./container.css";

// import SecondTable from './component/secondTable'
// import Table from './component/table'
// import ThirdTable from './component/3table'
import FourthTable from "./component/fourthTable";
// import Form from './component/form'
import { useNavigate } from "react-router-dom";
// import FifthTable from './component/fifthTable'

function Container() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(5)

  const handleLimit = (e) => {
    setLimit(Number(e.target.value))
    console.log(Number(e.target.value))
    setPage(1)
  }

  const lastPage = Math.ceil(totalData / limit);

  const handleNext = () => {
    if(page<lastPage) setPage((prev) => prev + 1)
  };
  const handlePrev = () => {
    if (page < lastPage) setPage((prev) => prev - 1);
  };

  return (
    <div className="container">
      <div className="limitAddDataContainer">
        <label > Select Limit:
          <select value={limit} onChange={handleLimit}>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </label>
        <button 
          onClick={() => navigate("/Form")}
          className="addDataClass"
        >Add Data</button>
      </div>

      <FourthTable page={page} setTotalData={setTotalData} limit={limit}/>

      <div className="buttonNextPrevContainer">
        <button className="prevBtn" onClick={handlePrev} disabled={page === 1}>
          Previous
        </button>
        <div>
          <p>
            {page}/{lastPage}
          </p>
        </div>
        <button
          className="nextBtn"
          onClick={handleNext}
          disabled={page >= lastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Container;
