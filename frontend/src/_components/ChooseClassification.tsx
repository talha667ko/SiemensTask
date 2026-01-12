import { IxRadio, IxRadioGroup } from "@siemens/ix-react";
import "./ChooseClassification.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ChooseClassification(params: any) {
  return (
    <IxRadioGroup
      direction="row"
      value={params.value}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onValueChange={(event: any) => {
        const newValue = event.detail;
        params.setValue(newValue);
      }}
    >
      <IxRadio label=" A" value="A"></IxRadio>
      <IxRadio label=" B" value="B"></IxRadio>
      <IxRadio label=" C" value="C"></IxRadio>
      <IxRadio label=" D" value="D"></IxRadio>
    </IxRadioGroup>
  );
}
