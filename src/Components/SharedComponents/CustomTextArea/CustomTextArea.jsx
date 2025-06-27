import React from "react";

function CustomTextArea({ label, value, onChange, name }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className=" font-medium text-[15px] text-gray-400">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        name={name}
        rows={5}
        className="border-[#282541] border-[1px] rounded-[10px]  text-gray-400 px-2 py-2"
      />
    </div>
  );
}

export default CustomTextArea;
