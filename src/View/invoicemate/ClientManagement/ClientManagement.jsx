import React from "react";
import InvPageHeader from "../../../Components/InvoiceMate/InvPageHeader/InvPageHeader";
import { routes } from "../../../utils/config";
import ClientTable from "../../../Components/Tables/ClientTable";

function ClientManagement() {
  return (
    <div className="px-[40px] flex flex-col h-screen overflow-auto gap-[25px] scroll-thin">
      <InvPageHeader redirect={routes.INVOICE_MATE.CREATE_CLIENT} />
      <ClientTable />
    </div>
  );
}

export default ClientManagement;
