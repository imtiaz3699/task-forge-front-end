import { routes } from "../../utils/config";
import { Category, Product } from "../../utils/icons";
import { useLocation, useNavigate } from "react-router";
import { MdDashboard } from "react-icons/md";
import { FaPersonShelter } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { TbTransactionDollar } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import { IoHelpCircle } from "react-icons/io5";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { useInvoiceMateUser } from "../../context/invoiceContext";

function InvoiceMateSidebar() {
  const { user } = useInvoiceMateUser();
  const data = [
    {
      name: "Dashboard",
      url: routes.INVOICE_MATE.DASHBOARD,
      icon: <MdDashboard />,
    },
    {
      name: "Transactions",
      url: routes.INVOICE_MATE.TRANSACTION_MANAGEMENT,
      icon: <TbTransactionDollar />,
    },
    {
      name: "Invoices",
      url: routes.INVOICE_MATE.INVOICE_MANAGEMENT,
      icon: <FaFileInvoiceDollar />,
      children: [routes.INVOICE_MATE.CREATE_INVOICE],
    },
    {
      name: "Clients",
      url: routes.INVOICE_MATE.CLIENT_MANAGEMENT,
      icon: <FaPersonShelter />,
      children:[routes.INVOICE_MATE.CREATE_CLIENT,routes.INVOICE_MATE.UPDATE_CLIENT]
    },
    {
      name: "Products",
      url: routes.INVOICE_MATE.PRODUCT,
      icon: <Product />,
      children: [routes.INVOICE_MATE.CREATE_PRODUCT,routes.INVOICE_MATE.UPDATE_PRODUCT],
    },
    {
      name: "Category",
      url: routes.INVOICE_MATE.CATEGORIES,
      icon: <Category />,
    },
    {
      name: "Settings",
      url: routes.INVOICE_MATE.SETTINGS,
      icon: <IoSettingsSharp />,
    },
  ];
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();
  const handleRedirect = (element) => {
    if (element === routes.INVOICE_MATE.SETTINGS) {
      navigate(`${element}/${user?._id}`);
    } else {
      navigate(element);
    }
  };
  return (
    <div className="w-[250px] h-screen  flex flex-col justify-between gap-5 pl-5 pr-2 py-5 bg-[#1E1C30] shadow-2xl">
      <div className="flex flex-col gap-10">
        <div className="flex flex-row items-center  gap-2">
          <img src="/magloIcon.png" className="" />{" "}
          <p className="text-white">Maglo.</p>{" "}
        </div>
        <div className="flex flex-col gap-2">
          {data?.map((element, idx) => {
            const isActive =
              pathName === element?.url ||
              element?.children?.includes(pathName) ||
              (element?.url && pathName.startsWith(element.url));
            return (
              <div
                onClick={() => handleRedirect(element?.url)}
                className={`flex flex-row items-center gap-1 group hover:bg-[#C8EE44]  h-[48px] cursor-pointer ${
                  isActive ? "bg-[#C8EE44] text-[#1B212D]" : ""
                }  font-medium rounded-[10px] px-2`}
              >
                <div
                  className={`group-hover:bg-[#C8EE44] group-hover:text-[#1B212D] ${
                    isActive ? "text-[#1B212D]" : "text-white"
                  }`}
                >
                  {element?.icon}
                </div>{" "}
                <p
                  className={`group-hover:text-[#1B212D] ${
                    isActive ? "text-[#1B212D]" : "text-white"
                  }`}
                >
                  {element?.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div
          onClick={() => navigate("element?.url")}
          className={`flex flex-row items-center gap-1 group hover:bg-[#C8EE44]  h-[48px] cursor-pointer ${
            pathName === "element?.url" ? "bg-[#C8EE44] text-[#1B212D]" : ""
          }  font-medium rounded-[10px] px-2`}
        >
          <div
            className={`group-hover:bg-[#C8EE44] group-hover:text-[#1B212D] ${
              pathName === "element?.url" ? "text-[#1B212D]" : "text-white"
            }`}
          >
            <IoHelpCircle className="w-[25px] h-[25px]" />
          </div>{" "}
          <p
            className={`group-hover:text-[#1B212D] ${
              pathName === "element?.url" ? "text-[#1B212D]" : "text-white"
            }`}
          >
            Help
          </p>
        </div>
        <div
          onClick={() => navigate("element?.url")}
          className={`flex flex-row items-center gap-1 group hover:bg-[#C8EE44]  h-[48px] cursor-pointer ${
            pathName === "element?.url" ? "bg-[#C8EE44] text-[#1B212D]" : ""
          }  font-medium rounded-[10px] px-2`}
        >
          <div
            className={`group-hover:bg-[#C8EE44] group-hover:text-[#1B212D] ${
              pathName === "element?.url" ? "text-[#1B212D]" : "text-white"
            }`}
          >
            <RiLogoutCircleRFill className="w-[25px] h-[25px]" />
          </div>{" "}
          <p
            className={`group-hover:text-[#1B212D] ${
              pathName === "element?.url" ? "text-[#1B212D]" : "text-white"
            }`}
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}

export default InvoiceMateSidebar;
