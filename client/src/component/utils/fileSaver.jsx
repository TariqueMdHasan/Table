import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function exportToExcel({ data, fileName = 'data.xlsx', sheetName = 'Sheet1' }) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(file, fileName);
}
