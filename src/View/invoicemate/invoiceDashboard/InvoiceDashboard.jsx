import React from "react";
import { FaWallet } from "react-icons/fa";
import { ThreeDots } from "../../../utils/icons";
import { BiArrowFromLeft } from "react-icons/bi";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";

function InvoiceDashboard() {
  const data = [
    {
      name: "Total Balance",
      data: "$5240.21",
      icon: <FaWallet />,
    },
    {
      name: "Total Spending",
      data: "$5240.21",
      icon: <FaWallet />,
    },
    {
      name: "Total Saved",
      data: "$5240.21",
      icon: <FaWallet />,
    },
  ];
  return (
    <div className="text-white flex flex-row items-start gap-[40px] w-full px-[40px]">
      <div className="flex flex-col gap-[30px] w-[80%]">
        <div className="grid grid-cols-3">
          {data?.map((element, idx) => {
            return (
              <div className="w-[222px] py-[24px] px-[20px] flex flex-row items-center gap-[15px] bg-[#282541] rounded-[10px]">
                <div className="bg-[#353255] rounded-full w-[42px] h-[42px] flex items-center justify-center">
                  {element?.icon}
                </div>
                <div className="flex flex-col items-start gap-1">
                  <p className="text-gray-500">{element?.name}</p>
                  <p className="text-[25px] text-white">{element?.data}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full border-[1px] rounded-[10px] border-white py-[20px] px-[25px]">
          <div className="flex flex-row items-center justify-between">
            <p className="font-bold text-[22px]">Recent Transaction</p>
            <p className="text-green-700 flex items-center gap-2 cursor-pointer">
              {" "}
              View All <FaArrowRight />{" "}
            </p>
          </div>
          <div className="w-full flex flex-col mt-10">
            <div className="flex flex-row items-center gap-2 justify-between text-gray-600 font-medium text-[20px]">
              <p>Name/Business</p>
              <p>Type</p>
              <p>Amount</p>
              <p>Date</p>
            </div>
            <div className="flex flex-row items-center justify-between gap-2 mt-10">
              <div className="flex flex-row items-center gap-[15px]">
                <div className="w-[40px] h-[40px] rounded-[7px] bg-[#282541]"></div>
                <div className="flex flex-col gap-[2px] text-[16px]">
                  <p>Iphone 13 Pro MAX</p>
                  <p>Apple. Inc</p>
                </div>
              </div>
              <p className="text-gray-700 font-medium">Mobile</p>
              <p className="text-white font-medium">Amount</p>
              <p className="text-gray-700 font-medium">14 Apr 2022</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[40%] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className=" font-medium text-[18px]">Scheduled Transfers</p>
          <p className="text-green-700 underline text-[16px] flex items-center gap-2 cursor-pointer">
            View All <BsArrowReturnRight />{" "}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between gap-2 mt-5">
          <div className="flex flex-row items-center gap-[15px]">
            <div className="w-[33px] h-[33px] rounded-full bg-white"></div>
            <div className="flex flex-col">
              <p className="text-white font-medium text-[16px]">Saleh Ahmed</p>
              <p className="text-white font-medium text-[16px]">
                April 28, 2022 at 11:00
              </p>
            </div>
          </div>
          <p>-$435,00</p>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDashboard;
