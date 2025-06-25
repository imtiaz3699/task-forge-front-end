import React, { useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import CustomInputTwo from "../../../Components/SharedComponents/CustomInput/CustomInputTwo";
import { useInvoiceMateUser } from "../../../context/invoiceContext";
import { useFormik } from "formik";
import { useParams } from "react-router";
import axios from "axios";
import { BASE_URL_TWO } from "../../../utils/config";

function InvoiceSettings() {
  const { user, token } = useInvoiceMateUser();
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      new_password: "",
      confirm_password: "",
      date_of_birth: "",
      mobile_number: "",
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const payload = {
        name: values?.first_name + values?.last_name,
        email: values?.email,
        password: values?.new_password,
        mobile_number: values?.mobile_number,
        date_of_birth: values?.date_of_birth,
      };
      try {
        const res = await axios.put(
          BASE_URL_TWO + `/users/${user?._id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res, "falsdfhaskjdfhskd");
      } catch (e) {
        console.log(e);
      }
    },
  });
  const getProfile = async () => {
    if (!id) return;
    try {
      const response = await axios.get(BASE_URL_TWO + `/auth/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response?.data;
      console.log(data, formik?.values, "responeData");
      if (response?.status === 200) {
        formik.setFieldValue("first_name", data?.split(" ")[0]);
        formik.setFieldValue("last_name", data?.split(" ")[1]);
        formik.setFieldValue("email", data?.email);
        formik.setFieldValue("mobile_number", data?.mobile_number);
        formik.setFieldValue("date_of_birth", data?.date_of_birth);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProfile();
  }, [id]);

  return (
    <div className="px-[40px] overflow-auto scroll-thin">
      <div className="bg-[#201E34] max-w-[977px] p-[40px] rounded-[10px]">
        <div className="flex flex-col">
          <h1 className="font-medium text-[25px] text-white">
            Account Information
          </h1>
          <p className="text-[#78778B]">Update your account information</p>
        </div>
        <div className="mt-[40px] w-full flex items-center justify-between">
          <p className="text-[20px] font-medium text-white">
            Personal Information
          </p>
          <div className="text-[#29A073] flex flex-row items-center gap-2">
            <BiEditAlt />
            <span>Edit</span>
          </div>
        </div>
        <form onClick={formik.handleSubmit}>
          <div className="flex flex-col gap-[20px] mt-[40px] w-full">
            <div className="flex flex-row items-center gap-[40px] w-full">
              <CustomInputTwo
                label="First Name"
                name="first_name"
                value={formik.values?.first_name}
                onChange={formik.handleChange}
                error={formik.touched && formik.errors.first_name}
              />
              <CustomInputTwo
                label="Last Name"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                error={formik.touched && formik.errors.last_name}
              />
            </div>
            <div className="flex flex-row items-center gap-[40px] w-full">
              <CustomInputTwo
                label="Date of Birth"
                name="date_of_birth"
                value={formik.values.date_of_birth}
                onChange={formik.handleChange}
                error={formik.touched && formik.errors.date_of_birth}
              />
              <CustomInputTwo
                label="Mobile Number"
                name="mobile_number"
                value={formik.values.mobile_number}
                onChange={formik.handleChange}
                error={formik.touched && formik.errors.mobile_number}
              />
            </div>
            <CustomInputTwo
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched && formik.errors.email}
            />
            <div className="flex flex-row items-center gap-[40px] w-full">
              <CustomInputTwo
                label="New Password"
                name="new_password"
                value={formik.values.new_password}
                onChange={formik.handleChange}
                error={formik.touched && formik.errors.new_password}
              />
              <CustomInputTwo 
              label="Confirm Password" 
              name = 'confirm_password'
              value = {formik.values.confirm_password}
              onChange={formik.handleChange}
              error = {formik.touched && formik.errors.confirm_password}
              />
            </div>

            <button
              type="submit"
              className="bg-[#29A073] w-[190px] h-[52px] rounded-[5px] text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvoiceSettings;
