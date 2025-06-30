import { Slider } from "antd";
import React from "react";
import { IoFilter } from "react-icons/io5";
import { useNavigate } from "react-router";
function InvPageHeader({
  valueKey,
  handleFilterChange,
  redirect,
  handleChangeRange,
  filters,
}) {
  const navigate = useNavigate();
  console.log(valueKey, "fadslfja");
  const priceRange = [
    {
      label: "300-500",
      minPrice: 300,
      maxPrice: 500,
    },
    {
      label: "600-800",
      minPrice: 600,
      maxPrice: 800,
    },
    {
      label: "900-1200",
      minPrice: 900,
      maxPrice: 1200,
    },
    {
      label: "1500-2000",
      minPrice: 1500,
      maxPrice: 2000,
    },
  ];
  const [value, setValue] = React.useState([20, 80]);
  return (
    <div className="  relative border-b-[#322e5a] border-b-[1px] w-full pb-5 flex items-center justify-between">
      <div className = 'flex flex-row items-center gap-4'>
      <input
        className="w-[290px] h-[45px] text-[12px] p-2 border border-gray-700 rounded-[10px] text-gray-300"
        placeholder="Search Product"
        value={valueKey ?? ""}
        onChange={handleFilterChange}
      />
      <div className="gap-4 flex flex-row items-center">
        <input
          className="w-[100px] h-[45px] text-[12px] p-2 border border-gray-700 rounded-[10px] text-gray-300"
          value={filters?.minPrice}
          onChange={handleChangeRange}
          name="minPrice"
          placeholder="Min Price"
          type = "number"
          min ={0}
        />
        <input
          className="w-[100px] h-[45px] text-[12px] p-2 border border-gray-700 rounded-[10px] text-gray-300"
          value={filters?.maxPrice}
          onChange={handleChangeRange}
          name="maxPrice"
          placeholder="Max price"
          type = "number"
          min ={0}
        />
        </div>
      </div>
      <div className="flex items-center gap-[30px] ">
        <button
          onClick={() => navigate(redirect)}
          className="bg-[#C8EE44] w-[165px] h-[48px] rounded-[5px] flex items-center justify-center gap-[5px] font-medium cursor-pointer"
        >
          <img src="/invoie.png" /> Create Product
        </button>
        {/* <button className="w-[110px] h-[48px] rounded-[5px] border-[1px] border-gray-500 text-white flex items-center gap-2 justify-center cursor-pointer">
          <IoFilter /> Filter
        </button> */}
      </div>
    </div>
  );
}

export default InvPageHeader;
