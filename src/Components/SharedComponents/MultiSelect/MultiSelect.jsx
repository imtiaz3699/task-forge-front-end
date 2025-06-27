import { Select, Space } from "antd";

function MultiSelect({ label }) {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const options = [
    {
      label: "China",
      value: "china",
      emoji: "🇨🇳",
      desc: "China (中国)",
    },
    {
      label: "USA",
      value: "usa",
      emoji: "🇺🇸",
      desc: "USA (美国)",
    },
    {
      label: "Japan",
      value: "japan",
      emoji: "🇯🇵",
      desc: "Japan (日本)",
    },
    {
      label: "Korea",
      value: "korea",
      emoji: "🇰🇷",
      desc: "Korea (韩国)",
    },
    {
      label: "Korea",
      value: "jan",
      emoji: "🇰🇷",
      desc: "Korea (韩国)",
    },
    {
      label: "Korea",
      value: "Feb",
      emoji: "🇰🇷",
      desc: "Korea (韩国)",
    },
    {
      label: "Korea",
      value: "March",
      emoji: "🇰🇷",
      desc: "Korea (韩国)",
    },
  ];
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-medium text-[15px] text-gray-400">
        {label}
      </label>
      <Select
        mode="multiple"
        style={{ width: "100%", color: "white" }}
        placeholder={<p className="text-gray-400">Select Product</p>}
        defaultValue={["china"]}
        onChange={handleChange}
        classNames={"text-white"}
        options={options}
        optionRender={(option) => (
          <Space>
            <span role="img" aria-label={option.data.label}>
              {option.data.emoji}
            </span>
            {option.data.desc}
          </Space>
        )}
      />
    </div>
  );
}

export default MultiSelect;
