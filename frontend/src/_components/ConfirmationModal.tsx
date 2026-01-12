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

export default function CustomModal({
  projectNumber,
  typeOfModal,
}: {
  projectNumber: string;
  typeOfModal: string;
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
        {t(`project.modal.header.${typeOfModal}`)}
      </IxModalHeader>
      <IxModalContent>
        {t(`project.modal.message.${typeOfModal}`)} n°{projectNumber}
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
