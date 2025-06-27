import { Button, Dropdown, Modal, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { CloseIcon, ThreeDots } from "../../../utils/icons";
import { useFormik } from "formik";
import CreateCategory from "./Create";
import axios from "axios";
import { BASE_URL_TWO } from "../../../utils/config";
import { useInvoiceMateUser } from "../../../context/invoiceContext";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
function Category() {
  const [data, setData] = useState([]);
  const { token } = useInvoiceMateUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState("");

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required."),
    description: Yup.string().required("Description is required."),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (edit) {
          const res = await axios.put(
            `${BASE_URL_TWO}/category/update/${edit}`,
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res?.status === 200) {
            resetForm();
            handleCancel();
            fetchCategories();
            toast("Category updated.");
          }
        } else {
          const res = await axios.post(
            `${BASE_URL_TWO}/category/create`,
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res?.status === 201) {
            resetForm();
            handleCancel();
            fetchCategories();
            toast("Category created successfully!");
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
  });
  const fetchCategories = async () => {
    const res = await axios.get(`${BASE_URL_TWO}/category/get-all-categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.status === 200) {
      setData(res?.data);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const handleEdit = (obj) => {
    setIsModalOpen(true);
    setEdit(obj?._id);
    formik.setValues({
      title: obj?.title,
      description: obj?.description,
    });
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL_TWO}/category/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.status === 200) {
        toast("Category deleted!");
      }
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

  const handleCancel = () => {
    setIsModalOpen(false);
    formik.resetForm();
    setEdit("");
  };
  return (
    <div className="px-[40px] flex flex-col h-screen overflow-auto gap-[25px] scroll-thin w-full">
      <div className="  relative border-b-[#322e5a] border-b-[1px] w-full pb-5 mt-5 flex items-center justify-end">
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="bg-[#C8EE44] hover:bg-[#c9ee44a1] hover:text-white w-[165px] h-[48px] rounded-[5px] flex items-center justify-center gap-[5px] font-medium cursor-pointer"
        >
          Create Category
        </button>
      </div>
      <div className="relative overflow-y-auto shadow-md sm:rounded-lg w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs w-full text-[#78778B] uppercase bg-transparent">
            <tr>
              <th scope="col" className="px-6 py-3 text-white">
                Category Name
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {data?.map((element, idx) => {
              const items = generateItems(element, ["Edit", "Delete"]);
              return (
                <tr className=" border-b w-full dark:border-gray-700 border-gray-200 bg-gransparent dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-400"
                  >
                    {element?.title}
                  </th>
                  <td className="px-6 py-4">{element?.description}</td>
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
      </div>

      <Modal
        title={
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-white text-[25px]">Create Category</p>
            <div onClick={handleCancel}>
              <CloseIcon className="!text-white !bg-white" />
            </div>
          </div>
        }
        closable={false}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <>
          <CreateCategory formik={formik} handleCancel={handleCancel} />
        </>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Category;
