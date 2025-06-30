import axios from "axios";
import { BASE_URL_TWO } from "../../utils/config";
import { useInvoiceMateUser } from "../../context/invoiceContext";

export const ApiFun = () => {
  const { token } = useInvoiceMateUser();
  const funcs = {
    product: async () => {
      const res = await axios.get(`${BASE_URL_TWO}/product/get-all-products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res?.data;
    },
    client: async () => {
      const res = await axios.get(`${BASE_URL_TWO}/client/get-all-clients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res?.data
    },
  };
  return funcs;
};
