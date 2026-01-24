import {
  IxApplication,
  IxApplicationHeader,
  IxContent,
  IxDropdownItem,
  IxAvatar,
  IxDropdownButton,
} from "@siemens/ix-react";
import { iconGlobe } from "@siemens/ix-icons/icons";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import "./AuthLayout.css";

export default function AuthLayout() {
  const { t, i18n } = useTranslation();

  const username = localStorage.getItem("display_name") || "Burak Yahsi";
  const email = "with your email";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <IxApplication>
      <IxApplicationHeader className="ix-header" name={t("header.title")}>
        <div className="logo" slot="logo">
          <img
            className="image"
            src={`${import.meta.env.BASE_URL}siemensBig.png`}
            alt=""
          />
        </div>

        <IxDropdownButton
          variant="subtle-tertiary"
          label={t("header.languages")}
          icon={iconGlobe}
        >
          <IxDropdownItem
            label={t("header.turkish")}
            onClick={() => changeLanguage("tr")}
          ></IxDropdownItem>
          <IxDropdownItem
            label={t("header.english")}
            onClick={() => changeLanguage("en")}
          ></IxDropdownItem>
        </IxDropdownButton>
        <IxAvatar username={username} extra={email}></IxAvatar>
      </IxApplicationHeader>

      <IxContent className="auth-content">
        <Outlet />
      </IxContent>
    </IxApplication>
  );
}
