import React from "react";

function index({
  label,
  placeholder,
  onChange,
  value,
  name,
  error,
  disabled,
  color,
}) {
  return (
    <div className="relative w-full ">
      <label
        className="block text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {label}
      </label>
      <input
        type="text"
        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 outline-none  ${
          color ? "bg-gray-700" : "bg-gray-500"
        } text-white rounded text-sm shadow  w-full ease-linear transition-all duration-150`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        disabled={disabled}
      />
      {error && <p className="text-red-800 text-[16px]">{error}</p>}
    </div>
  );
}

export default index;
