import React, { useState } from "react";
import { useInvoiceMateUser } from "../../../context/invoiceContext";
import CustomInput from "../../../Components/SharedComponents/CustomInput";
import CustomInputTwo from "../../../Components/SharedComponents/CustomInput/CustomInputTwo";
import { BackArrow } from "../../../utils/icons";
import { useNavigate } from "react-router";
import { BASE_URL_TWO, routes } from "../../../utils/config";
import { useFormik } from "formik";
import CustomDatePickerTwo from "../../../Components/SharedComponents/DatePicker/CustomDatePickerTwo";
import dayjs from "dayjs";
import * as Yup from "yup";
import axios from "axios";
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  mobile_number: Yup.string()
    .required("Mobile number is required")
    .matches(/^\d{10,15}$/, "Mobile number must be 10 to 15 digits"),

  date_of_birth: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
});
function InvoiceSignup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useInvoiceMateUser();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile_number: "",
      date_of_birth: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post(`${BASE_URL_TWO}/users/register`, values);
        if (res?.status === 201) {
          navigate(routes.INVOICE_MATE.SUCCESS_PAGE);
        }
      } catch (e) {
        console.log(e, "flasdjhflkasjhkjdas");
        setError(e?.response?.data?.message);
      }
    },
  });
  const handleDateChange = (date) => {
    formik.setFieldValue("date_of_birth", dayjs(date));
  };

  return (
    <div className=" w-full h-screen bg-[#1C1A2E] flex items-center justify-center ">
      <div className="w-full max-w-[1000px] h-full px-5 py-5 flex flex-col gap-5 justify-between">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-[12px]">
            <img src="/magloIcon.png" className="w-[50px] h-[50px]" />
            <p className="text-[30px] text-white font-bold">Maglo</p>
          </div>
          <p
            onClick={() => navigate(routes.TASK)}
            className="text-white border-gray-400 border-[1px] p-2 px-5 rounded-[5px] flex items-center gap-2 cursor-pointer  "
          >
            <BackArrow /> Task Forge
          </p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-[25px]"
        >
          <div className="flex flex-col gap-3">
            <h1 className="text-[35px] font-bold text-white">
              Welcome to Maglo
            </h1>
            <p className="text-white text-[18px]">
              Please enter your credentials
            </p>
          </div>
          <div className="flex flex-row items-center gap-5">
            <CustomInputTwo
              label="Full Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
            />
            <CustomInputTwo
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-5">
            <CustomInputTwo
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && formik.errors.password}
            />
            <CustomInputTwo
              label="Mobile Number"
              name="mobile_number"
              value={formik.values.mobile_number}
              onChange={formik.handleChange}
              error={
                formik.touched.mobile_number && formik.errors.mobile_number
              }
            />
          </div>
          <div className="">
            <CustomDatePickerTwo
              label="Date of birth"
              value={formik.values.date_of_birth}
              onChange={handleDateChange}
              error={
                formik.touched.date_of_birth && formik.errors.date_of_birth
              }
              // disabled={!eidt}
            />
          </div>
          {error && <p className = 'text-red-500 text-[12px]'>{error}</p>}
          <button
            type="submit"
            className="bg-[#C8EE44] hover:bg-[#c9ee44cb] text-[#1B212D] text-[16px] font-medium rounded-[10px] py-[14px] cursor-pointer  "
          >
            Create Account
          </button>
          <p className="text-center text-gray-400">
            Already have an account ?
            <span
              className="text-white underline cursor-pointer"
              onClick={() => navigate(routes.INVOICE_MATE.INDEX)}
            >
              {" "}
              Sign In
            </span>
          </p>
        </form>
        <p className="text-gray-400">
          All copyrights are reserved to Imtiaz Ahmed.
        </p>
      </div>
    </div>
  );
}

export default InvoiceSignup;
