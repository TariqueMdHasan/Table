import React, { useState } from "react";
import "./table.css";
import { MdDelete } from "react-icons/md";
import {
  ColumnResize
} from "react-table-column-resizer";

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
    description: "wev dev",
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

const Table = () => {
  const [checkData, setCheckData] = useState(tableData);

  const [columns, setColumns] = useState(tableHeader);
  const [dragIndex, setDragIndex] = useState(null);

//   const [columnWidths, setColumnWidths] = useState(
//     Array(columns.length).fill(150)
//   );

  //   check functions for one and all for frontend only (will do it in bakend later)
  const handleCheckboxChange = (index) => {
    const newCheck = [...checkData];
    newCheck[index].check = !newCheck[index].check;
    setCheckData(newCheck);
  };

  const allChecked = checkData.every((item) => item.check);

  const handleAllCheckChange = () => {
    const newCheck = checkData.map((item) => ({
      ...item,
      check: !allChecked,
    }));
    setCheckData(newCheck);
  };

  //   delete function for (frontend for now, will do it for backend later)
  const handleDelete = (index) => {
    const newCheck = [...checkData];
    newCheck.splice(index, 1);
    setCheckData(newCheck);
  };

  //   functions for dnd
  // getting index from where i am dragging
  const handleDragColStart = (index) => {
    setDragIndex(index);
    console.log(index);
  };
  // preventing default browser behavior so that i can set it to some index
  const handledragOver = (e) => e.preventDefault();

  const handleDrop = (index) => {
    const newColumns = [...columns];
    const draggedItem = newColumns.splice(dragIndex, 1)[0];
    newColumns.splice(index, 0, draggedItem);
    console.log(index);
    setColumns(newColumns);
  };

  return (
    <div className="tableContainer">
        <table className="column_resize_table">
          <thead>
            <tr>
              <th className="th-chbox">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={handleAllCheckChange}
                />
              </th>
              {columns.map((columnName, index) => (
                <th
                  className={columnName.className}
                  key={index}
                  id={columnName.id}
                  draggable
                  onDragStart={() => handleDragColStart(index)}
                  onDragOver={handledragOver}
                  onDrop={() => handleDrop(index)}
                >
                    <div>
                        {columnName.label}
                        <ColumnResizer className="columnResizer" minWidth={0} />
                    </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {checkData.map((rowData, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={rowData.check}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                {columns.map((col) => (
                  <td key={col.id} >
                    {col.label === "delete" ? (
                      <MdDelete onClick={() => handleDelete(index)} />
                    ) : (
                      rowData[col.label]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};

export default Table;
