import { IxContentHeader } from "@siemens/ix-react";
import { useTranslation } from "react-i18next";

export default function ClassifyMaterials() {
  const { t } = useTranslation();
  return (
    <>
      <IxContentHeader
        slot="header"
        headerTitle={t("classifiedProjects.title")}
      ></IxContentHeader>
    </>
  );
}
