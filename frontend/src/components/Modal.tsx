import React from "react";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}
const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  open,
  className,
}) => {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50" />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full min-h-36 relative flex flex-col ${className}`}
        >
          <button
            onClick={onClose}
            className="absolute top-1 right-4 text-gray-500 hover:text-gray-700"
          >
            x
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
