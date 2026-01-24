import {
  IxButton,
  IxContentHeader,
  IxFieldLabel,
  IxSpinner,
} from "@siemens/ix-react";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import "./ClassifyMaterials.css";
import type {
  ColDef,
  INumberFilterParams,
  RowDoubleClickedEvent,
} from "ag-grid-community";
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
      {
        field: "project_number",
        headerName: t("projects.grid.projectNumber"),
        filter: true,
        filterParams: {
          filterOptions: ["equals", "contains", "endsWith"],
          buttons: ["apply", "reset"],
          closeOnApply: true,
          maxNumConditions: 1,
        } as INumberFilterParams,
      },
      {
        field: "project_name",
        headerName: t("projects.grid.projectName"),
        filter: true,
        filterParams: {
          filterOptions: ["equals", "contains"],
          buttons: ["apply", "reset"],
          closeOnApply: true,
          maxNumConditions: 1,
        } as INumberFilterParams,
      },
      {
        field: "materials_count",
        headerName: t("projects.grid.materialsCount"),
        filter: "agNumberColumnFilter",
        filterParams: {
          filterOptions: ["equals", "greaterThan", "lessThan"],
          buttons: ["apply", "reset"],
          closeOnApply: true,
          maxNumConditions: 1,
        } as INumberFilterParams,
      },
      {
        field: "classified",
        headerName: t("projects.grid.classified"),
        filter: true,
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <IxButton style={{ width: "10vw" }}>
                {t("excel.download")}
              </IxButton>
              <IxFieldLabel>{t("content.searchLabel")} </IxFieldLabel>
              <SearchBar
                projectNumbers={projects?.map((p) => p.project_number)}
              />
            </div>
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
