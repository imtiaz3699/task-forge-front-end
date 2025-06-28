import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { useNavigate } from "react-router";
import { BASE_URL_TWO, routes } from "../../../utils/config";
import InvoiceTable from "../../../Components/Tables/InvoiceTable";
import ProductTables from "../../../Components/Tables/ProductTables";
import axios from "axios";
import { useInvoiceMateUser } from "../../../context/invoiceContext";
function InvoiceProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { token } = useInvoiceMateUser();
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL_TWO}/product/get-all-products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "fasdlfkajds");
      if (res?.status === 200) {
        setProducts(res?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="px-[40px] flex flex-col h-screen overflow-auto gap-[25px] scroll-thin">
      <div className="  relative border-b-[#322e5a] border-b-[1px] w-full pb-5 flex items-center justify-between">
        <input
          className="w-[290px] h-[45px] text-[12px] p-2 border border-gray-700 rounded-[10px] text-gray-300"
          placeholder="Search Product"
        />
        <div className="flex items-center gap-[30px] ">
          <button
            onClick={() => navigate(routes.INVOICE_MATE.CREATE_PRODUCT)}
            className="bg-[#C8EE44] w-[165px] h-[48px] rounded-[5px] flex items-center justify-center gap-[5px] font-medium cursor-pointer"
          >
            <img src="/invoie.png" /> Create Product
          </button>
          <button className="w-[110px] h-[48px] rounded-[5px] border-[1px] border-gray-500 text-white flex items-center gap-2 justify-center cursor-pointer">
            <IoFilter /> Filter
          </button>
        </div>
      </div>
      <ProductTables data = {products} />
    </div>
  );
}

export default InvoiceProduct;
