import ReactDOM from "react-dom";
import { ReactChild, useEffect } from "react";

export const Modal = ({ children }: { children: ReactChild }) => {
  const modalRoot = document.getElementById("root");
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot?.appendChild(el);
    return () => {
      modalRoot?.removeChild(el);
    };
  }, [modalRoot, el]);

  return ReactDOM.createPortal(children, el);
};
export default Modal;
