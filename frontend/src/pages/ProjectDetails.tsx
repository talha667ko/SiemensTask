import { IxButton, IxContentHeader, IxTypography } from "@siemens/ix-react";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { MaterialsRow } from "../../types/data";
import { ixThemeSpecial } from "../../utils/grid-theme";
import "./ProjectDetails.css";
import { useTranslation } from "react-i18next";

export default function ProjectDetails() {
  const { t } = useTranslation();
  const { projectNumber } = useParams<{ projectNumber: string }>();

  const [rowData] = useState<MaterialsRow[]>([
    {
      materialNumber: "MAT-001",
      classificationDate: "2024-01-15",
      classification: "Category A",
      classifiedBy: "John Doe",
    },
    {
      materialNumber: "MAT-002",
      classificationDate: "2024-01-16",
      classification: "Category B",
      classifiedBy: "Jane Smith",
    },
    {
      materialNumber: "MAT-003",
      classificationDate: "2024-01-17",
      classification: "Category A",
      classifiedBy: "John Doe",
    },
    {
      materialNumber: "MAT-004",
      classificationDate: "2024-01-18",
      classification: "Category C",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-005",
      classificationDate: "2024-01-19",
      classification: "Category B",
      classifiedBy: "Jane Smith",
    },
    {
      materialNumber: "MAT-006",
      classificationDate: "2024-01-20",
      classification: "Category A",
      classifiedBy: "John Doe",
    },
    {
      materialNumber: "MAT-007",
      classificationDate: "2024-01-21",
      classification: "Category C",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-008",
      classificationDate: "2024-01-22",
      classification: "Category B",
      classifiedBy: "Jane Smith",
    },
    {
      materialNumber: "MAT-009",
      classificationDate: "2024-01-23",
      classification: "Category A",
      classifiedBy: "John Doe",
    },
    {
      materialNumber: "MAT-010",
      classificationDate: "2024-01-24",
      classification: "Category C",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-007",
      classificationDate: "2024-01-21",
      classification: "Category C",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-008",
      classificationDate: "2024-01-22",
      classification: "Category B",
      classifiedBy: "Jane Smith",
    },
    {
      materialNumber: "MAT-009",
      classificationDate: "2024-01-23",
      classification: "Category A",
      classifiedBy: "John Doe",
    },
    {
      materialNumber: "MAT-010",
      classificationDate: "2024-01-24",
      classification: "Category C",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-007",
      classificationDate: "2024-01-21",
      classification: "Category C",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-008",
      classificationDate: "2024-01-22",
      classification: "Category B",
      classifiedBy: "Jane Smith",
    },
    {
      materialNumber: "MAT-009",
      classificationDate: "2024-01-23",
      classification: "Category A",
      classifiedBy: "John Doe",
    },
    {
      materialNumber: "MAT-010",
      classificationDate: "2024-01-24",
      classification: "Category C",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-007",
      classificationDate: "2024-01-21",
      classification: "Category C",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-008",
      classificationDate: "2024-01-22",
      classification: "Category B",
      classifiedBy: "Jane Smith",
    },
    {
      materialNumber: "MAT-009",
      classificationDate: "2024-01-23",
      classification: "Category A",
      classifiedBy: "John Doe",
    },
    {
      materialNumber: "MAT-010",
      classificationDate: "2024-01-24",
      classification: "Category C",
      classifiedBy: "Mike Johnson",
    },
  ]);
  const colDefs = useMemo<ColDef<MaterialsRow>[]>(
    () => [
      {
        field: "materialNumber",
        headerName: t("project.grid.materialNumber"),
      },
      {
        field: "classification",
        headerName: t("project.grid.classification"),
        cellRenderer: IxButton,
      },
      {
        field: "classificationDate",
        headerName: t("project.grid.classificationDate"),
      },
      {
        field: "classifiedBy",
        headerName: t("project.grid.classifiedBy"),
      },
    ],
    [t]
  );

  const defaultColDef: ColDef = {
    flex: 1,
  };
  return (
    <>
      <IxContentHeader
        slot="header"
        headerTitle={`${t("project.projectNumber")}: n°${projectNumber}`}
      ></IxContentHeader>
      <header className="header-infos">
        <IxTypography bold format="h1" className="project-name">
          {t("project.projectName")}: <span color="white">Sie 3</span>
        </IxTypography>
        <IxTypography bold format="h1" className="project-name">
          {t("project.materialsCount")}: 15
        </IxTypography>
        <IxTypography bold format="h1" className="project-name">
          {t("project.classified")}: None
        </IxTypography>
      </header>
      <main className="grid-wrapper">
        <div className="grid-container">
          <AgGridReact
            theme={ixThemeSpecial}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </main>
    </>
  );
}
