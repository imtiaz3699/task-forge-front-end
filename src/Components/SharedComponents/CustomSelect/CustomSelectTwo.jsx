import React from "react";

function CustomSelectTwo({ label, options, preSelect, name, onChange, value,error }) {
  const handleChange = () => {};
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className=" font-medium text-[15px] text-gray-400">{label}</label>
      <select
        onChange={onChange}
        name={name}
        value={value}
        className="border-[1px] border-[#282541] rounded-[5px] h-[45px] !text-gray-400"
      >
        <option value="" className="bg-transparent !text-gray-400">
          {preSelect}
        </option>
        {options?.map((element, idx) => {
          return (
            <option key={idx} className="bg-transparent" value={element?.value}>
              {element?.label}
            </option>
          );
        })}
      </select>
      <p className = 'text-red-500 text-[10px]'>{error}</p>
    </div>
  );
}

export default CustomSelectTwo;
