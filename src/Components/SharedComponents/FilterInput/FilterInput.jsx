import { Input } from "antd";
import React from "react";

function FilterInput({ label, value, onChange,name }) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <Input
        value={value ?? ""}
        onChange={onChange}
        name = {name}
        className="!bg-transparent !outline-none border-[1px] border-gray-400 !text-white"
      />
    </div>
  );
}

export default FilterInput;
