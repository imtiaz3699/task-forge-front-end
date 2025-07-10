import { Select, Space, Spin } from "antd";

function MultiSelect({
  label,
  onSearch,
  options,
  onChange,
  showSearh = false,
  value,
  error,
}) {
  const { Option } = Select;
  console.log(value, "fasdlfkahsdkf");
  return (
    <>
      {showSearh ? (
        <div className="flex flex-col gap-4 w-full">
          <label className="font-medium text-[15px] text-gray-400">
            {label}
          </label>
          <Select
            showSearch
            value={value}
            placeholder="Search and select a client"
            filterOption={false}
            onSearch={onSearch}
            onChange={onChange}
            style={{ width: "100%" }}
            allowClear
          >
            {options.map((client) => (
              <Option key={client.value} value={client.value}>
                {client.label}
              </Option>
            ))}
          </Select>
          <p className="text-red-700 text-[12px]">{error}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full">
          <label className="font-medium text-[15px] text-gray-400">
            {label}
          </label>
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
          <p className="text-red-700 text-[12px]">{error}</p>
        </div>
      )}
    </>
  );
}

export default MultiSelect;
