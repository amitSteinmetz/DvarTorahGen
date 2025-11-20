import React, { ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";

interface ConfirmModalProps {
  show: boolean;
  title: string;
  message: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  title,
  message,
  confirmText = "אישור",
  cancelText = "ביטול",
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal show={show} onHide={onCancel} centered className="confirm-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="w-100 text-center">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ direction: "rtl", textAlign: "center", padding: "2rem" }}
      >
        <div className="fs-5">{message}</div>
      </Modal.Body>
      <Modal.Footer className="border-0 justify-content-center gap-3 pt-0">
        <Button variant="outline-secondary" onClick={onCancel} className="px-4">
          {cancelText}
        </Button>
        <Button variant="primary" onClick={onConfirm} className="px-4">
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
