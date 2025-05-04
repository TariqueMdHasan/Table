import { useState } from "react";
import "./container.css";
// import FourthTable from "./component/fourthTable";
import { useNavigate } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { exportToExcel } from "./component/utils/fileSaver";
import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";
import FinalTable from "./component/finalTable";

function Container() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(5);
  const [jsonData, setJsonData] = useState([]);
  const [handleAllUncheck, setHandleAllUcheck] = useState(null);

  const handleLimit = (e) => {
    setLimit(Number(e.target.value));
    console.log(Number(e.target.value));
    setPage(1);
  };

  const lastPage = Math.ceil(totalData / limit);

  const handleNext = () => {
    if (page < lastPage) setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleExport = () => {
    exportToExcel({ data: jsonData, fileName: "my-data.xlsx" });
  };

  return (
    <div className="container">
      <div className="limitAddDataContainer">
        <p className="tableControl">Table Controls: </p>
        <label>
          <select value={limit} onChange={handleLimit}>
            <option value={1}>Limit: 1</option>
            <option value={2}>Limit: 2</option>
            <option value={3}>Limit: 3</option>
            <option value={4}>Limit: 4</option>
            <option value={5}>Limit: 5</option>
            <option value={6}>Limit: 6</option>
            <option value={7}>Limit: 7</option>
            <option value={8}>Limit: 8</option>
            <option value={9}>Limit: 9</option>
            <option value={10}>Limit: 10</option>
          </select>
        </label>
        <button onClick={() => navigate("/Form")} className="addDataClass">
          Add Data
        </button>
      </div>

      {/* <FourthTable
        page={page}
        setTotalData={setTotalData}
        limit={limit}
        setJsonData={setJsonData}
        clearAll={setHandleAllUcheck}
      /> */}

      <FinalTable
        page={page}
        setTotalData={setTotalData}
        limit={limit}
        setJsonData={setJsonData}
        clearAll={setHandleAllUcheck}
      />
     

       

      <div className="buttonNextPrevContainer">
        <div className="preNextdownloadCheckBtnLeft">
          <button
            className="prevBtn"
            onClick={handlePrev}
            disabled={page === 1}
          >
            <GiPreviousButton />
            Previous
          </button>
          <label htmlFor="clearAll">
            <input
              type="checkbox"
              id="clearAll"
              // onChange={() => handleAllUncheck && handleAllUncheck()}
              onChange={handleAllUncheck}
            />
            Clear All
          </label>
          {/* <button id="clearAll" className="nextBtn" onClick={handleAllUncheck}>
            clear All
          </button> */}
        </div>
        <div className="pageInfo">
          <p>
            page: {page} of {lastPage}
          </p>
          <p className="middleParaPageInfo">||</p>
          {page == lastPage ? (
            <p>
              Row: {totalData} of {totalData}
            </p>
          ) : (
            <p>
              Row: {page * limit} of {totalData}
            </p>
          )}
        </div>
        <div className="preNextdownloadCheckBtnRight">
          <button className="nextBtn" onClick={handleExport}>
            Download <FaDownload />
          </button>
          <button
            className="nextBtn"
            onClick={handleNext}
            disabled={page >= lastPage}
          >
            Next <GiNextButton />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Container;
