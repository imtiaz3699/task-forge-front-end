import { Button } from "antd";
import React from "react";

function CustomButton({ label, cancelButton, onClick,type }) {
  return (
    <Button
      onClick={onClick}
      
      htmlType={`${type ? type : "button"}`}
      className={`hover:!text-white ${
        cancelButton
          ? "!bg-red-500 !border-red-500"
          : "!bg-amber-300 !border-amber-300"
      } `}
    >
      {label}
    </Button>
  );
}

export default CustomButton;
