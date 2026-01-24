import {
  IxButton,
  IxContentHeader,
  IxSpinner,
  IxTypography,
  showModal,
  showToast,
} from "@siemens/ix-react";
import type { IRowNode } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import type { MaterialsRow, ProjectDetails } from "../types/data";
import { ixThemeSpecial } from "../utils/grid-theme";
import "./ProjectDetails.css";
import CustomModal from "../_components/ConfirmationModal";
import GenerateFile from "../utils/FileGenerator";
import { useProjectDetailsController } from "../hooks/useProjectDetailsController";

export default function ProjectDetails() {
  const {
    classifying,
    setClassifying,
    t,
    projectNumber,
    isLoading,
    projectDetails,
    colDefs,
    setGridApi,
    gridApi,
    setClassifications,
    setInvalidRows,
    invalidRows,
    defaultColDef,
  } = useProjectDetailsController();

  const validateConfirmation = async () => {
    if (!projectNumber || !gridApi || !projectDetails) return;

    const missing: string[] = [];

    gridApi.forEachNode((node: IRowNode<MaterialsRow>) => {
      if (!node.data?.classification || node.data?.classification === "") {
        if (node.data?.material_number) {
          missing.push(node.data.material_number);
        }
      }
    });

    console.log(missing);
    if (missing.length > 0) {
      setInvalidRows(missing);
      gridApi.redrawRows();
      showToast({
        title: t("project.toast.errorTitle"),
        message: t("project.toast.errorMessageConfirm"),
        type: "error",
      });
      return;
    }

    const instance = await showModal({
      content: (
        <CustomModal typeOfModal="confirm" projectNumber={projectNumber} />
      ),
    });

    instance.onClose.once((result) => {
      if (result === true) {
        const materials: Array<{
          material_number: string;
          classification: string;
        }> = [];

        gridApi.forEachNode((node: IRowNode<MaterialsRow>) => {
          if (node.data) {
            materials.push({
              material_number: node.data.material_number,
              classification: node.data.classification,
            });
          }
        });
        setClassifications(
          {
            project_id: projectDetails.id,
            project_number: projectDetails.project_number,
            materials: materials,
            classified_by:
              localStorage.getItem("display_name") || "Burak Yahsi",
          },
          {
            onSuccess: () => {
              setInvalidRows([]);
              setClassifying(false);
              showToast({
                title: t("project.toast.successTitle"),
                message: t("project.toast.successMessage"),
                type: "success",
              });
            },
            onError: () => {
              showToast({
                title: t("project.toast.errorTitle"),
                message: t("project.toast.errorMessage"),
                type: "error",
              });
            },
          },
        );
      }
      //navigation("/classifymaterials");
    });

    instance.onDismiss.once(() => {
      console.log("Modal dismissed");
      console.log(projectDetails?.classified);
    });
  };

  const cancelClassification = async () => {
    if (!projectNumber) return;
    const instance = await showModal({
      content: (
        <CustomModal typeOfModal="cancel" projectNumber={projectNumber} />
      ),
    });

    instance.onClose.once((result) => {
      if (result === true) {
        setInvalidRows([]);
        if (gridApi) {
          gridApi.forEachNode((node: IRowNode<MaterialsRow>) => {
            node.setDataValue("classification", "");
          });
          gridApi.redrawRows();
        }
        showToast({
          title: t("project.toast.infoTitle"),
          message: t("project.toast.infoMessage"),
          type: "info",
        });
        setClassifying(false);
      }
    });
  };

  const generationModal = async () => {
    if (!projectDetails) return;
    const instance = await showModal({
      content: <CustomModal typeOfModal="excel" />,
    });

    instance.onClose.once((result) => {
      if (result === true) {
        GenerateFile(projectDetails, t);
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
          <IxContentHeader
            slot="header"
            headerTitle={`${t("project.projectNumber")}: n°${projectNumber}`}
          >
            {!projectDetails?.classified ? (
              <ClassificationButtons
                classifying={classifying}
                setClassifying={setClassifying}
                t={t}
                cancelClassification={cancelClassification}
                validateConfirmation={validateConfirmation}
              />
            ) : (
              <IxButton onClick={() => generationModal()}>
                {t("excel.download")}
              </IxButton>
            )}
          </IxContentHeader>
          <header className="header-infos">
            <IxTypography bold format="h1" className="project-name">
              {t("project.projectName")}:{" "}
              <span color="white">{projectDetails?.project_name}</span>
            </IxTypography>
            <IxTypography bold format="h1" className="project-name">
              {t("project.materialsCount")}: {projectDetails?.materials_count}
            </IxTypography>
            <IxTypography bold format="h1" className="project-name">
              {t("project.classified")}:{" "}
              {projectDetails?.classified ? t("global.yes") : t("global.no")}
            </IxTypography>
          </header>
          <main className="grid-wrapper">
            <div className="grid-container">
              <AgGridReact
                theme={ixThemeSpecial}
                rowData={projectDetails?.classified_materials_data_of_project}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                onGridReady={(params) => setGridApi(params.api)}
                context={{ setInvalidRows, invalidRows }}
              />
            </div>
          </main>
        </>
      )}
    </>
  );
}

function ClassificationButtons({
  classifying,
  setClassifying,
  t,
  cancelClassification,
  validateConfirmation,
}: {
  classifying: boolean;
  setClassifying: (value: boolean) => void;
  t: (key: string) => string;
  cancelClassification: () => void;
  validateConfirmation: () => void;
}) {
  return (
    <>
      {classifying ? (
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <IxButton onClick={() => cancelClassification()}>
            {t("global.cancel")}{" "}
          </IxButton>
          <IxButton onClick={() => validateConfirmation()}>
            {t("global.submit")}
          </IxButton>
        </div>
      ) : (
        <IxButton onClick={() => setClassifying(true)}>
          {t("global.classify")}
        </IxButton>
      )}
    </>
  );
}
