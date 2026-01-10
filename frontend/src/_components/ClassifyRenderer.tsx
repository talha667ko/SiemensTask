import { iconCheck, iconCircle } from "@siemens/ix-icons/icons";
import { IxIcon } from "@siemens/ix-react";
import "./ClassifyRenderer.css";

export default function ClassifyRenderer(params: any) {
  return params.value ? (
    <div className="success-classification">
      <IxIcon name={iconCheck} size="16"></IxIcon>
      <span style={{ marginLeft: "8px" }}>Classified</span>
    </div>
  ) : (
    <div className="pending-classification">
      <IxIcon name={iconCircle} size="12"></IxIcon>
      <span style={{ marginLeft: "8px" }}>Pending</span>
    </div>
  );
}
