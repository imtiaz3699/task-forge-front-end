import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
function MultiProduct({ key, index, product, setFieldValue, values }) {
  const handleQuantityChange = (delta) => {
    const currentQty = values.products[index]?.quantity || 1;
    const newQty = Math.max(0, currentQty + delta);

    const updatedProducts = [...values.products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      quantity: newQty,
    };
    setFieldValue("products", updatedProducts);
  };

  return (
    <div className="flex flex-col gap-1" key = {key}>
      <label className="text-[14px] text-gray-400">{product?.title}</label>
      <div className="flex flex-row items-center gap-2">
        <CiSquareMinus
          onClick={() => handleQuantityChange(-1)}
          className="text-white text-[35px] hover:text-gray-400 cursor-pointer"
        />
        <input
          className="border-[1px] border-white rounded-[5px] w-[70px] text-white no-spinner pl-2 placeholder:text-[12px]"
          type="number"
          placeholder="Product quantity"
          value={product?.quantity || 1}
          onChange={(e) => {
            const newQty = parseInt(e.target.value) || 1;
            handleQuantityChange(newQty - (product?.quantity || 1));
          }}
        />
        <CiSquarePlus
          onClick={() => handleQuantityChange(1)}
          className="text-white text-[35px] hover:text-gray-400 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default MultiProduct;
