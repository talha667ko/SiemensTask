import { IxRadio, IxRadioGroup } from "@siemens/ix-react";
import "./ChooseClassification.css";

export default function ChooseClassification() {
  return (
    <IxRadioGroup direction="row">
      <IxRadio label=" A" value="A"></IxRadio>
      <IxRadio label=" B" value="B"></IxRadio>
      <IxRadio label=" C" value="C"></IxRadio>
      <IxRadio label=" D" value="D"></IxRadio>
    </IxRadioGroup>
  );
}
