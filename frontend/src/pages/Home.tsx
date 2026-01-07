import { useTranslation } from "react-i18next";
import "./Home.css";
import { IxContentHeader } from "@siemens/ix-react";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <IxContentHeader
        slot="header"
        headerTitle={t("home.title")}
      ></IxContentHeader>
    </>
  );
}
