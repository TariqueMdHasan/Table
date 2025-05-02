import React, { useState, useEffect } from "react";
import ColumnResizer from "react-table-column-resizer";
import "./fourthTable.css";
import { MdDelete } from "react-icons/md";
import { LuArrowUpDown } from "react-icons/lu";
import axios from "axios";
import toast from "react-hot-toast";

const tableHeader = [
  { id: "th-1", label: "name", className: "th" },
  { id: "th-2", label: "description", className: "th" },
  { id: "th-3", label: "amount", className: "th" },
  { id: "th-4", label: "avatar", className: "th" },
  { id: "th-5", label: "delete", className: "th" },
];

const FourthTable = ({ page, setTotalData, limit }) => {
  const [checkData, setCheckData] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [headerItem, setHeaderItem] = useState(tableHeader);
  const [amountNumber, setAmountNumber] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (pageNum) => {
      try {
        setLoading(true);
        const result = await axios.get(
          `https://table-2jki.onrender.com/api/table/data?limit=${limit}&page=${pageNum}`
        );
        setCheckData(result.data.data);
        console.log(result.data.data);
        setTotalData(result.data.totalData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(page);
  }, [page, limit, setTotalData]);

  //   1. check function: Done
  const handleCheckboxChange = (index) => {
    const newArr = [...checkData];
    newArr[index].check = !newArr[index].check;
    setCheckData(newArr);
  };
  const handleAllCheckChange = () => {
    const allChecked = checkData.every((item) => item.check);
    const newCheck = checkData.map((item) => ({
      ...item,
      check: !allChecked,
    }));
    setCheckData(newCheck);
  };

  //   2. Delete function: Done
  const handleDelete = async(id) => {
    // const newArr = [...checkData];
    // newArr.splice(index, 1);
    // setCheckData(newArr);
    // https://table-2jki.onrender.com/api/table/data/68101297adf59f69a2756920
    try{
      await axios.delete(`https://table-2jki.onrender.com/api/table/data/${id}`)
      // setCheckData(newArr)
      // toast.success('task deleted sucessfully 1111')

      const result = await axios.get(
        `https://table-2jki.onrender.com/api/table/data?limit=${limit}&page=${page}`
      );
      setCheckData(result.data.data);
      setTotalData(result.data.totalData);



      toast.success('task deleted sucessfully 2222')
      
    }catch(error){
      console.error('not delete! try again later', error)
      toast.error('task not able to delete')
    }
  };

  //   3. dnd fuctions: dnd-beautiful not working as well as tailwind
  // onDrop, onDragover, onDragStart, draggable: Done
  const handleDragStart = (index) => {
    // console.log(index);
    setDragIndex(index);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (index) => {
    // console.log(index);
    if (dragIndex === null || dragIndex === index) {
      return;
    }

    const newHeader = [...headerItem];
    const dragged = newHeader[dragIndex];
    newHeader.splice(dragIndex, 1);
    newHeader.splice(index, 0, dragged);
    setHeaderItem(newHeader);
    setDragIndex(null);
  };

  //   4. increase and decrease order amount: Done
  const handleAmount = () => {
    let newOrder = amountNumber == "asc" ? "desc" : "asc";
    setAmountNumber(newOrder);

    const sorted = [...checkData].sort((a, b) => {
      return newOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    });
    setCheckData(sorted);
  };

  //   5. width increament and decreament
  //   used library: Done

  //   6. sticky: Done

  //   7. have to fix sticky UI

  return (
    <div className="tableContainer">
      <table className="column_resize_table">
        <thead>
          <tr>
            <th className="toBeSticked1">
              <input
                type="checkbox"
                className="check-rl-pad"
                onChange={handleAllCheckChange}
              />
            </th>

            {headerItem.map((column, index) => (
              <React.Fragment key={index}>
                <th
                  className={index === 0 ? "toBeSticked2 th" : "th"}
                  key={index}
                  draggable
                  id={column.id}
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                >
                  {column.label === "amount" ? (
                    <>
                      Amount
                      <LuArrowUpDown className="arrow" onClick={handleAmount} />
                    </>
                  ) : (
                    column.label
                  )}
                </th>
                <ColumnResizer
                  className="columnResizer t-widthning"
                  minWidth={0}
                />
              </React.Fragment>
            ))}
          </tr>
        </thead>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <tbody>
            {checkData.map((row, index) => (
              <tr key={index}>
                <td className="toBeSticked1">
                  <input
                    type="checkbox"
                    checked={row.check}
                    onChange={() => handleCheckboxChange(index)}
                    className="check-rl-pad"
                  />
                </td>
                {headerItem.map((column, columnIndex) =>
                  column.label === "delete" ? (
                    <React.Fragment key={index}>
                      <td key={column.id}>
                        <MdDelete
                          // onClick={() => handleDelete(index)}
                          onClick={()=> handleDelete(row._id)}
                          className="delete"
                        />
                      </td>
                      <ColumnResizer
                        className="columnResizer t-widthning"
                        minWidth={0}
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment key={index}>
                      <td
                        key={column.id}
                        className={`td-pad-lr ${
                          columnIndex === 0 ? "toBeSticked2" : ""
                        }`}
                      >
                        {/* {row[column.label]} */}
                        {
                          column.label === "avatar" ? (
                            <img
                              src={row[column.label]}
                              alt="avatar"
                              className="avatar-img"
                            />
                          ): 
                          (row[column.label])
                        }
                      </td>
                      <ColumnResizer
                        className="columnResizer t-widthning"
                        minWidth={0}
                      />
                    </React.Fragment>
                  )
                )}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default FourthTable;
