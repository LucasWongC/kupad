import { Modal } from "components";

type Props = {
  isOpen: boolean;
  title?: string;
  message?: string;
  onDismiss: () => void;
};

export default ({ isOpen, onDismiss, title, message }: Props) => (
  <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90}>
    <div className="result-modal-container">
      {title && <span>{title}</span>}
      {message && <span>{message}</span>}
    </div>
  </Modal>
);
