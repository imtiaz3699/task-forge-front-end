import { Select, Space } from "antd";

function MultiSelect({ label, onSearch, options,onChange }) {
  const handleChange = (value) => {
    console.log(`selectedValue ${value}`);
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-medium text-[15px] text-gray-400">{label}</label>
      <Select
        mode="multiple"
        style={{ width: "100%", color: "white" }}
        placeholder={<p className="text-gray-400">Select Product</p>}
        onChange={onChange}
        classNames={"text-white"}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={options}
        optionRender={(option) => (
          <Space>
            <span role="img" aria-label={option?.data?.label}>
              {/* {option.data.emoji} */}
              {option?.data?.label}
            </span>
          </Space>
        )}
      />
    </div>
  );
}

export default MultiSelect;
