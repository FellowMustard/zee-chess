import { ModalProps } from "../../Function/Interface";

const Modal = ({ show, transparent, background, children }: ModalProps) => {
  return show ? (
    <div className={`modal-bg ${transparent ? "" : "filled"}`}>
      <div className="modal-body" style={{ background: background }}>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
