import { IxContentHeader, IxFieldLabel, IxSpinner } from "@siemens/ix-react";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import "./ClassifyMaterials.css";
import type { ColDef, RowDoubleClickedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import type { ProjectsRow } from "../types/data";
import { ixThemeSpecial } from "../utils/grid-theme";
import ClassifyRenderer from "../_components/ClassifyRenderer";
import { useProjectsData } from "../hooks/useData";
import SearchBar from "../_components/SearchBar";
import { useSmartNavigate } from "../hooks/useSmartNavigate";

export default function ClassifyMaterials() {
  const { t } = useTranslation();
  const navigation = useSmartNavigate();
  const { data: projects, isLoading } = useProjectsData();

  const colDefs = useMemo<ColDef<ProjectsRow>[]>(
    () => [
      { field: "project_number", headerName: t("projects.grid.projectNumber") },
      { field: "project_name", headerName: t("projects.grid.projectName") },
      {
        field: "materials_count",
        headerName: t("projects.grid.materialsCount"),
      },
      {
        field: "classified",
        headerName: t("projects.grid.classified"),
        cellRenderer: ClassifyRenderer,
      },
    ],
    [t],
  );

  const defaultColDef: ColDef = {
    flex: 1,
  };

  const onProjectSelected = (event: RowDoubleClickedEvent) => {
    const projectNum = event.data.project_number;
    navigation(`/?project=${projectNum}`);
  };
  return (
    <>
      {isLoading ? (
        <main className="spinner-wrapper">
          <IxSpinner />
        </main>
      ) : (
        <>
          <IxContentHeader slot="header" headerTitle={t("projects.title")}>
            <IxFieldLabel>{t("content.searchLabel")} </IxFieldLabel>
            <SearchBar
              projectNumbers={projects?.map((p) => p.project_number)}
            />
          </IxContentHeader>
          <main className="grid-wrapper">
            <div className="grid-container">
              <AgGridReact
                theme={ixThemeSpecial}
                rowData={projects}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                onRowDoubleClicked={onProjectSelected}
                rowStyle={{ cursor: "pointer" }}
              />
            </div>
          </main>
        </>
      )}
    </>
  );
}
