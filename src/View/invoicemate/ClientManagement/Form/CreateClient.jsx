import React, { useEffect } from "react";
import CustomInputTwo from "../../../../Components/SharedComponents/CustomInput/CustomInputTwo";
import { useFormik } from "formik";
import CustomButton from "../../../../Components/SharedComponents/CustomButton/CustomButton";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BASE_URL_TWO, routes } from "../../../../utils/config";
import { useInvoiceMateUser } from "../../../../context/invoiceContext";
import { useNavigate, useParams, useSearchParams } from "react-router";
function CreateClient() {
  const { id } = useParams();
  const clientValidationSchema = Yup.object().shape({
    full_name: Yup.string()
      .required("Full name is required")
      .min(2, "Name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone_number: Yup.string()
      .required("Phone number is required")
      .matches(/^\+?[0-9\s\-()]{7,20}$/, "Invalid phone number"),
    company_name: Yup.string().max(100, "Company name is too long").nullable(),
  });
  const navigate = useNavigate();
  const { token } = useInvoiceMateUser();
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      phone_number: "",
      company_name: "",
      address: "",
      city: "",
      country: "",
      postal_code: "",
      website: "",
      notes: "",
    },
    validationSchema: clientValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (id) {
          const res = await axios.put(
            `${BASE_URL_TWO}/client/update-client/${id}`,
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res?.status === 200) {
            navigate(routes.INVOICE_MATE.CLIENT_MANAGEMENT);
            toast("Client created successfully.");
            resetForm();
          }
        } else {
          const res = await axios.post(
            `${BASE_URL_TWO}/client/create`,
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res?.status === 201) {
            navigate(routes.INVOICE_MATE.CLIENT_MANAGEMENT);
            toast("Client created successfully.");
            resetForm();
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
  });
  const fetchSingleClient = async () => {
    if (!id) return;
    try {
      const res = await axios.get(
        `${BASE_URL_TWO}/client/get-single-client/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.status === 200) {
        const data = res?.data;
        formik.setValues({
          full_name: data?.full_name,
          email: data?.email,
          phone_number: data?.phone_number,
          company_name: data?.company_name,
          address: data?.address,
          city: data?.city,
          country: data?.country,
          postal_code: data?.postal_code,
          website: data?.website,
          notes: data?.notes,
        });
      }
      console.log(res, "I am Responsible");
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchSingleClient();
  }, [id]);
  console.log(id, "fadslfkjahsdlkfj");
  return (
    <div className="px-[40px] w-full overflow-auto scroll-thin mb-10">
      <div className="flex flex-col ">
        <h1 className="font-medium text-[22px] text-white">
          Client Management{" "}
        </h1>
        <p className="text-[18px] text-gray-400">Enter Client Details</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className="flex flex-col gap-[40px] mt-5"
      >
        <div className="flex flex-row items-start gap-[40px] justify-between w-full">
          <CustomInputTwo
            label="Full Name"
            value={formik.values.full_name}
            onChange={formik.handleChange}
            name="full_name"
            error={formik.touched.full_name && formik.errors.full_name}
          />
          <CustomInputTwo
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            error={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className="flex flex-row items-start gap-[40px] justify-between w-full">
          <CustomInputTwo
            label="Phone Number"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            name="phone_number"
            error={formik.touched.phone_number && formik.errors.phone_number}
          />
          <CustomInputTwo
            label="Company"
            value={formik.values.company_name}
            onChange={formik.handleChange}
            name="company_name"
            error={formik.touched.company_name && formik.errors.company_name}
          />
        </div>
        <div className="flex flex-row items-start gap-[40px] justify-between w-full">
          <CustomInputTwo
            label="Country"
            value={formik.values.country}
            onChange={formik.handleChange}
            name="country"
          />
          <CustomInputTwo
            label="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            name="city"
          />
        </div>
        <div className="flex flex-row items-start gap-[40px] justify-between w-full">
          <CustomInputTwo
            label="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            name="address"
          />
          <CustomInputTwo
            label="Postal Code"
            value={formik.values.postal_code}
            onChange={formik.handleChange}
            name="postal_code"
          />
        </div>
        <div className="flex flex-row items-start gap-[40px] justify-between w-full">
          <CustomInputTwo
            label="Website"
            value={formik.values.website}
            onChange={formik.handleChange}
            name="website"
          />
          <CustomInputTwo
            label="Notes"
            value={formik.values.notes}
            onChange={formik.handleChange}
            name="notes"
          />
        </div>
        <div className="flex items-center justify-end max-w-full gap-5">
          <CustomButton
            label="Cancel"
            cancelButton={true}
            onClick={() => navigate(routes.INVOICE_MATE.CLIENT_MANAGEMENT)}
          />
          <CustomButton label="Submit" type="submit" />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateClient;
