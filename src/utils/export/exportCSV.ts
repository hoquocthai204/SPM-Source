import { DATE_TIME_FILE_NAME_FORMAT } from 'consts';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import date from 'date-and-time';

export const exportToCSV = (csvData: {[header: string]: any}[], fileName: string) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const ws = XLSX.utils.json_to_sheet(csvData);

  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };

  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  const data = new Blob([excelBuffer], { type: fileType });

  FileSaver.saveAs(
    data,
    `${fileName}_${date.format(new Date(), DATE_TIME_FILE_NAME_FORMAT)}${fileExtension}`
  );
};

/* Using function Export CSV: exportToCSV(dataExport, Title);
 Title is name of file csv after export
 dataExport is an array of objects(key, value) (key is header, value is content) containing 
 the elements to export to the csv file

          datasExportFromAPI.map((data, index) => {
            const obj = {
              'No': index + 1,        (No and Name is header, behind them is content)
              'Name: data.userName,
            };
            dataExport.push(obj);
          });
          exportToCSV(dataExport, 'Export Name ');

*/
