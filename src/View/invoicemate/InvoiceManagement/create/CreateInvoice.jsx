import React from "react";
import CustomSelectTwo from "../../../../Components/SharedComponents/CustomSelect/CustomSelectTwo";
import CustomInputTwo from "../../../../Components/SharedComponents/CustomInput/CustomInputTwo";
import CustomDatePickerTwo from "../../../../Components/SharedComponents/DatePicker/CustomDatePickerTwo";

function CreateInvoice() {
  return (
    <div className="px-[40px] w-full">
      <div className="flex flex-col ">
        <h1 className="font-medium text-[22px] text-white">Invoice </h1>
        <p className="text-[18px] text-gray-400">Enter invoice details.</p>
      </div>
      <div className="flex flex-col gap-[40px] mt-5">
        <div className="flex flex-row items-center gap-[40px] justify-between w-full">
          <CustomSelectTwo label="Client" />
          <CustomInputTwo label="Invoice Number" />
        </div>
        <div className="flex flex-row items-center gap-[40px] justify-between w-full">
          <CustomDatePickerTwo label="Date Issue" />
          <CustomDatePickerTwo label="Due Date" />
        </div>
        <div className = 'flex flex-row items-center gap-[40px] justify-between max-w-full  '>
          <CustomSelectTwo label="Product" />
        </div>
      </div>
    </div>
  );
}

export default CreateInvoice;
