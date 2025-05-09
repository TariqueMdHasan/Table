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

const FourthTable = ({ page, setTotalData, limit, setJsonData }) => {
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
        setJsonData(result.data.data);
        setTotalData(result.data.totalData);
        // console.log(result.data)
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(page);
  }, [page, limit, setTotalData, setJsonData]);

  

  //   1. check function: Done
  const handleCheckboxChange = async(id) => {
    const dataById = checkData.find(item => item._id === id)
    if(!dataById) return toast.error("data not found")
    // console.log(dataById)
    try{
      await axios.patch(`https://table-2jki.onrender.com/api/table/data/${id}`,
        {checkbox : !dataById.checkbox}
      )
      // console.log(result.data)

      if(dataById.checkbox){
        toast.success("task unchecked successfully")
      }else{
        toast.success("task checked successfully")
      }
      

      setCheckData(prev => 
        prev.map(item => 
          item._id === id ? {...item, checkbox: !item.checkbox } : item
        )
      )

    }catch(error){
      console.error("not able to check, try again later", error)
      toast.error("not able to check, try again later")
    }

  };




  
  

    // 2. Delete function: Done
  
  
  const handleAllCheckChange = async () => {
    const allChecked = checkData.every(item => item.checkbox);
    const updatedCheck = !allChecked;
  
    try {
      await Promise.all(
        checkData.map(item =>
          axios.patch(
            `https://table-2jki.onrender.com/api/table/data/${item._id}`,
            { checkbox: updatedCheck }
          )
        )
      );
  
      const updated = checkData.map(item => ({
        ...item,
        checkbox: updatedCheck,
      }));
      setCheckData(updated);
  
      toast.success(updatedCheck ? "All checked" : "All unchecked");
    } catch (err) {
      console.error("Error updating checkboxes", err);
      toast.error("Failed to update checkboxes");
    }
  };

 
  
  
  
  
  
  
  
  
  
  
  
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://table-2jki.onrender.com/api/table/data/${id}`
      );

      const result = await axios.get(
        `https://table-2jki.onrender.com/api/table/data?limit=${limit}&page=${page}`
      );
      setCheckData(result.data.data);
      setTotalData(result.data.totalData);

      toast.success("task deleted sucessfully");
    } catch (error) {
      console.error("not delete! try again later", error);
      toast.error("task not able to delete");
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="column_resize_table">
          <thead>
            <tr>
              <th className="toBeSticked1">
                <input
                  type="checkbox"
                  className="check-rl-pad"
                  onChange={handleAllCheckChange}
                  checked={
                    checkData.length > 0 &&
                    checkData.every((item) => item.checkbox)
                  }
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
                        <LuArrowUpDown
                          className="arrow"
                          onClick={handleAmount}
                        />
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
          <tbody>
            {checkData.map((row, index) => (
              <tr key={index}>
                <td className="toBeSticked1">
                  <input
                    type="checkbox"
                    checked={row.checkbox}
                    onChange={() => handleCheckboxChange(row._id)}
                    className="check-rl-pad"
                  />
                </td>
                {headerItem.map((column, columnIndex) =>
                  column.label === "delete" ? (
                    <React.Fragment key={index}>
                      <td key={column.id}>
                        <MdDelete
                          // onClick={() => handleDelete(index)}
                          onClick={() => handleDelete(row._id)}
                          className="delete"
                        />
                      </td>
                      <ColumnResizer
                        className="columnResizer t-widthning"
                        minWidth={0}
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment key={`${row._id}-${column.id}`}>
                      <td
                        key={column.id}
                        className={`td-pad-lr ${
                          columnIndex === 0 ? "toBeSticked2" : ""
                        }`}
                      >
                        {/* {row[column.label]} */}
                        {column.label === "avatar" ? (
                          <img
                            src={row[column.label]}
                            alt="avatar"
                            className="avatar-img"
                          />
                        ) : (
                          row[column.label]
                        )}
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
        </table>
      )}
    </div>
  );
};

export default FourthTable;
