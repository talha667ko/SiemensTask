import { IxContentHeader, IxEventList } from "@siemens/ix-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import "./ClassifyMaterials.css";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { getIxTheme } from "@siemens/ix-aggrid";
import * as agGrid from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const ixTheme = getIxTheme(agGrid);
agGrid.provideGlobalGridOptions({
  theme: ixTheme,
});

interface IRow {
  classified: boolean;
  projectNumber: string;
  projectName: string;
  materialsCount: number;
}
export default function ClassifyMaterials() {
  const { t } = useTranslation();
  // Row Data: The data to be displayed.
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<IRow[]>([
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
      classified: true,
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "HondaRS",
      materialsCount: 10,
      classified: true,
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
    { field: "projectNumber" },
    { field: "projectName" },
    { field: "materialsCount" },
    { field: "classified" },
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <>
      <IxContentHeader
        slot="header"
        headerTitle={t("projects.title")}
      ></IxContentHeader>
      <IxEventList>
        <div className="grid-container">
          <AgGridReact
            theme={ixTheme}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </IxEventList>
    </>
  );
}
