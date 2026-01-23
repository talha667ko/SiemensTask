import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useSmartNavigate() {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const smartNavigate = (path: string, options?: any) => {
    const currentLang = searchParams.get("lang") || i18n.language || "en";

    const separator = path.includes("?") ? "&" : "?";
    const newPath = `${path}${separator}lang=${currentLang}`;

    navigation(newPath, options);
  };

  return smartNavigate;
}
