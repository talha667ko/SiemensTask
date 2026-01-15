import {
  IxButton,
  IxContentHeader,
  IxSpinner,
  IxTypography,
  showModal,
  showToast,
} from "@siemens/ix-react";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { MaterialsRow } from "../types/data";
import { ixThemeSpecial } from "../../utils/grid-theme";
import "./ProjectDetails.css";
import { useTranslation } from "react-i18next";
import ChooseClassification from "../_components/ChooseClassification";
import CustomModal from "../_components/ConfirmationModal";
import { useProjectDetails } from "../hooks/useData";

const useHooks = () => {
  const { t } = useTranslation();
  const [searchparams] = useSearchParams();
  const projectNumber = searchparams.get("project");
  const [classifying, setClassifying] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [gridApi, setGridApi] = useState<any>(null);
  const navigation = useNavigate();

  return {
    t,
    projectNumber,
    classifying,
    setClassifying,
    gridApi,
    setGridApi,
    navigation,
  };
};

export default function ProjectDetails() {
  const { t, projectNumber, classifying, setClassifying, gridApi, setGridApi } =
    useHooks();

  const { data: projectDetails, isLoading } = useProjectDetails(
    projectNumber || "error"
  );
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

  const defaultColDef: ColDef = {
    flex: 1,
  };

  const validateConfirmation = async () => {
    if (!projectNumber || !gridApi) return;

    let allClassified = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gridApi.forEachNode((node: any) => {
      if (!node.data.classification || node.data.classification === "") {
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
        setClassifying(false);
      }

      showToast({
        title: t("project.toast.successTitle"),
        message: t("project.toast.successMessage"),
        type: "success",
      });
      showToast({
        title: t("project.toast.errorTitle"),
        message: t("project.toast.errorMessage"),
        type: "error",
      });
      console.log();
      //navigation("/classifymaterials");
    });

    instance.onDismiss.once(() => {
      console.log("Modal dismissed");
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          gridApi.forEachNode((node: any) => {
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
            {classifying ? (
              <div
                style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
              >
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
          </IxContentHeader>
          <header className="header-infos">
            <IxTypography bold format="h1" className="project-name">
              {t("project.projectName")}: <span color="white">Sie 3</span>
            </IxTypography>
            <IxTypography bold format="h1" className="project-name">
              {t("project.materialsCount")}: 15
            </IxTypography>
            <IxTypography bold format="h1" className="project-name">
              {t("project.classified")}: None
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
