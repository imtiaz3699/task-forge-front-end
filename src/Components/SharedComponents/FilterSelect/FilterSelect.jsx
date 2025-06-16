import { Select } from "antd";
import React from "react";

function FilterSelect({ name, handleChange, options, label }) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <Select
        className="!w-[200px] !h-[25px] !bg-transparent"
        defaultValue={"Select"}
        name={name}
        style={{ width: 120 }}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
}

export default FilterSelect;
