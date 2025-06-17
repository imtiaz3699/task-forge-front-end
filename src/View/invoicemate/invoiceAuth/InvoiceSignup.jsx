import React from "react";
import { useInvoiceMateUser } from "../../../context/invoiceContext";
import CustomInput from "../../../Components/SharedComponents/CustomInput";
import CustomInputTwo from "../../../Components/SharedComponents/CustomInput/CustomInputTwo";
import { BackArrow } from "../../../utils/icons";
import { useNavigate } from "react-router";
import { routes } from "../../../utils/config";

function InvoiceSignup() {
  const navigate = useNavigate();
  const { user } = useInvoiceMateUser();
  return (
    <div className=" w-full h-screen bg-[#1C1A2E] flex items-center justify-center ">
      <div className="w-full max-w-[500px] h-full px-5 py-5 flex flex-col gap-5 justify-between">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-[12px]">
            <img src="/magloIcon.png" className="w-[50px] h-[50px]" />
            <p className="text-[30px] text-white font-bold">Maglo</p>
          </div>
          <p
            onClick={() => navigate(routes.TASK)}
            className="text-white border-gray-400 border-[1px] p-2 px-5 rounded-[5px] flex items-center gap-2 cursor-pointer  "
          >
            <BackArrow /> Task Forge
          </p>
        </div>
        <div className="flex flex-col gap-[25px]">
          <div className="flex flex-col gap-3">
            <h1 className="text-[35px] font-bold text-white">
              Welcome to Maglo
            </h1>
            <p className="text-white text-[18px]">
              Please enter your credentials
            </p>
          </div>
          <CustomInputTwo label="Full Name" />
          <CustomInputTwo label="Email" />
          <CustomInputTwo label="Password" type="password" />
          <button className="bg-[#C8EE44] hover:bg-[#c9ee44cb] text-[#1B212D] text-[16px] font-medium rounded-[10px] py-[14px] cursor-pointer  ">
            Create Account
          </button>
          <p className="text-center text-gray-400">
            Already have an account ?
            <span
              className="text-white underline cursor-pointer"
              onClick={() => navigate(routes.INVOICE_MATE.INDEX)}
            >
              {" "}
              Sign In
            </span>
          </p>
        </div>
        <p className="text-gray-400">
          All copyrights are reserved to Imtiaz Ahmed.
        </p>
      </div>
    </div>
  );
}

export default InvoiceSignup;
