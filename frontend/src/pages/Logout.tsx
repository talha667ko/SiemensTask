import { useTranslation } from "react-i18next";
import "./Home.css";
import {
  IxButton,
  IxContentHeader,
  IxTypography,
  showModal,
  showToast,
} from "@siemens/ix-react";
import { useAuthContext } from "../providers/auth-context-provider";
import dayjs from "dayjs";
import { useLogout } from "../hooks/useAuth";
import CustomModal from "../_components/ConfirmationModal";

export default function Logout() {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const logout = useLogout();

  const loggingOut = async () => {
    const instance = await showModal({
      content: <CustomModal typeOfModal="logout" />,
    });

    instance.onClose.once((result) => {
      if (result === true) {
        logout.mutate();
        showToast({
          title: t("logout.toast.errorTitle"),
          message: t("logout.toast.successMessage"),
          type: "info",
        });
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
          {t("logout.email")} {user?.email}
        </IxTypography>
        <IxTypography bold format="display-xs">
          {t("logout.display_name")}
          {user?.email}
        </IxTypography>
        <IxTypography bold format="display-xs">
          {t("logout.created_at")}
          {user?.user_metadata.display_name}
        </IxTypography>
        <IxTypography bold format="display-xs">
          {t("logout.created_at")}
          {dayjs(user?.created_at).format("DD-MM-YYYY HH:mm:ss")}
        </IxTypography>
        <IxButton onClick={loggingOut} style={{ marginTop: "2rem" }}>
          {t("logout.logout")}
        </IxButton>
      </ul>
    </>
  );
}
