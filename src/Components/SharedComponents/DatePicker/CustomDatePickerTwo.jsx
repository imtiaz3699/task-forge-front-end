import React from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";

function CustomDatePickerTwo({
  label,
  name,
  value,
  onChange,
  prevDisable,
  disabled,
}) {
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });
  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };

  return (
    <div className="w-full flex flex-col" direction="vertical">
      <label className="block uppercase text-white text-xs font-bold mb-2">
        {label}
      </label>
      <DatePicker
        disabled={disabled}
        disabledDate={prevDisable && disabledDate}
        disabledTime={prevDisable && disabledDateTime}
        name={name}
        onChange={onChange}
        value={value ?? dayjs(new Date())}
        style={{ color: "#ffffff" }}
        rootClassName="!text-white"
        className="!py-3 !bg-transparent !text-white border-[1px] !border-[#282541]"
        defaultValue={"fadhf"}
      />
    </div>
  );
}

export default CustomDatePickerTwo;
