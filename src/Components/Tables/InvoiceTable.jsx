import { Dropdown, Popconfirm } from "antd";
import dayjs from "dayjs";
import { ThreeDots } from "../../utils/icons";
import axios from "axios";
import { BASE_URL_TWO, routes } from "../../utils/config";
import { useInvoiceMateUser } from "../../context/invoiceContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

function InvoiceTable({ data, fetchInvoices }) {
  console.log(data,'fadslfkjahsdlfads')
  const { token } = useInvoiceMateUser();
  const navigate = useNavigate();
  const handleEdit = (obj) => {
    navigate(`${routes.INVOICE_MATE.UPDATE_INVOICE}/${obj?._id}`);
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
            // onCancel={cancel}
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
        `${BASE_URL_TWO}/invoice/delete-invoice/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.status === 200) {
        toast("Product Deleted!");
      }
      fetchInvoices();
    } catch (e) {
      toast(e?.message, {
        role: "error",
      });
    }
  };
  return (
    <div className="relative overflow-y-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-[#78778B] uppercase bg-transparent">
          <tr className="font-bold text-gray-300">
            <th scope="col" className="px-6 py-3">
              Invoice Number
            </th>
            <th scope="col" className="px-6 py-3">
              Client
            </th>
            <th scope="col" className="px-6 py-3">
              Date Of Issue
            </th>
            <th scope="col" className="px-6 py-3">
              Due Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Payment Method
            </th>
            <th scope="col" className="px-6 py-3">
              Notes
            </th>
            <th scope="col" className="px-6 py-3">
              Terms
            </th>
            <th scope="col" className="px-6 py-3">
              Currency
            </th>
            <th scope="col" className="px-6 py-3">
              Tax Included
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
                <th scope="row" className="px-6 py-4">
                  {element?.invoice_number}
                </th>
                <td className="px-6 py-4">{element?.client_id?.full_name}</td>
                <td className="px-6 py-4">
                  {dayjs(element?.date_of_issue).format("MM-DD-YYYY")}
                </td>
                <td className="px-6 py-4">
                  {dayjs(element?.due_date).format("MM-DD-YYYY")}
                </td>
                <td className="px-6 py-4 uppercase">{element?.status}</td>
                <td className="px-6 py-4">{element?.payment_method}</td>
                <td className="px-6 py-4">{element?.notes}</td>
                <td className="px-6 py-4">{element?.terms}</td>
                <td className="px-6 py-4 uppercase">{element?.currency}</td>
                <td className="px-6 py-4 ">
                  {element?.tax_included ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4">
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
        <ToastContainer />
      </table>
    </div>
  );
}

export default InvoiceTable;
