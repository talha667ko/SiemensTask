import {
  IxButton,
  IxContentHeader,
  IxSpinner,
  IxTypography,
  showModal,
  showToast,
} from "@siemens/ix-react";
import type { ColDef, IRowNode, GridApi } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { MaterialsRow, ProjectDetails } from "../types/data";
import { ixThemeSpecial } from "../../utils/grid-theme";
import "./ProjectDetails.css";
import { useTranslation } from "react-i18next";
import ChooseClassification from "../_components/ChooseClassification";
import CustomModal from "../_components/ConfirmationModal";
import { useProjectDetails, useSetClassifications } from "../hooks/useData";
import { useAuthContext } from "../providers/auth-context-provider";

const useHooks = () => {
  const { t } = useTranslation();
  const [searchparams] = useSearchParams();
  const projectNumber = searchparams.get("project");
  const [classifying, setClassifying] = useState(false);
  const [gridApi, setGridApi] = useState<GridApi>();
  const navigation = useNavigate();
  const { user: user } = useAuthContext();

  const { data: projectDetails, isLoading } = useProjectDetails(
    projectNumber || "NONE"
  );

  const {
    mutate: setClassifications,
    isPending,
    isError,
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
      },
      {
        field: "classification_date_time",
        headerName: t("project.grid.classificationDate"),
      },
      {
        field: "classified_by",
        headerName: t("project.grid.classifiedBy"),
      },
    ],
    [t, classifying]
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
    isError,
    isSuccess,
    user,
  };
};

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
    user,
  } = useHooks();

  const defaultColDef: ColDef = {
    flex: 1,
  };

  const validateConfirmation = async () => {
    if (!projectNumber || !gridApi || !projectDetails) return;

    let allClassified = true;
    gridApi.forEachNode((node: IRowNode<MaterialsRow>) => {
      if (!node.data?.classification || node.data?.classification === "") {
        allClassified = false;
      }
    });

    if (!allClassified) {
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
            classified_by: user?.user_metadata.display_name,
          },
          {
            onSuccess: () => {
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
          }
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
        if (gridApi) {
          gridApi.forEachNode((node: IRowNode<MaterialsRow>) => {
            node.setDataValue("classification", "");
          });
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
  return (
    <>
      {isLoading ? (
        <IxSpinner />
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
              <IxButton>{t("global.back")}</IxButton>
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
            {t("global.confirm")}
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
