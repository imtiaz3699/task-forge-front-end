import React from "react";
import { IoMdSearch } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useInvoiceMateUser } from "../../context/invoiceContext";
import { Dropdown } from "antd";
import { useNavigate } from "react-router";
import { routes } from "../../utils/config";

function InvoiceNavbar() {
  const { user } = useInvoiceMateUser();
  const navigate = useNavigate();
  const items = [
    {
      label: user?.name?.toUpperCase(),
      key: user?.name,
    },
    {
      label: user?.email,
      key: user?.email,
    },
    {
      label: user?.mobile_number,
      key: user?.mobile_number,
    },
    {
      label: (
        <div
          onClick={() =>
            navigate(`${routes.INVOICE_MATE.SETTINGS}/${user?._id}`)
          }
          className="text-amber-400"
        >
          Settings
        </div>
      ),
      key: user?.mobile_number,
    },
    {
      label: <div className="text-red-500 text-center py-2">Logout</div>,
      key: user?.mobile_number,
    },
  ];
  return (
    <div className="flex flex-row items-center justify-between w-full py-[30px] px-[40px]">
      <h1 className="text-[25px] font-bold text-white">Dashboard</h1>
      <div className="flex flex-row items-center gap-10">
        <IoMdSearch className="text-gray-400  w-[25px] h-[25px]" />
        <IoMdNotifications className="text-gray-400 w-[25px] h-[25px]" />
        <div className="flex flex-row items-center gap-2 bg-[#201E34] rounded-full px-2 py-2">
          <div className="w-[36px] h-[36px] rounded-full bg-white"></div>
          <p className="text-white">{user?.name}</p>
          <Dropdown
            maxHeight={20}
            trigger={"click"}
            menu={{ items }}
            placement="bottomLeft"
          >
            <IoMdArrowDropdown className="text-white w-[20px] h-[20px] cursor-pointer" />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default InvoiceNavbar;
