import React, { useEffect, useState } from "react";
import InvPageHeader from "../../../Components/InvoiceMate/InvPageHeader/InvPageHeader";
import { BASE_URL_TWO, routes } from "../../../utils/config";
import ClientTable from "../../../Components/Tables/ClientTable";
import axios from "axios";
import { useInvoiceMateUser } from "../../../context/invoiceContext";
import { Pagination } from "antd";

function ClientManagement() {
  const [filters, setFilters] = useState({
    email: "",
  });
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 1,
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
  });
  const [data, setData] = useState([]);
  const { token } = useInvoiceMateUser();
  const fetchClients = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL_TWO}/client/get-all-clients?email=${filters?.email}&offset=${pagination.currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data
      if (res?.status === 200) {
        setData(res?.data?.data);
        setPagination({
          totalPages: data?.totalPages,
          totalResults: data?.totalResults,
          currentPage: data?.currentPage,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchClients();
  }, [filters, pagination?.currentPage]);
  const handleFilterChange = async (e) => {
    setFilters((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };
  const handleChangePage = (value) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: value,
    }));
  };
  return (
    <div className="px-[40px] flex flex-col h-screen overflow-auto gap-[25px] scroll-thin">
      <InvPageHeader
        redirect={routes.INVOICE_MATE.CREATE_CLIENT}
        btnText="Create Client"
        placeholder="Search client email..."
        valueKey={filters?.email}
        handleFilterChange={handleFilterChange}
      />
      <ClientTable data={data} fetchClient={fetchClients} />
      <div className='flex items-center justify-end'>
        <Pagination
          defaultCurrent={pagination?.currentPage}
          total={pagination?.totalResults}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default ClientManagement;
