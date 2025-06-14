import { Input } from "antd";
import React from "react";

function FilterInput({ label }) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <Input className="!bg-transparent !outline-none border-[1px] border-gray-400 !text-white" />
    </div>
  );
}

export default FilterInput;
