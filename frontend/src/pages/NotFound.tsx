import { IxTypography } from "@siemens/ix-react";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <>
      <IxTypography
        slot="header"
        bold
        format="display-xxl"
      >{`(404) ${t("404.title")}`}</IxTypography>
      <IxTypography bold format="display-lg">
        {t("404.tip")}
      </IxTypography>
    </>
  );
}
