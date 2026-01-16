import { iconCheck, iconCircle } from "@siemens/ix-icons/icons";
import { IxIcon } from "@siemens/ix-react";
import "./ClassifyRenderer.css";
import { useTranslation } from "react-i18next";
import type { ICellRendererParams } from "ag-grid-community";

export default function ClassifyRenderer(params: ICellRendererParams) {
  const { t } = useTranslation();
  return params.value ? (
    <div className="success-classification">
      <IxIcon name={iconCheck} size="16"></IxIcon>
      <span style={{ marginLeft: "8px" }}>{t("global.classified")}</span>
    </div>
  ) : (
    <div className="pending-classification">
      <IxIcon name={iconCircle} size="12"></IxIcon>
      <span style={{ marginLeft: "8px" }}>{t("global.pending")}</span>
    </div>
  );
}
