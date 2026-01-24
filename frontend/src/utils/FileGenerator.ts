import ExcelJS from "exceljs";
import type { MaterialsRow, ProjectDetails } from "../types/data";
import dayjs from "dayjs";
import { showToast } from "@siemens/ix-react";

export default async function GenerateFile(
  projectDetails: ProjectDetails,
  t: (key: string) => string,
) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet();

    worksheet.mergeCells("A1:D1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = t("excel.title");
    titleCell.font = { size: 16, bold: true, color: { argb: "FFF" } };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };
    titleCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00E5AA" },
    };
    titleCell.font = { ...titleCell.font, color: { argb: "FFFFFF" } };

    worksheet.getCell("A3").value = `${t("excel.projectNumber")}:`;
    worksheet.getCell("B3").value = projectDetails.project_number;
    worksheet.getCell("A4").value = `${t("excel.projectName")}:`;
    worksheet.getCell("B4").value = projectDetails.project_name;
    worksheet.getCell("A5").value = `${t("excel.materialsCount")}:`;
    worksheet.getCell("B5").value = projectDetails.materials_count;
    worksheet.getCell("A6").value = `${t("excel.classified")}:`;
    worksheet.getCell("B6").value = projectDetails.classified
      ? t("global.yes")
      : t("global.no");

    ["A3", "A4", "A5", "A6"].forEach((cell) => {
      worksheet.getCell(cell).font = { bold: true };
    });

    worksheet.addRow([]);

    const headerRow = worksheet.addRow([
      t("project.grid.materialNumber"),
      t("project.grid.classification"),
      t("project.grid.classificationDate"),
      t("project.grid.classifiedBy"),
    ]);
    headerRow.alignment = { horizontal: "center", vertical: "middle" };

    const materials: MaterialsRow[] =
      projectDetails.classified_materials_data_of_project || [];

    materials.forEach((material) => {
      const row = worksheet.addRow([
        material.material_number,
        material.classification ? `Class ${material.classification}` : "",
        material.classification_date_time
          ? dayjs(material.classification_date_time).format(
              "DD-MM-YYYY HH:mm:ss",
            )
          : "",
        material.classified_by || "",
      ]);

      if (row.number % 2 === 0) {
        row.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "dbf3f5" },
        };
      }
    });

    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell?.({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ? cell.value.toString() : "";
        maxLength = Math.max(maxLength, cellValue.length);
      });
      column.width = maxLength < 10 ? 10 : maxLength + 2;
    });

    const lastRow = worksheet.lastRow?.number || 0;
    for (let row = 8; row <= lastRow; row++) {
      for (let col = 1; col <= 4; col++) {
        const cell = worksheet.getCell(row, col);
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
      }
    }

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Project_${projectDetails.project_number}_${dayjs().format(
      "YYYY-MM-DD",
    )}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);

    showToast({
      title: t("project.toast.successTitle"),
      message: t("excel.toastMessageS"),
      type: "success",
    });
  } catch (error) {
    console.log(error);
    showToast({
      title: "ERROR",
      message: t("excel.toastMessageE"),
      type: "error",
    });
  }
}
