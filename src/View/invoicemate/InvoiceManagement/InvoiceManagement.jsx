import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import InvoiceTable from "../../../Components/Tables/InvoiceTable";
import { useNavigate } from "react-router";
import { BASE_URL_TWO, routes } from "../../../utils/config";
import { useInvoiceMateUser } from "../../../context/invoiceContext";
import axios from "axios";
import { Pagination } from "antd";
import InvPageHeader from "../../../Components/InvoiceMate/InvPageHeader/InvPageHeader";

function InvoiceManagement() {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 1,
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
  });
  const [filters, setFilters] = useState({
    invoice_no: "",
  });
  const [data, setData] = useState([]);
  const { token } = useInvoiceMateUser();
  const fetchInvoices = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL_TWO}/invoice/get-all-invoices?offset=${pagination?.currentPage}&invoice_number=${filters?.invoice_no}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res?.data;
      if (res?.status === 200) {
        setData(data?.data);
        setPagination({
          totalPages: data?.totalPages,
          totalResults: data?.totalResults,
          currentPage: data?.currentPage,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchInvoices();
  }, [pagination?.currentPage, filters]);
  const handleChangePage = (value) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: value,
    }));
  };
  const handleFilterChange = async (e) => {
    setFilters((prev) => ({
      ...prev,
      invoice_no: e.target.value,
    }));
  };
  console.log(filters?.invoice_no, "InvoiceNumber");
  return (
    <div className="px-[40px] flex flex-col h-screen overflow-auto gap-[25px] scroll-thin">
      {/* <div className="  relative border-b-[#322e5a] border-b-[1px] w-full pb-5 flex items-center justify-between">
        <input
          className="w-[290px] h-[45px] text-[12px] p-2 border border-gray-700 rounded-[10px] text-gray-300"
          placeholder="Search Transactions"
        />
        <div className="flex items-center gap-[30px] ">
          <button
            onClick={() => navigate(routes.INVOICE_MATE.CREATE_INVOICE)}
            className="bg-[#C8EE44] w-[165px] h-[48px] rounded-[5px] flex items-center justify-center gap-[5px] font-medium cursor-pointer"
          >
            <img src="/invoie.png" /> Create Invoice
          </button>
          <button className="w-[110px] h-[48px] rounded-[5px] border-[1px] border-gray-500 text-white flex items-center gap-2 justify-center cursor-pointer">
            <IoFilter /> Filter
          </button>
        </div>
      </div> */}
      <InvPageHeader
        redirect={routes.INVOICE_MATE.CREATE_INVOICE}
        btnText="Create Invoice"
        placeholder="Search invoice nummber..."
        valueKey={filters?.invoice_no}
        handleFilterChange={handleFilterChange}
      />

      <InvoiceTable data={data} fetchInvoices={fetchInvoices} />
      <div className="flex items-center justify-end">
        <Pagination
          defaultCurrent={pagination?.currentPage}
          total={pagination?.totalResults}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default InvoiceManagement;
