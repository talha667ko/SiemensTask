import {
  IxButton,
  IxContentHeader,
  IxFieldLabel,
  IxSpinner,
} from "@siemens/ix-react";
import { useTranslation } from "react-i18next";
import { useMemo, useRef } from "react";
import "./ClassifyMaterials.css";
import type {
  ColDef,
  FilterChangedEvent,
  GridApi,
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
import { useSearchParams } from "react-router-dom";
import { decodeFilter, encodeFilter } from "../utils/UrlFormatting";

const useHooks = () => {
  const { t } = useTranslation();
  const navigation = useSmartNavigate();
  const { data: projects, isLoading } = useProjectsData();
  const [searchParams, setSearchParams] = useSearchParams();
  const gridApiRef = useRef<GridApi | null>(null);

  const colDefs = useMemo<ColDef<ProjectsRow>[]>(
    () => [
      {
        field: "project_number",
        headerName: t("projects.grid.projectNumber"),
      },
      {
        field: "project_name",
        headerName: t("projects.grid.projectName"),
      },
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

  return {
    t,
    navigation,
    projects,
    isLoading,
    searchParams,
    setSearchParams,
    gridApiRef,
    colDefs,
  };
};

export default function ClassifyMaterials() {
  const {
    t,
    navigation,
    projects,
    isLoading,
    searchParams,
    setSearchParams,
    gridApiRef,
    colDefs,
  } = useHooks();
  const defaultColDef: ColDef = {
    flex: 1,
  };

  const onGridReady = (params: { api: GridApi }) => {
    gridApiRef.current = params.api;
    const filterModel: Record<string, unknown> = {};

    searchParams.forEach((value, key) => {
      if (key.startsWith("f_")) {
        const decoded = decodeFilter(value);
        if (decoded) {
          filterModel[decoded.field] = decoded.filter;
        } else {
          console.error("could not decode");
        }
      }
    });
    if (Object.keys(filterModel).length > 0) {
      params.api.setFilterModel(filterModel);
    }
  };

  const onFilterChanged = (event: FilterChangedEvent) => {
    if (!event.api) return;

    const filterModel = event.api.getFilterModel();
    const newParams = new URLSearchParams(searchParams);

    Array.from(newParams.keys()).forEach((key) => {
      if (key.startsWith("f_")) {
        newParams.delete(key);
      }
    });

    let index = 0;
    Object.entries(filterModel).forEach(([field, filter]) => {
      newParams.set(`f_${index}`, encodeFilter(field, filter));
      index++;
    });

    setSearchParams(newParams, { replace: true });
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
                quickFilterText="5"
                rowStyle={{ cursor: "pointer" }}
              />
            </div>
          </main>
        </>
      )}
    </>
  );
}
