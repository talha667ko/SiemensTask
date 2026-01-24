import {
  IxButton,
  IxContentHeader,
  IxFieldLabel,
  IxInput,
  IxSpinner,
} from "@siemens/ix-react";
import { useTranslation } from "react-i18next";
import { useMemo, useRef, useState } from "react";
import "./ClassifyMaterials.css";
import type {
  ColDef,
  GridApi,
  RowDoubleClickedEvent,
  SortChangedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import type { ProjectsRow } from "../types/data";
import { ixThemeSpecial } from "../utils/grid-theme";
import ClassifyRenderer from "../_components/ClassifyRenderer";
import { useProjectsData } from "../hooks/useData";
import SearchBar from "../_components/SearchBar";
import { useSmartNavigate } from "../hooks/useSmartNavigate";
import { useSearchParams } from "react-router-dom";

const useHooks = () => {
  const { t } = useTranslation();
  const navigation = useSmartNavigate();
  const { data: projects, isLoading } = useProjectsData();
  const [searchParams, setSearchParams] = useSearchParams();
  const gridApiRef = useRef<GridApi | null>(null);
  const [quickFilterText, setQuickFilterText] = useState<string>("");

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
    quickFilterText,
    setQuickFilterText,
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
    quickFilterText,
    setQuickFilterText,
  } = useHooks();
  const defaultColDef: ColDef = {
    flex: 1,
  };

  const onGridReady = (params: { api: GridApi }) => {
    gridApiRef.current = params.api;

    const sortModel: Array<{ colId: string; sort: "asc" | "desc" }> = [];
    searchParams.forEach((value, key) => {
      if (key.startsWith("s_")) {
        const [field, sort] = value.split(":");
        if (field && (sort === "asc" || sort === "desc")) {
          sortModel.push({ colId: field, sort: sort as "asc" | "desc" });
        }
      }
    });
    if (sortModel.length > 0) {
      params.api.applyColumnState({
        state: sortModel,
        defaultState: { sort: null },
      });
    }

    const qf = searchParams.get("qf");
    if (qf && gridApiRef.current) {
      gridApiRef.current.setGridOption("quickFilterText", qf);
    }
  };

  const onProjectSelected = (event: RowDoubleClickedEvent) => {
    const projectNum = event.data.project_number;
    navigation(`/?project=${projectNum}`);
  };

  const onSortChanged = (event: SortChangedEvent) => {
    if (!event.api) return;

    const columnState = event.api.getColumnState();
    const newParams = new URLSearchParams(searchParams);

    Array.from(newParams.keys()).forEach((key) => {
      if (key.startsWith("s_")) {
        newParams.delete(key);
      }
    });

    let index = 0;
    columnState.forEach((col) => {
      if (col.sort) {
        newParams.set(`s_${index}`, `${col.colId}:${col.sort}`);
        index++;
      }
    });
    setSearchParams(newParams, { replace: true });
  };

  const handleQuickFilter = (event: CustomEvent) => {
    const value = event.detail as string;
    setQuickFilterText(value);
  };

  const applyQuickFilter = () => {
    if (gridApiRef.current) {
      gridApiRef.current.setGridOption("quickFilterText", quickFilterText);

      const newParams = new URLSearchParams(searchParams);
      if (quickFilterText.trim()) {
        newParams.set("qf", quickFilterText);
      } else {
        newParams.delete("qf");
      }
      setSearchParams(newParams, { replace: true });
    }
  };

  const clearQuickFilter = () => {
    setQuickFilterText("");
    if (gridApiRef.current) {
      gridApiRef.current.setGridOption("quickFilterText", "");
    }
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("qf");
    setSearchParams(newParams, { replace: true });
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
                width: "full",
                gap: 5,
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <IxFieldLabel>{t("content.searchLabel")} </IxFieldLabel>
              <SearchBar
                projectNumbers={projects?.map((p) => p.project_number)}
              />
            </div>
          </IxContentHeader>
          <main className="grid-wrapper">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "full",
                gap: 5,
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "full",
                  gap: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IxInput
                  style={{ width: "15vw" }}
                  placeholder={t("project.filterPlaceholder")}
                  value={quickFilterText}
                  onValueChange={handleQuickFilter}
                ></IxInput>
                <IxButton style={{ width: "10vw" }} onClick={applyQuickFilter}>
                  {t("project.filterButton")}
                </IxButton>

                <IxButton
                  style={{ width: "10vw" }}
                  variant="secondary"
                  onClick={clearQuickFilter}
                >
                  {t("project.filterClear")}
                </IxButton>
              </div>
              <IxButton style={{ width: "10vw" }}>
                {t("excel.download")}
              </IxButton>
            </div>
            <div className="grid-container">
              <AgGridReact
                theme={ixThemeSpecial}
                rowData={projects}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                onSortChanged={onSortChanged}
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
