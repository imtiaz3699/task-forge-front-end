import React, { useState } from "react";
import { Eye } from "../../../utils/icons";

function CustomInputTwo({ label, value, onChange, type, name, error }) {
  const [changeType, setChangeType] = useState(type);
  return (
    <div className="flex flex-col gap-1 relative w-full">
      <label className="text-gray-100 font-medium text-[15px]">{label}</label>
      <input
        className="border-[#282541] border-[1px] rounded-[10px] h-[48px] text-gray-400 px-2"
        value={value}
        onChange={onChange}
        type={changeType}
        name={name}
      />
      {type === "password" && (
        <div
          onClick={() =>
            setChangeType((prev) => (prev === "password" ? "text" : "password"))
          }
          className="absolute top-10 right-5 hover:text-gray-500 cursor-pointer"
        >
          <Eye />
        </div>
      )}
      {error && <p className="text-red-500 text-[12px]">{error}</p>}
    </div>
  );
}

export default CustomInputTwo;
