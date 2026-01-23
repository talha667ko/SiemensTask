import { IxSelect, IxSelectItem } from "@siemens/ix-react";
import { useTranslation } from "react-i18next";
import { useSmartNavigate } from "../hooks/useSmartNavigate";

export default function SearchBar({
  projectNumbers,
}: {
  projectNumbers: Array<string> | undefined;
}) {
  const { t } = useTranslation();
  const navigation = useSmartNavigate();
  return (
    <>
      <IxSelect
        name="project-number-option"
        allowClear
        editable
        hideListHeader
        i18nPlaceholderEditable={t("content.searchPlaceholder")}
      >
        {projectNumbers?.map((projectNumber) => (
          <IxSelectItem
            key={projectNumber}
            label={projectNumber}
            value={projectNumber}
            onClick={() => navigation(`/?project=${projectNumber}`)}
          >
            {projectNumber}
          </IxSelectItem>
        ))}
      </IxSelect>
    </>
  );
}
