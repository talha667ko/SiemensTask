import {
  IxButton,
  IxContentHeader,
  IxTypography,
  showModal,
  showToast,
} from "@siemens/ix-react";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { MaterialsRow } from "../types/data";
import { ixThemeSpecial } from "../../utils/grid-theme";
import "./ProjectDetails.css";
import { useTranslation } from "react-i18next";
import ChooseClassification from "../_components/ChooseClassification";
import CustomModal from "../_components/ConfirmationModal";

const useHooks = () => {
  const { t } = useTranslation();
  const { projectNumber } = useParams<{ projectNumber: string }>();
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

  const [rowData] = useState<MaterialsRow[]>([
    {
      materialNumber: "MAT-001",
      classificationDate: "2024-01-15",
      classification: "",
      classifiedBy: "John Doe",
    },
    {
      materialNumber: "MAT-002",
      classificationDate: "2024-01-16",
      classification: "",
      classifiedBy: "Jane Smith",
    },
    {
      materialNumber: "MAT-003",
      classificationDate: "2024-01-17",
      classification: "",
      classifiedBy: "John Doe",
    },
    {
      materialNumber: "MAT-004",
      classificationDate: "2024-01-18",
      classification: "",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-005",
      classificationDate: "2024-01-19",
      classification: "",
      classifiedBy: "Jane Smith",
    },
    {
      materialNumber: "MAT-006",
      classificationDate: "2024-01-20",
      classification: "",
      classifiedBy: "John Doe",
    },
    {
      materialNumber: "MAT-007",
      classificationDate: "2024-01-21",
      classification: "",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-008",
      classificationDate: "2024-01-22",
      classification: "",
      classifiedBy: "Jane Smith",
    },
    {
      materialNumber: "MAT-009",
      classificationDate: "2024-01-23",
      classification: "",
      classifiedBy: "John Doe",
    },
    {
      materialNumber: "MAT-010",
      classificationDate: "2024-01-24",
      classification: "",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-007",
      classificationDate: "2024-01-21",
      classification: "",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-008",
      classificationDate: "2024-01-22",
      classification: "",
      classifiedBy: "Jane Smith",
    },
    {
      materialNumber: "MAT-009",
      classificationDate: "2024-01-23",
      classification: "",
      classifiedBy: "John Doe",
    },
    {
      materialNumber: "MAT-010",
      classificationDate: "2024-01-24",
      classification: "",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-007",
      classificationDate: "2024-01-21",
      classification: "",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-008",
      classificationDate: "2024-01-22",
      classification: "",
      classifiedBy: "Jane Smith",
    },
    {
      materialNumber: "MAT-009",
      classificationDate: "2024-01-23",
      classification: "",
      classifiedBy: "John Doe",
    },
    {
      materialNumber: "MAT-010",
      classificationDate: "2024-01-24",
      classification: "",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-007",
      classificationDate: "2024-01-21",
      classification: "",
      classifiedBy: "Mike Johnson",
    },
    {
      materialNumber: "MAT-008",
      classificationDate: "2024-01-22",
      classification: "",
      classifiedBy: "Jane Smith",
    },
    {
      materialNumber: "MAT-009",
      classificationDate: "2024-01-23",
      classification: "",
      classifiedBy: "John Doe",
    },
    {
      materialNumber: "MAT-010",
      classificationDate: "2024-01-24",
      classification: "",
      classifiedBy: "Mike Johnson",
    },
  ]);
  const colDefs = useMemo<ColDef<MaterialsRow>[]>(
    () => [
      {
        field: "materialNumber",
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
        field: "classificationDate",
        headerName: t("project.grid.classificationDate"),
      },
      {
        field: "classifiedBy",
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
      <IxContentHeader
        slot="header"
        headerTitle={`${t("project.projectNumber")}: n°${projectNumber}`}
      >
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
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            onGridReady={(params) => setGridApi(params.api)}
          />
        </div>
      </main>
    </>
  );
}
