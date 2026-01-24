import { IxContentHeader, IxFieldLabel, IxSpinner } from "@siemens/ix-react";
import { AgGridReact } from "ag-grid-react";
import { ixThemeSpecial } from "../utils/grid-theme";
import SearchBar from "../_components/SearchBar";
import { useViewClassController } from "../hooks/useViewClassController";

export default function ViewClassifications() {
  const {
    onProjectSelected,
    defaultColDef,
    classifiedProjects,
    isLoading,
    colDefs,
    t,
  } = useViewClassController();
  return (
    <>
      {isLoading ? (
        <main className="spinner-wrapper">
          <IxSpinner />
        </main>
      ) : (
        <>
          <IxContentHeader
            slot="header"
            headerTitle={t("classifiedProjects.title")}
          >
            <IxFieldLabel>{t("content.searchLabel")} </IxFieldLabel>
            <SearchBar
              projectNumbers={classifiedProjects?.map(
                (cp) => cp.project_number,
              )}
            />
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
