import {
  IxApplication,
  IxApplicationHeader,
  IxMenu,
  IxMenuItem,
  IxContent,
  IxDropdownItem,
  IxAvatar,
  IxDropdownButton,
  IxButton,
} from "@siemens/ix-react";
import {
  iconGlobe,
  iconHome,
  iconList,
  iconMoon,
  iconProject,
  iconProjectHistory,
  iconSun,
} from "@siemens/ix-icons/icons";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useEffect, useState } from "react";
import type { ThemeVariant } from "@siemens/ix";
import { themeSwitcher } from "@siemens/ix";
import { useAuthContext } from "../providers/auth-context-provider";

export default function Layout() {
  const navigation = useNavigate();
  const { t, i18n } = useTranslation();
  const { user } = useAuthContext();

  const username = user?.user_metadata?.display_name || user?.email || "User";
  const email = user?.email || "Email";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const [selectedVariant, setSelectedVariant] = useState<ThemeVariant>("dark");

  useEffect(() => {
    themeSwitcher.setTheme("classic");
    themeSwitcher.setVariant(selectedVariant);
  }, []);

  const toggle = () => {
    const newVariant = selectedVariant === "light" ? "dark" : "light";
    setSelectedVariant(newVariant);
    setTimeout(() => {
      themeSwitcher.setVariant(newVariant);
    }, 150);
  };
  return (
    <IxApplication>
      <IxApplicationHeader className="ix-header" name={t("header.title")}>
        <div className="logo" slot="logo">
          <img className="image" src="/siemensBig.png" alt="" />
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
        {selectedVariant === "dark" ? (
          <IxButton
            variant="tertiary"
            onClick={toggle}
            icon={iconMoon}
          ></IxButton>
        ) : (
          <IxButton
            variant="tertiary"
            onClick={toggle}
            icon={iconSun}
          ></IxButton>
        )}
        <IxAvatar username={username} extra={email}>
          <IxDropdownItem
            onClick={() => navigation("/settings")}
            label={t("header.settings")}
          ></IxDropdownItem>
        </IxAvatar>
      </IxApplicationHeader>

      <IxMenu>
        <IxMenuItem
          onClick={() => navigation("/dashboard")}
          home
          icon={iconHome}
        >
          {t("menu.dashboard")}
        </IxMenuItem>
        <IxMenuItem
          onClick={() => navigation("/classifymaterials")}
          icon={iconProject}
        >
          {t("menu.projects")}
        </IxMenuItem>
        <IxMenuItem
          onClick={() => navigation("/viewclassifications")}
          icon={iconProjectHistory}
        >
          {t("menu.classifiedProjects")}
        </IxMenuItem>
        <IxMenuItem onClick={() => navigation("/dashboard")} icon={iconList}>
          {t("menu.materials")}
        </IxMenuItem>
      </IxMenu>

      <IxContent>
        <Outlet />
      </IxContent>
    </IxApplication>
  );
}
