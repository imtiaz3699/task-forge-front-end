import React from "react";

function CustomSelectTwo({ label }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-gray-100 font-medium text-[15px] text-gray-400">{label}</label>
      <select className="border-[1px] border-[#282541] rounded-[5px] h-[45px]">
        <option className="bg-transparent">fads</option>
      </select>
    </div>
  );
}

export default CustomSelectTwo;
