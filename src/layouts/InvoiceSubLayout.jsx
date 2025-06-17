import React from "react";
import { Outlet } from "react-router";
import InvoiceMateSidebar from "../Components/Sidebar/InvoiceMateSidebar";
import InvoiceNavbar from "../Components/Navbars/InvoiceNavbar";

function InvoiceSubLayout({ children }) {
  return (
    <div className="flex flex-row items-start ">
      <InvoiceMateSidebar />
      <div className="flex flex-col bg-[#1C1A2E] h-screen w-full">
        <InvoiceNavbar />
        {children}
        <Outlet />
      </div>
    </div>
  );
}

export default InvoiceSubLayout;
