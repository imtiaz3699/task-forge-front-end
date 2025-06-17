import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../Components/Sidebar";
import PageHeading from "../Components/SharedComponents/PageHeading";
import { message } from "antd";
import Permissions from "../Components/SharedComponents/Permissions/Permissions";
import { UserIcon } from "../utils/icons";

function AdminLayouts({ children }) {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <div className="w-full flex h-screen flex-row items-start text-white overflow-hidden ">
      {contextHolder}
      <div className="flex flex-row items-start w-full">
        <Sidebar />
        <div className="flex flex-col gap-5 w-full">
          <nav className="w-full flex flex-row items-center justify-between py-[30px] px-5 border-b-[1px] border-gray-700 shadow-xl bg-gray-700 z-10 sticky top-0">
            <div>Test Applications</div>
            <div>
              <UserIcon />
            </div>
          </nav>
          <Permissions>
            <PageHeading />
            <div className="px-5 overflow-auto h-[calc(100vh-100px)] scroll-style mt-5">
              {children}
              <Outlet context={[messageApi]} />
            </div>
          </Permissions>
        </div>
      </div>
    </div>
  );
}

export default AdminLayouts;
