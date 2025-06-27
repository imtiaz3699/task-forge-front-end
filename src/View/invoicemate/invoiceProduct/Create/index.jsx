import React, { useEffect, useState } from "react";
import CustomInputTwo from "../../../../Components/SharedComponents/CustomInput/CustomInputTwo";
import CustomTextArea from "../../../../Components/SharedComponents/CustomTextArea/CustomTextArea";
import CustomSelectTwo from "../../../../Components/SharedComponents/CustomSelect/CustomSelectTwo";
import { RadioButton } from "../../../../Components/SharedComponents/RadioButton/RadioButton";
import { IoMdClose } from "react-icons/io";
import ImageUpload from "../../../../Components/SharedComponents/ImageUpload/ImageUpload";
import CustomButton from "../../../../Components/SharedComponents/CustomButton/CustomButton";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL_TWO } from "../../../../utils/config";
import { useInvoiceMateUser } from "../../../../context/invoiceContext";
import { Button } from "antd";
import { CiSquarePlus } from "react-icons/ci";
import { FaRegPlusSquare } from "react-icons/fa";

const CreateProduct = () => {
  const { token } = useInvoiceMateUser();
  const [categories, setCategories] = useState([]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      short_description: "",
      price: "",
      currency: "",
      dimensions: {
        height: "",
        width: "",
        depth: "",
      },
      images: [""],
      thumbnail: [""],
      category: "",
      tags: [],
      isActive: false,
      isFeatured: false,
    },
  });
  const currency = [
    {
      label: "PKR",
      label: "pkr",
    },
  ];
  const handleCurrencyChange = (e) => {
    formik.setFieldValue("currency", e.target.value);
  };
  const handleChangeCategory = (e) => {
    formik.setFieldValue("category", e.target.value);
  };
  const fetchCategories = async () => {
    const res = await axios.get(`${BASE_URL_TWO}/category/get-all-categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.status === 200) {
      const cat = res?.data?.map((element, idx) => {
        return {
          label: element?.title,
          value: element?._id,
        };
      });
      setCategories(cat);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  console.log(formik.values, "afhlkjahsdfkjasdj");
  return (
    <div className="px-[40px] w-full overflow-auto scroll-thin mb-10">
      <div className="flex flex-col ">
        <h1 className="font-medium text-[22px] text-white">Product </h1>
        <p className="text-[18px] text-gray-400">Enter Product Details.</p>
      </div>
      <form className="flex flex-col gap-[40px] mt-5">
        <div className="flex flex-row items-start gap-[40px] w-full justify-between">
          <div className="w-full">
            <ImageUpload label="Product Pictures" />
          </div>
          <div className="w-full">
            <ImageUpload label="Product Thumbnail" />
          </div>
        </div>
        <div className="flex flex-row items-start gap-[40px] justify-between w-full">
          <CustomInputTwo
            label="Product Name"
            value={formik.values.title}
            onChange={formik.handleChange}
            name="title"
          />
          <CustomInputTwo
            label="Product Price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            name="price"
          />
        </div>
        <div className="flex flex-row items-start gap-[40px] justify-between w-full">
          <CustomTextArea
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
          />
          <CustomTextArea
            label="Short Description"
            value={formik.values.short_description}
            onChange={formik.handleChange}
            name="short_description"
          />
        </div>
        <div className="flex flex-row items-start gap-[40px] justify-between w-full">
          <CustomSelectTwo
            preSelect={"Select Currency"}
            label="Currency"
            name="currency"
            onChange={handleCurrencyChange}
            options={currency}
            value={formik.values.currency}
          />
          <DemintionInput
            value={formik.values.dimensions}
            onChange={formik.handleChange}
          />
        </div>

        <div className="flex flex-row items-center   gap-[40px] justify-between w-full">
          <CustomSelectTwo
            label="Category"
            options={categories}
            value={formik.values.category}
            name="category"
            onChange={handleChangeCategory}
            preSelect={"Select Currency"}
          />
          <div className="flex flex-row items-center gap-10 w-full">
            <RadioButton
              label="Product Active"
              checked={formik.values.isActive}
              onChange={formik.handleChange}
              name="isActive"
            />
            <RadioButton
              label="Product Featured"
              checked={formik.values.isFeatured}
              onChange={formik.handleChange}
              name={"isFeatured"}
            />
          </div>
        </div>
        <Tags formik={formik} />
        <div className="flex items-center justify-end max-w-full gap-5">
          <CustomButton label="Cancel" cancelButton={true} />
          <CustomButton label="Submit" />
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;

export const DemintionInput = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-gray-100 font-medium text-[15px]">
        Dimensions
      </label>
      <div className="border-[#282541] border-[1px] rounded-[10px] h-[45px] text-gray-400 flex items-center justify-between px-3  ">
        <input
          className="w-1/3 !outline-none no-spinner"
          placeholder="Width "
          type="number"
          value={value.width}
          onChange={onChange}
          name="dimensions.width"
        />
        <input
          className="w-1/3 !outline-none no-spinner"
          placeholder="Height"
          type="number"
          value={value.height}
          onChange={onChange}
          name="dimensions.height"
        />
        <input
          className="w-1/3 !outline-none no-spinner"
          placeholder="Depth "
          type="number"
          value={value.depth}
          onChange={onChange}
          name="dimensions.depth"
        />
      </div>
    </div>
  );
};

export const Tags = ({ formik }) => {
  const [tags, setTags] = useState("");
  const handleAddTag = (event) => {
    if (tags?.trim() === "") {
      return;
    }
    if (formik.values?.tags?.includes(tags)) {
      return;
    }
    if (event.code === "Enter") {
      setTags("");
      formik.setFieldValue("tags", [...formik.values.tags, tags?.trim()]);
    } else if (typeof event === "string") {
      setTags("");
      formik.setFieldValue("tags", [...formik.values.tags, tags?.trim()]);
    }
  };
  const handleRemoveTag = (tag) => {
    const res = formik.values?.tags?.filter((element) => element !== tag);
    formik.setFieldValue("tags", res);
  };
  return (
    <div className="flex items-center gap-[40px] justify-between w-full">
      <div className="w-full flex flex-row items-end gap-2">
        <CustomInputTwo
          label="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          onKeyDown={handleAddTag}
        />
        <Button
          onClick={() => handleAddTag(tags)}
          className="!bg-amber-300 !border-amber-300  hover:!bg-amber-400 hover:!border-amber-400 !h-[45px]"
        >
          <FaRegPlusSquare className="!text-black " />
        </Button>
      </div>
      <div className="w-full">
        {formik.values?.tags?.map((element, idx) => {
          return (
            <span class="bg-gray-100 inline-flex flex-row items-center gap-3 text-gray-800 text-xs font-medium me-2 px-4 py-2 rounded-sm dark:bg-gray-700 dark:text-gray-300 ">
              {element}
              <IoMdClose
                onClick={() => handleRemoveTag(element)}
                className="cursor-pointer"
              />
            </span>
          );
        })}
      </div>
    </div>
  );
};
