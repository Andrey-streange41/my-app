import React from "react";

interface IIconButton {
  onClick: () => void;
  className?: string;
  children?: any;
}

const IconButton = ({ children, onClick, className }: IIconButton) => {
  return (
    <button
      className={`p-2 rounded-full focus:outline-none flex justify-center items-center ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
