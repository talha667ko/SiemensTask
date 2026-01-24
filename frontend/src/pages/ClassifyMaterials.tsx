import {
  IxButton,
  IxContentHeader,
  IxFieldLabel,
  IxInput,
  IxSpinner,
  showModal,
} from "@siemens/ix-react";
import "./ClassifyMaterials.css";
import { AgGridReact } from "ag-grid-react";
import { ixThemeSpecial } from "../utils/grid-theme";
import SearchBar from "../_components/SearchBar";
import { useClassifyMaterialsController } from "../hooks/useClassifyMaterials";
import CustomModal from "../_components/ConfirmationModal";
import GenerateProjectsFile from "../utils/ProjectsGenerator";

export default function ClassifyMaterials() {
  const {
    t,
    projects,
    isLoading,
    colDefs,
    quickFilterText,
    onGridReady,
    onProjectSelected,
    onSortChanged,
    handleQuickFilter,
    applyQuickFilter,
    clearQuickFilter,
    defaultColDef,
  } = useClassifyMaterialsController();

  const generationModal = async () => {
    if (!projects) return;
    const instance = await showModal({
      content: <CustomModal typeOfModal="excel" />,
    });

    instance.onClose.once((result) => {
      if (result === true) {
        GenerateProjectsFile(projects, t);
      }
    });
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
              <IxButton onClick={generationModal} style={{ width: "10vw" }}>
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
