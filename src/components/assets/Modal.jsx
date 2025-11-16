import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 8,
          maxWidth: "90%",
          maxHeight: "80%",
          overflowY: "auto",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        }}
      >
        {children}
        <button
          onClick={onClose}
          style={{
            marginTop: 20,
            padding: "8px 16px",
            borderRadius: 5,
            border: "none",
            backgroundColor: "#07c6ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
