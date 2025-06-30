import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import { BASE_URL_TWO, routes } from "../../../utils/config";
import ProductTables from "../../../Components/Tables/ProductTables";
import axios from "axios";
import { useInvoiceMateUser } from "../../../context/invoiceContext";
import InvPageHeader from "../../../Components/InvoiceMate/InvPageHeader/InvPageHeader";
function InvoiceProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { token } = useInvoiceMateUser();
  const [filters, setFilters] = useState({
    product_name: "",
    minPrice: "",
    maxPrice: "",
  });
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL_TWO}/product/get-all-products?product_name=${filters?.product_name}&minPrice=${filters?.minPrice}&maxPrice=${filters?.maxPrice}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.status === 200) {
        setProducts(res?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [filters]);
  const handleFilterChange = async (e) => {
    setFilters((prev) => ({
      ...prev,
      product_name: e.target.value,
    }));
  };
  const handleChangeRange = async (e) => {
    if (e.target.name === "minPrice") {
      setFilters((prev) => ({
        ...prev,
        minPrice: e.target.value,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        maxPrice: e.target.value,
      }));
    }
  };
  console.log(filters,'fasdlfsdk')
  return (
    <div className="px-[40px] flex flex-col h-screen overflow-auto gap-[25px] scroll-thin">
      <InvPageHeader
        handleFilterChange={handleFilterChange}
        redirect={routes.INVOICE_MATE.CREATE_PRODUCT}
        valueKey={filters?.product_name}
        handleChangeRange={handleChangeRange}
        filters={filters}
        product = {true}
        btnText={"Create Product"}
        placeholder = "Search product name..."
      />
      <ProductTables data={products} fetchProducts={fetchProducts} />
    </div>
  );
}

export default InvoiceProduct;
