import React, { useEffect, useState } from "react";
import InvPageHeader from "../../../Components/InvoiceMate/InvPageHeader/InvPageHeader";
import { BASE_URL_TWO, routes } from "../../../utils/config";
import ClientTable from "../../../Components/Tables/ClientTable";
import axios from "axios";
import { useInvoiceMateUser } from "../../../context/invoiceContext";

function ClientManagement() {
  const [filters, setFilters] = useState({
    email: "",
  });
  const [data, setData] = useState([]);
  const { token } = useInvoiceMateUser();
  const fetchClients = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL_TWO}/client/get-all-clients?email=${filters?.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.status === 200) {
        setData(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchClients();
  }, [filters]);
  const handleFilterChange = async (e) => {
    setFilters((prev) => ({
      ...prev,
      email: e.target.value,
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
    </div>
  );
}

export default ClientManagement;
