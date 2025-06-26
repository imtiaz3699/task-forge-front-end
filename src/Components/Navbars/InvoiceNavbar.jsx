import React from "react";
import { IoMdSearch } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useInvoiceMateUser } from "../../context/invoiceContext";

function InvoiceNavbar() {
  const { user } = useInvoiceMateUser();
  return (
    <div className="flex flex-row items-center justify-between w-full py-[30px] px-[40px]">
      <h1 className="text-[25px] font-bold text-white">Dashboard</h1>
      <div className="flex flex-row items-center gap-10">
        <IoMdSearch className="text-gray-400  w-[25px] h-[25px]" />
        <IoMdNotifications className="text-gray-400 w-[25px] h-[25px]" />
        <div className="flex flex-row items-center gap-2 bg-[#201E34] rounded-full px-2 py-2">
          <div className="w-[36px] h-[36px] rounded-full bg-white"></div>
          <p className="text-white">{user?.name}</p>
          <IoMdArrowDropdown className="text-white w-[20px] h-[20px]" />
        </div>
      </div>
    </div>
  );
}

export default InvoiceNavbar;
