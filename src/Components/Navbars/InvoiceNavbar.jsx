import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useInvoiceMateUser } from "../../context/invoiceContext";
import { Dropdown, List, Badge } from "antd";
import { useNavigate } from "react-router";
import { routes } from "../../utils/config";

const notifications = [
  { id: 1, title: <p className="text-white"> Invoice INV_0003 is overdue</p> },
  { id: 2, title: <p className="text-white"> New product added</p> },
  { id: 3, title: <p className="text-white"> Client John Doe updated</p> },
  { id: 1, title: <p className="text-white"> Invoice INV_0003 is overdue</p> },
  { id: 2, title: <p className="text-white"> New product added</p> },
  { id: 3, title: <p className="text-white"> Client John Doe updated</p> },
  { id: 1, title: <p className="text-white"> Invoice INV_0003 is overdue</p> },
  { id: 2, title: <p className="text-white"> New product added</p> },
  { id: 3, title: <p className="text-white"> Client John Doe updated</p> },
  { id: 1, title: <p className="text-white"> Invoice INV_0003 is overdue</p> },
  { id: 2, title: <p className="text-white"> New product added</p> },
  { id: 3, title: <p className="text-white"> Client John Doe updated</p> },
  { id: 1, title: <p className="text-white"> Invoice INV_0003 is overdue</p> },
  { id: 2, title: <p className="text-white"> New product added</p> },
  { id: 3, title: <p className="text-white"> Client John Doe updated</p> },
];
function InvoiceNavbar() {
  const [visible, setVisible] = useState(false);

  const { user } = useInvoiceMateUser();
  const navigate = useNavigate();
  const items = [
    {
      label: (
        <p className="cursor-text hover:!bg-gray-500">
          {" "}
          {user?.name?.toUpperCase()}
        </p>
      ),
      key: user?.name,
    },
    {
      label: <p className="cursor-text"> {user?.email}</p>,
      key: user?.email,
    },
    {
      label: <p className="cursor-text">{user?.mobile_number}</p>,
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

  const dropdownContent = (
    <div className="w-[300px] max-h-[300px] overflow-auto p-2 !bg-gray-700 rounded-[5px] scroll-style">
      <List
        size="small"
        dataSource={notifications}
        renderItem={(item) => (
          <List.Item className="hover:!bg-gray-500 rounded-[5px]">
            {item.title}
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <div className="flex flex-row items-center justify-between w-full py-[30px] px-[40px]">
      <h1 className="text-[25px] font-bold text-white">Dashboard</h1>
      <div className="flex flex-row items-center gap-10">
        <IoMdSearch className="text-gray-400  w-[25px] h-[25px]" />

        <Dropdown
          overlay={dropdownContent}
          open={visible}
          placement="bottomRight"
          onOpenChange={(flag) => setVisible(flag)}
          trigger={["hover"]}
        >
          <div className="relative cursor-pointer ">
            <Badge count={notifications.length} size="small">
              <IoMdNotifications className="text-gray-400 w-[25px] h-[25px]" />
            </Badge>
          </div>
        </Dropdown>
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
