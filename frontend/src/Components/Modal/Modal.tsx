import { ModalProps } from "../../Function/Interface";

const Modal = ({ transparent }: ModalProps) => {
  return <div className={`modal-bg ${transparent ? "" : "filled"}`}>Modal</div>;
};

export default Modal;
