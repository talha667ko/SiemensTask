import {
  IxContentHeader,
  IxEventList,
  IxFieldLabel,
  IxSelect,
} from "@siemens/ix-react";
import { useTranslation } from "react-i18next";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { ixThemeSpecial } from "../../utils/grid-theme";
import { useState } from "react";
import type { ClassifiedRow } from "../../types/data";

export default function ViewClassifications() {
  const { t } = useTranslation();
  const [rowData, setRowData] = useState<ClassifiedRow[]>([
    {
      projectNumber: "fgfgtrhj",
      projectName: "Sie 1",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2024",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Tesla",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Ford",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Mercedes",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: false,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "HondaRS",
      materialsCount: 10,
      classified: true,
      classifiedBy: "John doe",
      date: "22-10-2025",
    },
  ]);

  const [colDefs, setColDefs] = useState<ColDef<ClassifiedRow>[]>([
    { field: "projectNumber", headerName: t("classified.grid.projectNumber") },
    { field: "projectName", headerName: t("classified.grid.projectName") },
    {
      field: "materialsCount",
      headerName: t("classified.grid.materialsCount"),
    },
    { field: "classified", headerName: t("classified.grid.classified") },
    { field: "date", headerName: t("classified.grid.date") },
    { field: "classifiedBy", headerName: t("classified.grid.classifiedBy") },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <>
      <IxContentHeader
        slot="header"
        headerTitle={t("classifiedProjects.title")}
      >
        <IxFieldLabel>{t("projects.searchLabel")} </IxFieldLabel>
        <IxSelect
          name="project-number-option"
          allowClear
          editable
          hideListHeader
          i18nPlaceholderEditable={t("projects.searchPlaceholder")}
        ></IxSelect>
      </IxContentHeader>
      <IxEventList>
        <div className="grid-container">
          <AgGridReact
            theme={ixThemeSpecial}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </IxEventList>
    </>
  );
}
