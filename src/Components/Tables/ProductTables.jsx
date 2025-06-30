import { Dropdown, Image, Popconfirm, Tooltip } from "antd";
import { ThreeDots } from "../../utils/icons";
import axios from "axios";
import { BASE_URL_TWO, routes } from "../../utils/config";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useInvoiceMateUser } from "../../context/invoiceContext";

function ProductTables({ data,fetchProducts,handleFilterChange }) {
  const navigate = useNavigate();
  const { token } = useInvoiceMateUser();
  const handleEdit = (obj) => {
    navigate(`${routes.INVOICE_MATE.UPDATE_PRODUCT}/${obj?._id}`);
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
        `${BASE_URL_TWO}/product/delete-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.status === 200) {
        toast("Product Deleted!");
      }
      fetchProducts()
    } catch (e) {
      console.log(e, "falsdjkhfsdkj");
      toast(e?.message, {
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
              Product Image
            </th>
            <th scope="col" className="px-6 py-3">
              Produt Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Short Description
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Curency
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              Is Active
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              Is Featured
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              Product Dimentions
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
                  <Image
                    src={element?.thumbnail?.[0]?.url}
                    className="!w-[50px] !h-[50px] rounded-full"
                  />
                  <img />
                </th>
                <td className="px-6 py-4">{element?.title}</td>
                <td className="px-6 py-4">
                  <Tooltip
                    placement="topLeft"
                    title={
                      element?.description?.length > 30
                        ? `${element?.description}...`
                        : element?.description
                    }
                  >
                    {element?.description?.length > 30
                      ? `${element?.description}...`
                      : element?.description}
                  </Tooltip>
                </td>
                <td className="px-6 py-4">
                  <Tooltip
                    placement="topLeft"
                    title={
                      element?.short_description?.length > 30
                        ? `${element?.short_description}...`
                        : element?.short_description
                    }
                  >
                    {element?.short_description?.length > 30
                      ? `${element?.short_description}...`
                      : element?.short_description}
                  </Tooltip>
                </td>
                <td className="px-6 py-4">{element?.price}</td>
                <td className="px-6 py-4 uppercase">{element?.currency}</td>
                <td className="px-6 py-4 uppercase">
                  {element?.category?.title}
                </td>
                <td className="px-6 py-4 uppercase">
                  {element?.quantity ? 0 : element?.quantity}
                </td>
                <td className="px-6 py-4 uppercase">
                  {element?.isActive ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 uppercase">
                  {element?.isFeatured ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 uppercase">{`H:${element?.dimensions?.height} W:${element?.dimensions?.width} D:${element?.dimensions?.depth}`}</td>
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

export default ProductTables;
