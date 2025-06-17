import React from "react";
import { BiEditAlt } from "react-icons/bi";
import CustomInputTwo from "../../../Components/SharedComponents/CustomInput/CustomInputTwo";

function InvoiceSettings() {
  return (
    <div className="px-[40px] ">
      <div className="bg-[#201E34] max-w-[977px] p-[40px] rounded-[10px]">
        <div className="flex flex-col">
          <h1 className="font-medium text-[25px] text-white">
            Account Information
          </h1>
          <p className="text-[#78778B]">Update your account information</p>
        </div>
        <div className="mt-[40px] w-full flex items-center justify-between">
          <p className="text-[20px] font-medium text-white">
            Personal Information
          </p>
          <div className="text-[#29A073] flex flex-row items-center gap-2">
            <BiEditAlt />
            <span>Edit</span>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] mt-[40px] w-full">
          <div className="flex flex-row items-center gap-[40px] w-full">
            <CustomInputTwo label="First Name" />
            <CustomInputTwo label="Last Name" />
          </div>
          <div className="flex flex-row items-center gap-[40px] w-full">
            <CustomInputTwo label="Date of Birth" />
            <CustomInputTwo label="Mobile Number" />
          </div>
          <CustomInputTwo label="Email" />
          <div className="flex flex-row items-center gap-[40px] w-full">
            <CustomInputTwo label="New Password" />
            <CustomInputTwo label="Confirm Password" />
          </div>

          <button className="bg-[#29A073] w-[190px] h-[52px] rounded-[5px] text-white">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceSettings;
