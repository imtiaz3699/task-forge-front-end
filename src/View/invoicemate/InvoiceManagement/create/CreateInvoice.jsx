import { useEffect, useState } from "react";
import CustomSelectTwo from "../../../../Components/SharedComponents/CustomSelect/CustomSelectTwo";
import CustomInputTwo from "../../../../Components/SharedComponents/CustomInput/CustomInputTwo";
import CustomDatePickerTwo from "../../../../Components/SharedComponents/DatePicker/CustomDatePickerTwo";
import { RadioButton } from "../../../../Components/SharedComponents/RadioButton/RadioButton";
import CustomButton from "../../../../Components/SharedComponents/CustomButton/CustomButton";
import MultiSelect from "../../../../Components/SharedComponents/MultiSelect/MultiSelect";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { ApiFun } from "../../../../Components/apis/apis";
import axios from "axios";
import { BASE_URL_TWO, routes } from "../../../../utils/config";
import { useInvoiceMateUser } from "../../../../context/invoiceContext";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
function CreateInvoice() {
  const { product, client } = ApiFun();
  const { id } = useParams();
  const { token } = useInvoiceMateUser();
  const [products, setProducts] = useState([]);
  const [searchedClient, setSearchedClients] = "";

  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const status = [
    {
      label: "Paid",
      value: "paid",
    },
    {
      label: "Un-paid",
      value: "un_paid",
    },
    {
      label: "Overdue",
      value: "overdue",
    },
    {
      label: "Draft",
      value: "draft",
    },
  ];
  const paymentMethods = [
    {
      label: "Cash",
      value: "cash",
    },
    {
      label: "Bank Transfer",
      value: "bank_transfer",
    },
  ];
  const currency = [
    {
      label: "PKR",
      value: "pkr",
    },
  ];
  const formik = useFormik({
    initialValues: {
      client_id: "",
      invoice_number: "",
      date_of_issue: "",
      due_date: "",
      status: "",
      payment_method: "",
      notes: "",
      terms: "",
      currency: "",
      product_id: [],
      tax_included: false,
    },
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        client_id: values?.client_id,
        invoice_number: values?.invoice_number,
        date_of_issue: dayjs(values?.date_of_issue).format("YYYY-MM-DD"),
        due_date: dayjs(values?.due_date).format("YYYY-MM-DD"),
        status: values?.status,
        payment_method: values?.payment_method,
        notes: values?.notes,
        terms: values?.terms,
        currency: values?.currency,
        product_id: values?.product_id,
        tax_included: values?.tax_included,
      };

      try {
        if (id) {
          const res = await axios.put(
            `${BASE_URL_TWO}/invoice/update/${id}`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          const res = await axios.post(
            `${BASE_URL_TWO}/invoice/create`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res?.status === 201) {
            toast("Invocie has been created successfully!");
            navigate(routes.INVOICE_MATE.INVOICE_MANAGEMENT);
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
  });

  // const handleChangeClient = (e) => {
  //   formik.setFieldValue("client_id", e.target.value);
  // };
  const handleDateChange = (date) => {
    formik.setFieldValue("date_of_issue", dayjs(date));
  };
  const handleDueDate = (date) => {
    formik.setFieldValue("due_date", dayjs(date));
  };
  const handleChange = (e) => {
    if (e.target.name === "status") {
      formik.setFieldValue("status", e.target.value);
    } else if (e.target.name === "payment_method") {
      formik.setFieldValue("payment_method", e.target.value);
    } else {
      formik.setFieldValue("currency", e.target.value);
    }
  };
  const handleSearchProduct = async (e) => {
    try {
      const res = await axios.get(
        `${BASE_URL_TWO}/product/get-all-products?product_name=${e}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res?.data?.data;
      if (res?.status === 200) {
        const pro = data?.map((element, idx) => {
          return {
            label: element?.title,
            value: element?._id,
          };
        });
        setProducts(pro);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSelectProduct = (e) => {
    formik.setFieldValue("product_id", e);
  };
  const handleSelectClient = (e) => {
    formik.setFieldValue("client_id", e);
  };
  const getSingleInvoie = async () => {
    if (!id) return;
    try {
      const res = await axios.get(
        `${BASE_URL_TWO}/invoice/get-single-invoice/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res?.data;
      if (res?.status === 200) {
        formik.setValues({
          client_id: data?.client_id,
          invoice_number: data?.invoice_number,
          date_of_issue: dayjs(data?.date_of_issue),
          due_date: dayjs(data?.due_date),
          status: data?.status,
          payment_method: data?.payment_method,
          notes: data?.notes,
          terms: data?.terms,
          currency: data?.currency,
          product_id: data?.product_id,
          tax_included: data?.tax_included,
        });
        const pro = data?.product_id?.map((element, idx) => {
          return {
            label: element?.title,
            value: element?._id,
          };
        });
        setProducts(pro);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSearchClient = async (e) => {
    try {
      const res = await axios.get(
        `${BASE_URL_TWO}/client/get-all-clients?name=${e}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res?.data?.data;
      if (res?.status === 200) {
        const cli = data?.map((element, idx) => {
          return {
            label: element?.full_name,
            value: element?._id,
          };
        });
        setClients(cli);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getSingleInvoie();
  }, [id]);
  const handleChangeClient = (selectedId) => {
    const selectedClient = clients?.find((c) => c?.value === selectedId);
    formik.setFieldValue("client_id", selectedClient?.value);
  };
  return (
    <div className="px-[40px] w-full">
      <div className="flex flex-col ">
        <h1 className="font-medium text-[22px] text-white">Invoice </h1>
        <p className="text-[18px] text-gray-400">Enter invoice details.</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-[40px] mt-5">
          <div className="flex flex-row items-center gap-[40px] justify-between w-full">
            {/* <CustomSelectTwo
              label="Client"
              name="client_id"
              value={formik.values.client_id}
              onChange={handleChangeClient}
              options={clients}
              preSelect={"Please select client"}
            /> */}
            <MultiSelect
              value={searchedClient}
              showSearh={true}
              onSearch={handleSearchClient}
              label="Client"
              options={clients}
              onChange={handleChangeClient}
            />
          </div>
          <div className="flex flex-row items-center gap-[40px] justify-between w-full">
            <CustomDatePickerTwo
              label="Date Issue"
              value={formik.values.date_of_issue}
              onChange={handleDateChange}
              // disabled={!eidt}
            />
            <CustomDatePickerTwo
              label="Due Date"
              value={formik.values.due_date}
              onChange={handleDueDate}
            />
          </div>
          <div className="flex flex-row items-center gap-[40px] justify-between max-w-full  ">
            <CustomSelectTwo
              label="Status"
              options={status}
              preSelect={"Select Status"}
              name="status"
              value={formik.values.status}
              onChange={handleChange}
            />
            <CustomSelectTwo
              label="Payment Method"
              options={paymentMethods}
              onChange={handleChange}
              preSelect={"Select Payment Method"}
              name="payment_method"
              value={formik.values.payment_method}
            />
          </div>
          <div className="flex flex-row items-center gap-[40px] justify-between max-w-full  ">
            <CustomInputTwo
              label="Notes"
              name="notes"
              value={formik.values.notes}
              onChange={formik.handleChange}
            />
            <CustomInputTwo
              label="Terms"
              name="terms"
              value={formik.values.terms}
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex flex-row items-center gap-[40px] justify-between max-w-full  ">
            <CustomSelectTwo
              label="Currency"
              value={formik.values.currency}
              options={currency}
              preSelect={"Select Currency"}
              onChange={handleChange}
            />
            <MultiSelect
              onSearch={handleSearchProduct}
              label="Products"
              options={products}
              onChange={handleSelectProduct}
            />
          </div>
          <div className="w-full">
            <RadioButton
              label="Tax Included"
              checked={formik.values.tax_included}
              name="tax_included"
              onChange={formik.handleChange}
            />
          </div>
          <div className="flex items-center justify-end max-w-full gap-5">
            <CustomButton label="Cancel" cancelButton={true} />
            <CustomButton label="Submit" type="submit" />
          </div>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}

export default CreateInvoice;
