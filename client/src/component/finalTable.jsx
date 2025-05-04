import React, { useState, useEffect } from "react";
import ColumnResizer from "react-table-column-resizer";
import "./finalTable.css";
import { MdDelete } from "react-icons/md";
import { LuArrowUpDown } from "react-icons/lu";
import axios from "axios";
import toast from "react-hot-toast";

const initialHeaders = [
  { id: "name", label: "name", className: "th" },
  { id: "description", label: "description", className: "th" },
  { id: "amount", label: "amount", className: "th" },
  { id: "avatar", label: "avatar", className: "th" },
  { id: "delete", label: "delete", className: "th" },
];

const FinalTable = ({ page, setTotalData, limit, setJsonData }) => {
  const [checkData, setCheckData] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [headerItem, setHeaderItem] = useState(initialHeaders);
  const [amountOrder, setAmountOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await axios.get("https://table-2jki.onrender.com/api/column/getConfig");
        console.log(res.data)

        const { columnWidth, columnOrder } = res.data.config;

        if (columnOrder?.length) {
          const reordered = columnOrder
            .map(id => initialHeaders.find(col => col.id === id))
            .filter(Boolean);
          setHeaderItem(reordered);
        }

        if (columnWidth) setColumnWidths(columnWidth);
      } catch (err) {
        console.error("Error loading column config", err);
        toast.error("Column config could not be loaded.");
      }
    };

    loadConfig();
  }, []);

  const saveColumnConfig = async (newWidths = columnWidths, newOrder = headerItem) => {
    try {
      await axios.post("https://table-2jki.onrender.com/api/column/postConfig", {
        columnWidth: newWidths,
        columnOrder: newOrder.map(col => col.id),
      });
      toast.success("Column layout saved!");
    } catch (err) {
      console.error("Error saving column config", err);
      toast.error("Failed to save column config.");
    }
  };

  // const handleResize = (e, id) => {
  //   const th = e.target.previousSibling;
  //   if (!th) return;
  //   const width = th.offsetWidth;
  //   const updated = { ...columnWidths, [id]: width };
  //   setColumnWidths(updated);
  //   saveColumnConfig(updated, headerItem);
  // };

  const handleResize = (e, id) => {
    setTimeout(() => {
      const th = e.target.previousSibling;
      if (!th) return;
      const width = th.offsetWidth;
      const updated = { ...columnWidths, [id]: width };
      setColumnWidths(updated);
      saveColumnConfig(updated, headerItem);
    }, 0); 
  };
  

  const fetchData = async (pageNum) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://table-2jki.onrender.com/api/table/data?limit=${limit}&page=${pageNum}`);
      setCheckData(res.data.data);
      setJsonData(res.data.data);
      setTotalData(res.data.totalData);
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page, limit]);

  const handleCheckboxChange = async (id) => {
    const item = checkData.find(row => row._id === id);
    if (!item) return toast.error("Item not found.");

    try {
      await axios.patch(`https://table-2jki.onrender.com/api/table/data/${id}`, {
        checkbox: !item.checkbox,
      });

      setCheckData(prev =>
        prev.map(row =>
          row._id === id ? { ...row, checkbox: !row.checkbox } : row
        )
      );

      toast.success(item.checkbox ? "Unchecked!" : "Checked!");
    } catch (err) {
      console.error("Checkbox update failed", err);
      toast.error("Could not update checkbox.");
    }
  };

  const handleAllCheckChange = async () => {
    const allChecked = checkData.every(item => item.checkbox);
    const newCheck = !allChecked;

    try {
      await Promise.all(
        checkData.map(item =>
          axios.patch(`https://table-2jki.onrender.com/api/table/data/${item._id}`, {
            checkbox: newCheck,
          })
        )
      );

      setCheckData(prev => prev.map(item => ({ ...item, checkbox: newCheck })));
      toast.success(newCheck ? "All checked" : "All unchecked");
    } catch (err) {
      console.error("Bulk checkbox update failed", err);
      toast.error("Failed to update checkboxes.");
    }
  };



  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://table-2jki.onrender.com/api/table/data/${id}`);
      fetchData(page);
      toast.success("Task deleted.");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete task.");
    }
  };












  const handleDragStart = (index) => setDragIndex(index);

  const handleDrop = (index) => {
    if (dragIndex === null || dragIndex === index) return;
    const newHeaders = [...headerItem];
    const dragged = newHeaders[dragIndex];
    newHeaders.splice(dragIndex, 1);
    newHeaders.splice(index, 0, dragged);
    setHeaderItem(newHeaders);
    setDragIndex(null);
    saveColumnConfig(columnWidths, newHeaders);
  };

  const handleAmountSort = () => {
    const newOrder = amountOrder === "asc" ? "desc" : "asc";
    setAmountOrder(newOrder);

    const sorted = [...checkData].sort((a, b) =>
      newOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
    );
    setCheckData(sorted);
  };

  return (
    <div className="tableContainer">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="column_resize_table">
          <thead>
            <tr>
              <th className="toBeSticked1" style={{ width: 40 }}>
                <input
                  type="checkbox"
                  className="check-rl-pad"
                  onChange={handleAllCheckChange}
                  checked={checkData.length > 0 && checkData.every(row => row.checkbox)}
                />
              </th>
              {headerItem.map((col, index) => (
                <React.Fragment key={col.id}>
                  <th
                    className={`${index === 0 ? "toBeSticked2" : ""} th`}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(index)}
                    style={{ width: columnWidths[col.id] }}
                  >
                    {col.label === "amount" ? (
                      <>
                        Amount <LuArrowUpDown className="arrow" onClick={handleAmountSort} />
                      </>
                    ) : (
                      col.label
                    )}
                  </th>
                  <ColumnResizer
                    className="columnResizer t-widthning"
                    minWidth={0}
                    onMouseUp={(e) => handleResize(e, col.id)}
                  />
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {checkData.map((row) => (
              <tr key={row._id}>
                <td className="toBeSticked1">
                  <input
                    type="checkbox"
                    checked={row.checkbox}
                    onChange={() => handleCheckboxChange(row._id)}
                    className="check-rl-pad"
                  />
                </td>
                {headerItem.map((col, colIndex) => {
                  const isSticky = colIndex === 0 ? "toBeSticked2" : "";
                  return (
                    <React.Fragment key={`${row._id}-${col.id}`}>
                      <td className={`td-pad-lr ${isSticky}`}>
                        {col.label === "avatar" ? (
                          <img src={row[col.label]} alt="avatar" className="avatar-img" />
                        ) : col.label === "delete" ? (
                          <MdDelete onClick={() => handleDelete(row._id)} className="delete" />
                        ) : (
                          row[col.label]
                        )}
                      </td>
                      <ColumnResizer
                        className="columnResizer t-widthning"
                        minWidth={0}
                        onMouseUp={(e) => handleResize(e, col.id)}
                      />
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FinalTable;

