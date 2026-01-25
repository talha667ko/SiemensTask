import { useTranslation } from "react-i18next";
import { useMemo, useRef, useState } from "react";
import type {
  ColDef,
  GridApi,
  RowDoubleClickedEvent,
  SortChangedEvent,
} from "ag-grid-community";
import type { ProjectsRow } from "../types/data";
import ClassifyRenderer from "../_components/ClassifyRenderer";
import { useProjectsData } from "../hooks/useData";
import { useSmartNavigate } from "../hooks/useSmartNavigate";
import { useSearchParams } from "react-router-dom";

export const useClassifyMaterialsController = () => {
  const { t } = useTranslation();
  const navigation = useSmartNavigate();
  const { data: projects, isLoading } = useProjectsData();
  const [searchParams, setSearchParams] = useSearchParams();
  const gridApiRef = useRef<GridApi | null>(null);
  const [quickFilterText, setQuickFilterText] = useState<string>("");

  const defaultColDef: ColDef = {
    flex: 1,
  };
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
    navigation(`/classifymaterials?project=${projectNum}`);
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
    onGridReady,
    onProjectSelected,
    onSortChanged,
    handleQuickFilter,
    applyQuickFilter,
    clearQuickFilter,
    defaultColDef,
  };
};
