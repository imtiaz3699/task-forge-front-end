import React from "react";
import CustomSelectTwo from "../../../../Components/SharedComponents/CustomSelect/CustomSelectTwo";
import CustomInputTwo from "../../../../Components/SharedComponents/CustomInput/CustomInputTwo";
import CustomDatePickerTwo from "../../../../Components/SharedComponents/DatePicker/CustomDatePickerTwo";
import { RadioButton } from "../../../../Components/SharedComponents/RadioButton/RadioButton";
import CustomButton from "../../../../Components/SharedComponents/CustomButton/CustomButton";
import MultiSelect from "../../../../Components/SharedComponents/MultiSelect/MultiSelect";

function CreateInvoice() {
  const status = [
    {
      label: "Paid",
      value: "paid",
    },
    {
      label: "Un-paid",
      value: "un_paid",
    },
    {
      label: "Overdue",
      value: "overdue",
    },
    {
      label: "Draft",
      value: "draft",
    },
  ];
  const paymentMethods = [
    {
      label: "Cash",
      value: "cash",
    },
    {
      label: "Bank Transfer",
      value: "bank_transfer",
    },
  ];
  const currency = [
    {
      label: "PKR",
      value: "pkr",
    },
  ];
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
        <div className="flex flex-row items-center gap-[40px] justify-between max-w-full  ">
          <CustomSelectTwo
            label="Status"
            options={status}
            preSelect={"Select Status"}
          />
          <CustomSelectTwo
            label="Payment Method"
            options={paymentMethods}
            preSelect={"Select Payment Method"}
          />
        </div>
        <div className="flex flex-row items-center gap-[40px] justify-between max-w-full  ">
          <CustomInputTwo label="Notes" />
          <CustomInputTwo label="Terms" />
        </div>
        <div className="flex flex-row items-center gap-[40px] justify-between max-w-full  ">
          <CustomSelectTwo
            label="Currency"
            options={currency}
            preSelect={"Select Currency"}
          />
          <MultiSelect label = "Products"/>
        </div>
        <div className="w-full">
          <RadioButton label="Tax Included" />
        </div>
        <div className="flex items-center justify-end max-w-full gap-5">
          <CustomButton label="Cancel" cancelButton={true} />
          <CustomButton label="Submit" />
        </div>
      </div>
    </div>
  );
}

export default CreateInvoice;
