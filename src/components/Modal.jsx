import React from "react";
import style from "../components/style.module.css";

const Modal = ({
  isOpen,
  closeModal,
  deleteRequest,
  children,
  todo,
  deleteId,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={style.mainModal}>
      <div className={style.miniModal}>
        {children}
        <div>
          <button
            className={style.single_delete}
            onClick={() => deleteRequest(deleteId)}
          >
            Yes
          </button>
          <button className={style.delete_button} onClick={closeModal}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
