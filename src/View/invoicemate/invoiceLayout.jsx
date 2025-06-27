import React from "react";
import { Outlet } from "react-router";
import InvoiceNavbar from "../../Components/Navbars/InvoiceNavbar";
import { message } from "antd";
function InvoiceLayout() {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <div className = 'w-full flex flex-col h-[full]'> 
      <Outlet context={[messageApi]} />
    </div>
  );
}

export default InvoiceLayout;
