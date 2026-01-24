import type { ColDef, GridApi } from "ag-grid-community";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { MaterialsRow } from "../types/data";
import { useTranslation } from "react-i18next";
import ChooseClassification from "../_components/ChooseClassification";
import { useProjectDetails, useSetClassifications } from "./useData";
import dayjs from "dayjs";
import { useSmartNavigate } from "./useSmartNavigate";
import { showToast } from "@siemens/ix-react";

export const useProjectDetailsController = () => {
  const { t } = useTranslation();
  const [searchparams] = useSearchParams();
  const projectNumber = searchparams.get("project");
  const [classifying, setClassifying] = useState(false);
  const [gridApi, setGridApi] = useState<GridApi>();
  const navigation = useSmartNavigate();
  const [invalidRows, setInvalidRows] = useState<string[]>([]);

  const {
    data: projectDetails,
    isLoading,
    isError: isProjectDetailsError,
    error,
  } = useProjectDetails(projectNumber || "NONE");

  useEffect(() => {
    if (isProjectDetailsError && error) {
      showToast({
        title: t("project.toast.errorTitle"),
        message: error.message,
        type: "error",
      });

      navigation("/classifyMaterials");
    }
  }, [isProjectDetailsError, error, navigation, t]);

  useEffect(() => {
    if (!classifying) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    const handlePopState = () => {
      const shouldCancel = window.confirm(t("project.confirmLeave"));

      if (!shouldCancel) {
        window.history.pushState(null, "", window.location.href);
      } else {
        setClassifying(false);
        setInvalidRows([]);
        if (gridApi) {
          gridApi.forEachNode((node) => {
            node.setDataValue("classification", "");
          });
          gridApi.redrawRows();
        }
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [classifying, gridApi, t]);
  const defaultColDef: ColDef = {
    flex: 1,
  };

  const {
    mutate: setClassifications,
    isPending,
    isError: isSetClassificationsError,
    isSuccess,
  } = useSetClassifications();
  const colDefs = useMemo<ColDef<MaterialsRow>[]>(
    () => [
      {
        field: "material_number",
        headerName: t("project.grid.materialNumber"),
      },
      {
        field: "classification",
        headerName: t("project.grid.classification"),
        cellRenderer: classifying ? ChooseClassification : undefined,
        valueFormatter: (params) => {
          if (classifying || !params.value) return "";
          return `Class ${params.value}`;
        },
        cellStyle: (params) => {
          if (!params.data) return null;
          const isInvalid = invalidRows?.includes(params.data.material_number);
          if (classifying && isInvalid && !params.value) {
            return {
              background: "var(--theme-color-alarm-10)",
              border: "1px solid var(--theme-color-alarm)",
              borderRadius: "4px",
            };
          }
          return null;
        },
      },
      {
        field: "classification_date_time",
        headerName: t("project.grid.classificationDate"),
        valueFormatter: (params) => {
          if (!params.value) return "";
          return dayjs(params.value).format("DD-MM-YYYY HH:mm:ss");
        },
      },
      {
        field: "classified_by",
        headerName: t("project.grid.classifiedBy"),
      },
    ],
    [t, classifying, invalidRows],
  );

  return {
    t,
    projectNumber,
    classifying,
    setClassifying,
    gridApi,
    setGridApi,
    navigation,
    projectDetails,
    isLoading,
    colDefs,
    setClassifications,
    isPending,
    isSuccess,
    invalidRows,
    isSetClassificationsError,
    setInvalidRows,
    defaultColDef,
  };
};
