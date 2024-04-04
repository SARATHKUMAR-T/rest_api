import Excel from "exceljs";

export function generateExcelBook<T>(
  sheetName: string,
  headers: { key: string; header: string }[],
  data: T[]
): Excel.Workbook {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  worksheet.columns = headers;

  data.forEach((item) => {
    worksheet.addRow(item);
  });

  return workbook;
}
