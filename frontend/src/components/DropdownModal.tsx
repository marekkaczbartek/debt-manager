import React from "react";
import UserIcon from "./UserIcon";

interface DropdownModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  username?: string;
}
const DropdownModal: React.FC<DropdownModalProps> = ({
  children,
  onClose,
  open,
  className,
  username,
}) => {
  if (!open) return null;
  return (
    <>
      <div
        className={`bg-white border-black border rounded-lg px-1 py-3 w-36 shadow-lg absolute right-4 top-4 flex flex-col items-center ${className}`}
      >
        <button onClick={onClose}>
          <UserIcon username={username} className="mx-3 mb-5 font-bold" />
        </button>
        {children}
      </div>
    </>
  );
};

export default DropdownModal;
