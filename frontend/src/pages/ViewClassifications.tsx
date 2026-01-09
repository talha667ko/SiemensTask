import {
  IxContentHeader,
  IxEventList,
  IxFieldLabel,
  IxSelect,
} from "@siemens/ix-react";
import { useTranslation } from "react-i18next";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { ixThemeSpecial } from "../../utils/grid-theme";
import { useMemo, useState } from "react";
import type { ClassifiedRow } from "../../types/data";

export default function ViewClassifications() {
  const { t } = useTranslation();
  const [rowData] = useState<ClassifiedRow[]>([
    {
      projectNumber: "fgfgtrhj",
      projectName: "Sie 1",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2024",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Tesla",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Ford",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Mercedes",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "Honda",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "BMW",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
    {
      projectNumber: "fgfgtrhj",
      projectName: "HondaRS",
      materialsCount: 10,

      classifiedBy: "John doe",
      date: "22-10-2025",
    },
  ]);

  const colDefs = useMemo<ColDef<ClassifiedRow>[]>(
    () => [
      {
        field: "projectNumber",
        headerName: t("projects.grid.projectNumber"),
      },
      {
        field: "projectName",
        headerName: t("projects.grid.projectName"),
      },
      {
        field: "materialsCount",
        headerName: t("projects.grid.materialsCount"),
      },

      { field: "date", headerName: t("classifiedProjects.grid.date") },
      {
        field: "classifiedBy",
        headerName: t("classifiedProjects.grid.classifiedBy"),
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
        headerTitle={t("classifiedProjects.title")}
      >
        <IxFieldLabel>{t("content.searchLabel")} </IxFieldLabel>
        <IxSelect
          name="project-number-option"
          allowClear
          editable
          hideListHeader
          i18nPlaceholderEditable={t("content.searchPlaceholder")}
        ></IxSelect>
      </IxContentHeader>
      <IxEventList>
        <div className="grid-container">
          <AgGridReact
            theme={ixThemeSpecial}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </IxEventList>
    </>
  );
}
