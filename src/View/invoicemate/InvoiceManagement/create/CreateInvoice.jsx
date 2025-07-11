import { useEffect, useState } from "react";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { ApiFun } from "../../../../Components/apis/apis";
import axios from "axios";
import { BASE_URL_TWO, routes } from "../../../../utils/config";
import { useInvoiceMateUser } from "../../../../context/invoiceContext";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import CreateInvoiceForm from "./Form";
import * as Yup from "yup";

const validationSchema = Yup.object({
  client_id: Yup.string().required("Invalid client Id"),
  date_of_issue: Yup.string("Date of issue is required.").required(
    "Date of issue is required."
  ),
  due_date: Yup.string("Due date is required.").required(
    "Due date is required."
  ),
  status: Yup.string("Status is required.").required("Status is required."),
  payment_method: Yup.string("Payment method is required.").required(
    "Payment method is required."
  ),
  notes: Yup.string("Notes is required.").required("Notes is required."),
  terms: Yup.string("Terms is required.").required("Terms is required."),
  currency: Yup.string("Currency is required.").required(
    "Currency is required."
  ),
  product_id: Yup.array()
    .of(Yup.string().required("Invalid client id"))
    .min(1, "At least on product is required.")
    .required("Please select a client."),
  is_active: Yup.boolean(),
});
function CreateInvoice() {
  const { product, client } = ApiFun();
  const { id } = useParams();
  const { token } = useInvoiceMateUser();
  const [products, setProducts] = useState([]);
  const [searchedClient, setSearchedClients] = useState("");
  const [fetchedProducts, setFetchedProducts] = useState([]);
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
      date_of_issue: "",
      due_date: "",
      status: "",
      payment_method: "",
      notes: "",
      terms: "",
      currency: "",
      product_id: [],
      products: [],
      tax_included: false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      values.products = values?.products?.map((element, idx) => ({
        unit_price: element?.price,
        product_id: element?.product_id,
        quantity: element?.quantity ?? 1,
        total_price: element?.price * (element?.quantity ?? 1),
      }));
      const payload = {
        client_id: values?.client_id,
        date_of_issue: dayjs(values?.date_of_issue).format("YYYY-MM-DD"),
        due_date: dayjs(values?.due_date).format("YYYY-MM-DD"),
        status: values?.status,
        payment_method: values?.payment_method,
        notes: values?.notes,
        terms: values?.terms,
        currency: values?.currency,
        product_id: values?.product_id,
        products: values?.products,
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
          console.log(res,'fasdlfahsdfkhasdfasdk')
          if (res?.status === 200) {
            toast("Invocie has been created successfully!");
            navigate(routes.INVOICE_MATE.INVOICE_MANAGEMENT);
          }
          
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
        setFetchedProducts(data);
        setProducts(pro);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSelectProduct = (e) => {
    const isRemoving = formik.values?.products?.length > e?.length;
    if (isRemoving) {
      const removedProducts = formik.values?.products?.filter((p) =>
        e?.includes(p?.product_id)
      );
      formik.setFieldValue("products", removedProducts);
      formik.setFieldValue("product_id", e);
    } else {
      const product = new Map(fetchedProducts.map((p) => [p._id, p]));

      const matchedProducts = e?.map((id) => product.get(id)).filter(Boolean);
      const isExists = matchedProducts?.filter((element) => {
        const found = formik.values.products?.some(
          (p) => p?.product_id === element?._id
        );
        return !found;
      });
      const newProducts = isExists?.map((pro) => ({
        product_id: pro?._id,
        title: pro?.title,
        price: pro?.price,
      }));
      const nProducts = [...formik.values.products, ...newProducts];
      formik.setFieldValue("products", nProducts);
      formik.setFieldValue("product_id", e);
    }
    if (!e?.length) {
      return;
    }
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
          client_id: data?.client_id?._id,
          date_of_issue: dayjs(data?.date_of_issue),
          due_date: dayjs(data?.due_date),
          status: data?.status,
          payment_method: data?.payment_method,
          notes: data?.notes,
          terms: data?.terms,
          currency: data?.currency,
          product_id: data?.product_id?.map((element, idx) => element?._id),
          products: data?.products?.map((element, idx) => ({
            quantity: element?.quantity,
            total_price: element?.total_price,
            unit_price: element?.unit_price,
            title: element?.product_id?.title,
          })),
          tax_included: data?.tax_included,
        });

        const pro = data?.product_id?.map((element, idx) => {
          return {
            label: element?.title,
            value: element?._id,
          };
        });
        setSearchedClients(data?.client_id?._id);
        setClients([
          {
            label: data?.client_id?.full_name,
            value: data?.client_id?._id,
          },
        ]);
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
    if (!selectedClient) return;
    const clientId = selectedClient.value;
    formik.setFieldValue("client_id", clientId);
    setSearchedClients(clientId);
  };
  return (
    <div className="px-[40px] w-full">
      <div className="flex flex-col">
        <h1 className="font-medium text-[22px] text-white">Invoice </h1>
        <p className="text-[18px] text-gray-400">Enter invoice details.</p>
      </div>
      <CreateInvoiceForm
        formik={formik}
        searchedClient={searchedClient}
        handleSearchClient={handleSearchClient}
        clients={clients}
        handleChangeClient={handleChangeClient}
        handleDateChange={handleDateChange}
        handleDueDate={handleDueDate}
        status={status}
        handleChange={handleChange}
        paymentMethods={paymentMethods}
        handleSearchProduct={handleSearchProduct}
        products={products}
        handleSelectProduct={handleSelectProduct}
        currency={currency}
      />
      <ToastContainer />
    </div>
  );
}

export default CreateInvoice;
