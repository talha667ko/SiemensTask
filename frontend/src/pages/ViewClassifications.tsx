import {
  IxContentHeader,
  IxFieldLabel,
  IxSelect,
  IxSpinner,
} from "@siemens/ix-react";
import { useTranslation } from "react-i18next";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { ixThemeSpecial } from "../../utils/grid-theme";
import { useMemo } from "react";
import type { ClassifiedRow } from "../types/data";
import { useNavigate } from "react-router-dom";
import { useClassifiedProjectsData } from "../hooks/useData";

export default function ViewClassifications() {
  const { t } = useTranslation();
  const navigation = useNavigate();

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
      },
      {
        field: "classified_by",
        headerName: t("classifiedProjects.grid.classifiedBy"),
      },
    ],
    [t]
  );

  const defaultColDef: ColDef = {
    flex: 1,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onProjectSelected = (event: any) => {
    const projectNum = event.data.project_number;
    navigation(`/?project=${projectNum}`);
  };
  return (
    <>
      {isLoading ? (
        <IxSpinner />
      ) : (
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
          <main className="grid-wrapper">
            <div className="grid-container">
              <AgGridReact
                theme={ixThemeSpecial}
                rowData={classifiedProjects}
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
