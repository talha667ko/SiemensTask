import { useTranslation } from "react-i18next";
import "./Home.css";
import { IxButton, IxContentHeader, IxTypography } from "@siemens/ix-react";
import { useAuthContext } from "../providers/auth-context-provider";
import dayjs from "dayjs";
import { useLogout } from "../hooks/useAuth";

export default function Logout() {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const logout = useLogout();

  const loggingOut = () => {
    logout.mutate();
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
