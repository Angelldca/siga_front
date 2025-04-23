

import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
  }
  
function Modal({ isOpen, onClose, children }: ModalProps) {
  
  
  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("keydown", onEsc);
    };
  }, [isOpen, onClose]); 

 
  if (!isOpen) return null;
  
   
    return ReactDOM.createPortal(
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content"
          onClick={e => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>&times;</button>
          {children}
        </div>
      </div>,
      document.body
    );
  }

export default Modal;