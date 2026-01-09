import {
  IxContentHeader,
  IxEventList,
  IxFieldLabel,
  IxSelect,
} from "@siemens/ix-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import "./ClassifyMaterials.css";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import type { ProjectsRow } from "../../types/data";
import { ixThemeSpecial } from "../../utils/grid-theme";

export default function ClassifyMaterials() {
  const { t } = useTranslation();

  const [rowData, setRowData] = useState<ProjectsRow[]>([
    {
      projectNumber: "fgfgtrhj",
      projectName: "Sie 1",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Tesla",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Ford",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Mercedes",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,
      classified: false,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "HondaRS",
      materialsCount: 10,
      classified: true,
    },
  ]);

  const [colDefs, setColDefs] = useState<ColDef<ProjectsRow>[]>([
    { field: "projectNumber", headerName: t("projects.grid.projectNumber") },
    { field: "projectName", headerName: t("projects.grid.projectName") },
    { field: "materialsCount", headerName: t("projects.grid.materialsCount") },
    { field: "classified", headerName: t("projects.grid.classified") },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <>
      <IxContentHeader slot="header" headerTitle={t("projects.title")}>
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
