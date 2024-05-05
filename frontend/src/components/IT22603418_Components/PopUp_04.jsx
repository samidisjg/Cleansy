import React from "react";

const PopUp_04 = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-6 rounded-lg shadow-lg bg-opacity-90 bg-gray-400">
        <button className="absolute top-0 right-0 p-2" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopUp_04;
