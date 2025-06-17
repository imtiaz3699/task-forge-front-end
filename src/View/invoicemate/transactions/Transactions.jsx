import React from "react";
import TransactionTables from "../../../Components/Tables/TransactionTables";

function Transactions() {
  return (
    <div className="px-[40px] flex flex-col h-screen overflow-auto gap-[25px] scroll-thin">
      <div className="  relative border-b-[#322e5a] border-b-[1px] w-full pb-5">
        <input
          className="w-[290px] h-[45px] text-[12px] p-2 border border-gray-700 rounded-[10px] text-gray-300"
          placeholder="Search Transactions"
        />
      </div>
      <TransactionTables/>
    </div>
  );
}

export default Transactions;
