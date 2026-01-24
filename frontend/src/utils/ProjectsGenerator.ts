import ExcelJS from "exceljs";
import type { ProjectsRow } from "../types/data";
import type { TFunction } from "i18next";
import dayjs from "dayjs";
import { showToast } from "@siemens/ix-react";

export default async function GenerateProjectsFile(
  projects: ProjectsRow[],
  t: TFunction,
) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(t("projects.title"));

    worksheet.mergeCells("A1:D1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = t("projects.excel.title") || t("projects.title");
    titleCell.font = { size: 16, bold: true, color: { argb: "FFFFFF" } };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };
    titleCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00E5AA" },
    };

    worksheet.addRow([]);

    const headerRow = worksheet.addRow([
      t("projects.grid.projectNumber"),
      t("projects.grid.projectName"),
      t("projects.grid.materialsCount"),
      t("projects.grid.classified"),
    ]);

    headerRow.font = { bold: true, size: 12 };
    headerRow.alignment = { horizontal: "center", vertical: "middle" };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "E0E0E0" },
    };

    projects.forEach((project, index) => {
      const row = worksheet.addRow([
        project.project_number,
        project.project_name,
        project.materials_count,
        project.classified ? t("global.classified") : t("global.pending"),
      ]);

      if (index % 2 === 0) {
        row.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "F5F5F5" },
        };
      }

      row.getCell(3).alignment = { horizontal: "center" };
      row.getCell(4).alignment = { horizontal: "center" };
    });

    worksheet.columns.forEach((column, index) => {
      let maxLength = 0;
      column.eachCell?.({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ? cell.value.toString() : "";
        maxLength = Math.max(maxLength, cellValue.length);
      });

      const minWidths = [20, 30, 18, 15];
      column.width = Math.max(maxLength + 2, minWidths[index] || 15);
    });

    const lastRow = worksheet.lastRow?.number || 0;
    for (let row = 3; row <= lastRow; row++) {
      for (let col = 1; col <= 4; col++) {
        const cell = worksheet.getCell(row, col);
        cell.border = {
          top: { style: "thin", color: { argb: "CCCCCC" } },
          bottom: { style: "thin", color: { argb: "CCCCCC" } },
          left: { style: "thin", color: { argb: "CCCCCC" } },
          right: { style: "thin", color: { argb: "CCCCCC" } },
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
    link.download = `Projects_${dayjs().format("YYYY-MM-DD")}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);

    showToast({
      title: t("project.toast.successTitle"),
      message: t("excel.toastMessageS"),
      type: "success",
    });
  } catch (error) {
    console.error(error);
    showToast({
      title: t("project.toast.errorTitle"),
      message: t("excel.toastMessageE"),
      type: "error",
    });
  }
}
