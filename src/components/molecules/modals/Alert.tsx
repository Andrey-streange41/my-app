import React, { useState, useEffect } from "react";

const Alert = ({
  message,
  visible,
  setVisible,
}: {
  message: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 6000);

    return () => clearTimeout(timeout);
  }, [visible, setVisible]);

  return (
    <div
      className={`w-6/12 flex bg-green-100 h-[60px] rounded-lg flex justify-center items-center fixed bottom-3 p-6 text-sm ml-20 ${
        visible ? "visible" : "hidden"
      } transition-transform duration-2000 ease-out transform translate-y-${
        visible ? "0" : "20"
      }`}
    >
      {message}
    </div>
  );
};

export default Alert;
