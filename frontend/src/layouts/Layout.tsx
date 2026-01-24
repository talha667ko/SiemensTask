import {
  IxApplication,
  IxApplicationHeader,
  IxMenu,
  IxMenuItem,
  IxContent,
  IxDropdownItem,
  IxAvatar,
  IxButton,
  IxMenuCategory,
} from "@siemens/ix-react";
import {
  iconGlobe,
  iconHome,
  iconMoon,
  iconProject,
  iconProjectHistory,
  iconSun,
} from "@siemens/ix-icons/icons";
import { useTranslation } from "react-i18next";
import { Outlet, useSearchParams } from "react-router-dom";
import "./Layout.css";
import { useEffect, useState } from "react";
import type { ThemeVariant } from "@siemens/ix";
import { themeSwitcher } from "@siemens/ix";
import { useAuthContext } from "../providers/auth-context-provider";
import { useSmartNavigate } from "../hooks/useSmartNavigate";

export default function Layout() {
  const navigation = useSmartNavigate();
  const { t, i18n } = useTranslation();
  const { user } = useAuthContext();
  const [selectedVariant, setSelectedVariant] = useState<ThemeVariant>("dark");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const langFromUrl = searchParams.get("lang");
    if (langFromUrl && (langFromUrl === "en" || langFromUrl === "tr")) {
      if (i18n.language !== langFromUrl) {
        i18n.changeLanguage(langFromUrl);
      }
      i18n.changeLanguage(langFromUrl);
    } else if (!langFromUrl) {
      searchParams.set("lang", i18n.language);
      setSearchParams(searchParams, { replace: true });
    }

    themeSwitcher.setTheme("classic");
    themeSwitcher.setVariant(selectedVariant);
  }, [searchParams, i18n, selectedVariant]);

  const username = user?.user_metadata?.display_name || user?.email || "User";
  const email = user?.email || "Email";

  const changeLanguage = (lng: string) => {
    searchParams.set("lang", lng);
    setSearchParams(searchParams);
  };

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
          <img
            className="image"
            src={`${import.meta.env.BASE_URL}siemensBig.png`}
            alt=""
          />
        </div>

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
        <IxMenuCategory label={t("header.languages")} icon={iconGlobe}>
          <IxMenuItem
            label={t("header.turkish")}
            onClick={() => changeLanguage("tr")}
          ></IxMenuItem>
          <IxMenuItem
            label={t("header.english")}
            onClick={() => changeLanguage("en")}
          ></IxMenuItem>
        </IxMenuCategory>
        {/*<IxMenuItem onClick={() => navigation("/dashboard")} icon={iconList}>
          {t("menu.materials")}
        </IxMenuItem>*/}
      </IxMenu>

      <IxContent>
        <Outlet />
      </IxContent>
    </IxApplication>
  );
}
