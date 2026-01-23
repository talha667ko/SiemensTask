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
import { useSearchParams } from "react-router-dom";
import type { MaterialsRow, ProjectDetails } from "../types/data";
import { ixThemeSpecial } from "../utils/grid-theme";
import "./ProjectDetails.css";
import { useTranslation } from "react-i18next";
import ChooseClassification from "../_components/ChooseClassification";
import CustomModal from "../_components/ConfirmationModal";
import { useProjectDetails, useSetClassifications } from "../hooks/useData";
import { useAuthContext } from "../providers/auth-context-provider";
import dayjs from "dayjs";
import GenerateFile from "../utils/FileGenerator";
import { useSmartNavigate } from "../hooks/useSmartNavigate";

const useHooks = () => {
  const { t } = useTranslation();
  const [searchparams] = useSearchParams();
  const projectNumber = searchparams.get("project");
  const [classifying, setClassifying] = useState(false);
  const [gridApi, setGridApi] = useState<GridApi>();
  const navigation = useSmartNavigate();
  const { user: user } = useAuthContext();
  const [invalidRows, setInvalidRows] = useState<string[]>([]);

  const { data: projectDetails, isLoading } = useProjectDetails(
    projectNumber || "NONE",
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
        filter: true,
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
    isError,
    isSuccess,
    user,
    invalidRows,
    setInvalidRows,
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
    setInvalidRows,
    invalidRows,
  } = useHooks();

  const defaultColDef: ColDef = {
    flex: 1,
  };

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
            classified_by: user?.user_metadata.display_name,
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
