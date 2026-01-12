import { IxContentHeader, IxFieldLabel, IxSelect } from "@siemens/ix-react";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import "./ClassifyMaterials.css";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import type { ProjectsRow } from "../../types/data";
import { ixThemeSpecial } from "../../utils/grid-theme";
import ClassifyRenderer from "../_components/ClassifyRenderer";
import { useNavigate } from "react-router-dom";

export default function ClassifyMaterials() {
  const { t } = useTranslation();
  const navigation = useNavigate();

  const [rowData] = useState<ProjectsRow[]>([
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

  const colDefs = useMemo<ColDef<ProjectsRow>[]>(
    () => [
      { field: "projectNumber", headerName: t("projects.grid.projectNumber") },
      { field: "projectName", headerName: t("projects.grid.projectName") },
      {
        field: "materialsCount",
        headerName: t("projects.grid.materialsCount"),
      },
      {
        field: "classified",
        headerName: t("projects.grid.classified"),
        cellRenderer: ClassifyRenderer,
      },
    ],
    [t]
  );

  const defaultColDef: ColDef = {
    flex: 1,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onProjectSelected = (event: any) => {
    const projectNum = event.data.projectNumber;
    navigation(`/project/${projectNum}`);
  };
  return (
    <>
      <IxContentHeader slot="header" headerTitle={t("projects.title")}>
        <IxFieldLabel>{t("content.searchLabel")} </IxFieldLabel>
        <IxSelect
          name="project-number-option"
          allowClear
          editable
          hideListHeader
          i18nPlaceholderEditable={t("content.searchPlaceholder")}
        ></IxSelect>
      </IxContentHeader>
      <main className="grid-wrapper">
        <div className="grid-container">
          <AgGridReact
            theme={ixThemeSpecial}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            onRowDoubleClicked={onProjectSelected}
            rowStyle={{ cursor: "pointer" }}
          />
        </div>
      </main>
    </>
  );
}
