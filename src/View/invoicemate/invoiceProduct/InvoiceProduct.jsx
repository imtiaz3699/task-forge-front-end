import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import { BASE_URL_TWO, routes } from "../../../utils/config";
import ProductTables from "../../../Components/Tables/ProductTables";
import axios from "axios";
import { useInvoiceMateUser } from "../../../context/invoiceContext";
import InvPageHeader from "../../../Components/InvoiceMate/InvPageHeader/InvPageHeader";
import { Pagination } from "antd";
import socket from "../../../socket/socket";
function InvoiceProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { token } = useInvoiceMateUser();
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 1,
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
  });
  const [filters, setFilters] = useState({
    product_name: "",
    minPrice: "",
    maxPrice: "",
  });
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL_TWO}/product/get-all-products?product_name=${filters?.product_name}&minPrice=${filters?.minPrice}&maxPrice=${filters?.maxPrice}&offset=${pagination?.currentPage}&limit=${pagination?.limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.status === 200) {
        setProducts(res?.data?.data);
        setPagination({
          totalPages: res?.data?.totalPages,
          totalResults: res?.data?.totalRecords,
          currentPage: res?.data?.currentPage,
          limit: res?.data?.limit ?? 10,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [filters, pagination?.currentPage]);
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
  const handleChangePage = (value) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: value,
    }));
  };
  useEffect(() => {
    socket.on("productCreated", (product) => {
      setProducts((prev) => [product, ...prev]);
    });
    socket.on("productDeleted", (productId) => {
      setProducts((prev) => prev.filter((p) => p?._id !== productId));
    });
    socket.on("productUpdated", (product) => {
      console.log(product,'fadslfkahsdfk')
      setProducts((prev) => [product, ...prev]);
    });
    return () => {
      socket.off("productCreated");
      socket.off("productDeleted");
      socket.off("productUpdated");
    };
  }, []);
  return (
    <div className="px-[40px] flex flex-col h-screen overflow-auto gap-[25px] scroll-thin">
      <InvPageHeader
        handleFilterChange={handleFilterChange}
        redirect={routes.INVOICE_MATE.CREATE_PRODUCT}
        valueKey={filters?.product_name}
        handleChangeRange={handleChangeRange}
        filters={filters}
        product={true}
        btnText={"Create Product"}
        placeholder="Search product name..."
      />
      <ProductTables data={products} fetchProducts={fetchProducts} />
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

export default InvoiceProduct;
