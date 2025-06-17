import React from "react";
import { Outlet } from "react-router";
import InvoiceNavbar from "../../Components/Navbars/InvoiceNavbar";

function InvoiceLayout() {
  return (
    <div className = 'w-full flex flex-col '> 
      <Outlet />
    </div>
  );
}

export default InvoiceLayout;
