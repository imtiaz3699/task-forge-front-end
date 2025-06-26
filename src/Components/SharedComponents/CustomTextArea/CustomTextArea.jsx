import React from "react";

function CustomTextArea({ label }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-gray-100 font-medium text-[15px]">{label}</label>
      <textarea rows={5} className="border-[#282541] border-[1px] rounded-[10px]  text-gray-400 px-2" />
    </div>
  );
}

export default CustomTextArea;
