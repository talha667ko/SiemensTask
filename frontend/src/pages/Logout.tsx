import { useTranslation } from "react-i18next";
import "./Home.css";
import {
  IxButton,
  IxContentHeader,
  IxTypography,
  showModal,
} from "@siemens/ix-react";
import CustomModal from "../_components/ConfirmationModal";
import { useSmartNavigate } from "../hooks/useSmartNavigate";

export default function Logout() {
  const { t } = useTranslation();
  const navigation = useSmartNavigate();

  const loggingOut = async () => {
    const instance = await showModal({
      content: <CustomModal typeOfModal="logout" />,
    });

    instance.onClose.once((result) => {
      if (result === true) {
        navigation("/login");
      }
    });
  };
  return (
    <>
      <IxContentHeader
        slot="header"
        headerTitle={t("logout.title")}
      ></IxContentHeader>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5rem",
          gap: "1rem",
          maxWidth: "20%",
          marginInline: "auto",
        }}
      >
        <IxTypography bold format="display-xs">
          {}
        </IxTypography>
        <IxTypography bold format="display-xs">
          {t("logout.display_name")}
          {}
        </IxTypography>
        <IxTypography bold format="display-xs">
          {t("logout.created_at")}
          {}
        </IxTypography>
        <IxTypography bold format="display-xs">
          {t("logout.created_at")}
          {}
        </IxTypography>
        <IxButton onClick={loggingOut} style={{ marginTop: "2rem" }}>
          {t("logout.logout")}
        </IxButton>
      </ul>
    </>
  );
}
