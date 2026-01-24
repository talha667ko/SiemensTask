import { useTranslation } from "react-i18next";
import type { ColDef } from "ag-grid-community";
import { useMemo } from "react";
import type { ClassifiedRow } from "../types/data";
import { useClassifiedProjectsData } from "./useData";
import dayjs from "dayjs";
import { useSmartNavigate } from "./useSmartNavigate";

export const useViewClassController = () => {
  const { t } = useTranslation();
  const navigation = useSmartNavigate();

  const { data: classifiedProjects, isLoading } = useClassifiedProjectsData();

  const colDefs = useMemo<ColDef<ClassifiedRow>[]>(
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
        field: "classification_date_time",
        headerName: t("classifiedProjects.grid.date"),
        valueFormatter: (params) => {
          if (!params.value) return "";
          return dayjs(params.value).format("DD-MM-YYYY HH:mm:ss");
        },
      },
      {
        field: "classified_by",
        headerName: t("classifiedProjects.grid.classifiedBy"),
      },
    ],
    [t],
  );

  const defaultColDef: ColDef = {
    flex: 1,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onProjectSelected = (event: any) => {
    const projectNum = event.data.project_number;
    navigation(`/?project=${projectNum}`);
  };

  return {
    onProjectSelected,
    defaultColDef,
    classifiedProjects,
    isLoading,
    colDefs,
    t,
    navigation,
  };
};
