import { Select } from "antd";
import React from "react";

function CustomSelect({
  label,
  options,
  onChange,
  name,
  color,
  error,
  value,
  defaultSelect,
  multiSelect,
}) {
   const filteredOptions = options.filter(o => !value.includes(o?.value));
   console.log(value,'fasdlfjhasldfjhasdfjhasjkfa')
  return (
    <>
      {" "}
      {multiSelect ? (
        <div className = 'w-full'>
        <label
            for="countries"
            className={`block mb-2 text-sm  font-medium ${
              color ? "text-white" : "text-gray-900"
            }  `}
          >
            {label}
          </label>
        <Select
          mode="multiple"
          allowClear
          name = {name}
          style={{ width: "100%" }}
          value={value}
          labelRender={value}
          placeholder={<p className = 'text-white'>Please select</p>}
          onChange={onChange}
          options={filteredOptions}
        />
        </div>
      ) : (
        <div className="w-full">
          <label
            for="countries"
            className={`block mb-2 text-sm  font-medium ${
              color ? "text-white" : "text-gray-900"
            }  `}
          >
            {label}
          </label>
          <select
            onChange={onChange}
            name={name}
            value={value ?? ""}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>{defaultSelect ?? "Select Value"}</option>
            {options?.map((element, idx) => {
              return (
                <option key={idx} value={element?.value}>
                  {element?.label}
                </option>
              );
            })}
          </select>
          {error && <p className="text-red-800 text-[16px]">{error}</p>}
        </div>
      )}
    </>
  );
}

export default CustomSelect;
