import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './fifthTable.css'
import ColumnResizer from "react-table-column-resizer";

function FifthTable() {
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(()=>{
    const fetchTableData = async()=> {
      try{
        setLoading(true)
        const result = await axios.get(
          `https://table-2jki.onrender.com/api/table/data?limit=5&page=1`
        )
        setTableData(result.data.data)
        return console.log(result.data.data)
        
        
      }catch(error){
        console.error('not able to fetch data', error)
      }finally{
        setLoading(false)
      }
    }
    fetchTableData();
  },[])


  return (
    <div>
      {
        loading ? (<p>loading...</p>):(
          <table class="column_resize_table">
            <thead>
              <tr>
                <th>
                  name
                  <ColumnResizer className="columnResizer" minWidth={0} />
                </th>
                <th>
                  desctiption
                  <ColumnResizer className="columnResizer" minWidth={0} />
                </th>
                <th>
                  amount
                  <ColumnResizer className="columnResizer" minWidth={0} />
                </th>
              </tr>
            </thead>
            <tbody>
              {
                tableData.map((row, index)=> (
                  <tr key={row._id || index}>
                    <td>{row.name}<ColumnResizer className="columnResizer" minWidth={0} /></td>
                    <td>{row.description}<ColumnResizer className="columnResizer" minWidth={0} /></td>
                    <td>{row.amount}<ColumnResizer className="columnResizer" minWidth={0} /></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default FifthTable