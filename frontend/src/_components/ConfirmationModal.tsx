import {
  IxButton,
  IxModalContent,
  IxModalFooter,
  IxModalHeader,
  Modal,
  type ModalRef,
} from "@siemens/ix-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function ConfirmationModal({
  projectNumber,
}: {
  projectNumber: string;
}) {
  const { t } = useTranslation();
  const modalRef = useRef<ModalRef>(null);

  const close = () => {
    modalRef.current?.dismiss();
  };

  const dismiss = () => {
    modalRef.current?.dismiss();
  };

  const accept = () => {
    modalRef.current?.close(true);
  };
  return (
    <Modal ref={modalRef}>
      <IxModalHeader onCloseClick={() => close()}>
        {t("project.modal.header")}
      </IxModalHeader>
      <IxModalContent>
        {t("project.modal.message")} n°{projectNumber}
      </IxModalContent>
      <IxModalFooter>
        <IxButton variant="subtle-primary" onClick={() => dismiss()}>
          {t("global.cancel")}
        </IxButton>
        <IxButton onClick={() => accept()}>{t("global.ok")}</IxButton>
      </IxModalFooter>
    </Modal>
  );
}
