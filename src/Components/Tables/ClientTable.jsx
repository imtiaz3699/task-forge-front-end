import { Dropdown, Image, Popconfirm, Tooltip } from "antd";
import React from "react";
import { ThreeDots } from "../../utils/icons";
import { useInvoiceMateUser } from "../../context/invoiceContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BASE_URL_TWO, routes } from "../../utils/config";
import { useNavigate } from "react-router";
function ClientTable({ data, fetchClient }) {
  const { token } = useInvoiceMateUser();
  const navigate = useNavigate();
  const handleEdit = (obj) => {
    navigate(`${routes.INVOICE_MATE.UPDATE_CLIENT}/${obj?._id}`);
  };
  const generateItems = (obj) => {
    const arr = ["Edit", "Delete"];
    return arr.map((element, idx) => {
      const key = (idx + 1).toString();
      const isEdit = element === "Edit";
      return {
        key,
        label: isEdit ? (
          <div onClick={() => handleEdit(obj)}>{element}</div>
        ) : (
          <Popconfirm
            title="Delete the category"
            description="Are you sure to delete this category?"
            onConfirm={() => handleDelete(obj?._id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <div>{element}</div>
          </Popconfirm>
        ),
      };
    });
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${BASE_URL_TWO}/client/delete-client/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.status === 200) {
        toast("Product Deleted!");
      }
      fetchClient();
    } catch (e) {
      toast(e?.message ?? e?.response?.data?.message, {
        role: "error",
      });
    }
  };
  const cancel = (e) => {
    console.log(e);
  };
  return (
    <div className="relative overflow-y-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-[#78778B] uppercase bg-transparent">
          <tr>
            <th scope="col" className="px-6 py-3">
              Full Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3">
              Company Name
            </th>
            <th scope="col" className="px-6 py-3">
              Country
            </th>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Postal Code
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              Website
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              Notes
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((element, idx) => {
            const items = generateItems(element, ["Edit", "Delete"]);
            return (
              <tr className=" border-b  dark:border-gray-700 border-gray-200 bg-gransparent dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {element?.full_name}
                </th>
                <td className="px-6 py-4">{element?.email}</td>
                <td className="px-6 py-4">{element?.phone_number}</td>
                <td className="px-6 py-4">{element?.company_name}</td>
                <td className="px-6 py-4">
                  <Tooltip
                    placement="topLeft"
                    title={
                      element?.country?.length > 15
                        ? `${element?.country}...`
                        : element?.country
                    }
                  >
                    {element?.country?.length > 15
                      ? `${element?.country}...`
                      : element?.country}
                  </Tooltip>
                </td>
                <td className="px-6 py-4 uppercase">{element?.city}</td>
                <td className="px-6 py-4 uppercase">
                  {" "}
                  <Tooltip
                    placement="topLeft"
                    title={
                      element?.address?.length > 15
                        ? `${element?.address}...`
                        : element?.address
                    }
                  >
                    {element?.address?.length > 15
                      ? `${element?.address}...`
                      : element?.address}
                  </Tooltip>
                </td>
                <td className="px-6 py-4 uppercase">{element?.postal_code}</td>
                <td className="px-6 py-4 uppercase">{element?.website}</td>
                <td className="px-6 py-4 uppercase">{element?.notes}</td>

                <td className="flex items-center px-6 py-4">
                  <Dropdown
                    maxHeight={20}
                    trigger={"click"}
                    menu={{ items }}
                    placement="bottomLeft"
                  >
                    <button>
                      <ThreeDots />
                    </button>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default ClientTable;
