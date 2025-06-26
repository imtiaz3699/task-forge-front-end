import React from "react";
import CustomInputTwo from "../../../Components/SharedComponents/CustomInput/CustomInputTwo";
import CustomTextArea from "../../../Components/SharedComponents/CustomTextArea/CustomTextArea";
import CustomSelectTwo from "../../../Components/SharedComponents/CustomSelect/CustomSelectTwo";

function InvoiceProduct() {
  return (
    <div className="px-[40px] w-full overflow-auto scroll-thin ">
      <div className="flex flex-col ">
        <h1 className="font-medium text-[22px] text-white">Product </h1>
        <p className="text-[18px] text-gray-400">Enter Product Details.</p>
      </div>
      <form className="flex flex-col gap-[40px] mt-5">
        
        
        
        
        <div className="flex flex-row items-start gap-[40px] justify-between w-full">
          <CustomInputTwo label="Product Name" />
          <CustomInputTwo label="Product Price" />
        </div>
        <div className="flex flex-row items-start gap-[40px] justify-between w-full">
          <CustomTextArea label="Description" />
          <CustomTextArea label="Short Description" />
        </div>
        <div className="flex flex-row items-start gap-[40px] justify-between w-full">
          <CustomSelectTwo label="Currency" />
          <div className="flex flex-col gap-2 w-full">
            <label className="text-gray-100 font-medium text-[15px]">
              Dimensions
            </label>
            <div className="border-[#282541] border-[1px] rounded-[10px] h-[40px] text-gray-400 flex items-center justify-between px-3  ">
              <input
                className="w-1/3 !outline-none no-spinner"
                placeholder="Width "
                type="number"
              />
              <input
                className="w-1/3 !outline-none no-spinner"
                placeholder="Height"
                type="number"
              />
              <input
                className="w-1/3 !outline-none no-spinner"
                placeholder="Depth "
                type="number"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InvoiceProduct;
