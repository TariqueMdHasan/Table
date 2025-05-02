import React, { useState } from "react";
// import ColumnResizer from "react-table-column-resizer";
import "./SecondTable.css";
import { MdDelete } from "react-icons/md";
import { LuArrowUpDown } from "react-icons/lu";

const tableHeader = [
  { id: "th-1", label: "name", className: "th" },
  { id: "th-2", label: "description", className: "th" },
  { id: "th-3", label: "amount", className: "th" },
  { id: "th-4", label: "avatar", className: "th" },
  { id: "th-5", label: "delete", className: "th" },
];

const tableData = [
  {
    name: "Tarique",
    description: "wev dev and we have something good",
    amount: 1111,
    check: true,
    avatar: "hello",
  },
  {
    name: "Sahla",
    description: "biology",
    amount: 2222,
    check: false,
    avatar: "hello",
  },
  {
    name: "Abid",
    description: "teacher",
    amount: 3333,
    check: true,
    avatar: "hello",
  },
  {
    name: "Sitara",
    description: "owner",
    amount: 4444,
    check: true,
    avatar: "hello",
  },
  {
    name: "Tofi",
    description: "basketball",
    amount: 5555,
    check: false,
    avatar: "hello",
  },
];

const SecondTable = () => {
  const [checkData, setCheckData] = useState(tableData);
  const [dragIndex, setDragIndex] = useState(null);
  const [headerItem, setHeaderItem] = useState(tableHeader);
  const [amountNumber, setAmountNumber] = useState(null)


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
  const handleDelete = (index) => {
    const newArr = [...checkData];
    newArr.splice(index, 1);
    setCheckData(newArr);
  };


  //   3. dnd fuctions: dnd-beautiful not working as well as tailwind
  // onDrop, onDragover, onDragStart, draggable: Done
  const handleDragStart = (index) => {
    console.log(index);
    setDragIndex(index);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (index) => {
    console.log(index);
    if(dragIndex === null || dragIndex ===index){
        return 
    }

    const newHeader = [...headerItem]
    const dragged = newHeader[dragIndex]
    newHeader.splice(dragIndex, 1)
    newHeader.splice(index, 0, dragged);
    setHeaderItem(newHeader)
    setDragIndex(null)
  };


//   increase and decrease order amount: Done
  const handleAmount = () => {
    let newOrder = amountNumber == "asc"? "desc" : "asc";
    setAmountNumber(newOrder)

    const sorted = [...checkData].sort((a, b) => {
        return newOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    })
    setCheckData(sorted)
  }


//   width increament and decreament

  return (
    <div>
      <table className="column_resize_table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={handleAllCheckChange} />
            </th>
            {headerItem.map((column, index) => (
              <th
                className="th"
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
            ))}
          </tr>
        </thead>
        <tbody>
          {checkData.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={row.check}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
              {headerItem.map((column) =>
                column.label === "delete" ? (
                  <td key={column.id}>
                    <MdDelete
                      onClick={() => handleDelete(index)}
                      className="delete"
                    />
                  </td>
                ) : (
                  <td key={column.id}>{row[column.label]}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SecondTable;
