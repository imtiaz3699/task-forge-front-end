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
import { Button, Spin } from "antd";
import { FaRegPlusSquare } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";
const CreateProduct = () => {
  const { id } = useParams();
  const { token } = useInvoiceMateUser();
  const [categories, setCategories] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [thumbnailImages, setThumbnailImages] = useState([]);
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
      quantity: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        title: values?.title,
        description: values?.description,
        short_description: values?.short_description,
        price: values?.price,
        currency: values?.currency,
        dimensions: {
          height: values?.dimensions?.height,
          width: values?.dimensions?.width,
          depth: values?.dimensions?.depth,
        },
        images: [""],
        thumbnail: [""],
        category: values?.category,
        tags: values?.tags,
        isActive: values?.isActive,
        isFeatured: values?.isFeatured,
        quantity: values?.quantity,
      };

      try {
        const formData = new FormData();
        productImages?.forEach((file) => {
          formData.append("product_images", file?.originFileObj);
        });
        thumbnailImages?.forEach((file) => {
          formData.append("thumbnail_images", file?.originFileObj);
        });
        const img = await axios.post(
          `${BASE_URL_TWO}/product/upload-images`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (img?.status === 201) {
          payload.thumbnail = img?.data?.thumbnail_images;
          payload.images = img?.data?.product_images;
        }
        const res = await axios.post(
          `${BASE_URL_TWO}/product/create`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res?.status === 201) {
          toast("Product has been created successfully.");
        }
        console.log(res, "faldsfjasdhkf3113231");
      } catch (e) {
        console.log(e);
      }
    },
  });
  const currency = [
    {
      label: "PKR",
      value: "pkr",
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
  const handleChangeImages = () => {
    formik.setFieldValue("thumbnail_images", thumbnailImages);
    formik.setFieldValue("product_images", productImages);
  };
  useEffect(() => {
    handleChangeImages();
  }, [thumbnailImages, productImages]);

  const fetchSingleProduct = async () => {
    if (!id) return;
    try {
      const res = await axios.get(
        `${BASE_URL_TWO}/product/get-single-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res?.data ?? {};
      console.log(res, "fasldfhalsdkhflasjk");
      formik.setValues({
        title: data?.title,
        price: data?.price,
        description: data?.description,
        short_description: data?.short_description,
        currency: data?.currency ?? "",
        dimensions: {
          width: data?.dimensions?.width,
          height: data?.dimensions?.height,
          depth: data?.dimensions?.depth,
        },
        category: data?.category,
        isActive: data?.isActive,
        isFeatured: data?.isFeatured,
        tags: data?.tags ?? [],
        quantity: data?.quantity ?? 0,
      });
      setProductImages(data?.images);
      setThumbnailImages(data?.thumbnail);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSingleProduct();
  }, [id]);
  return (
    <div className="px-[40px] w-full overflow-auto scroll-thin mb-10">
      <div className="flex flex-col ">
        <h1 className="font-medium text-[22px] text-white">Product </h1>
        <p className="text-[18px] text-gray-400">Enter Product Details.</p>
      </div>
      <Spin
        spinning={formik.isSubmitting}
        className="h-full flex items-center justify-center !bg-transparent"
      >
        <form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-[40px] mt-5"
        >
          <div className="flex flex-row items-start gap-[40px] w-full justify-between">
            <div className="w-full">
              <ImageUpload
                label="Product Pictures"
                accept="image/*"
                fileList={productImages}
                setFileList={setProductImages}
              />
            </div>
            <div className="w-full">
              <ImageUpload
                label="Product Thumbnail"
                accept="image/*"
                fileList={thumbnailImages}
                setFileList={setThumbnailImages}
              />
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
              <CustomInputTwo
                label="Qauntity"
                value={formik.values?.quantity}
                onChange={formik.handleChange}
                name="quantity"
                type="number"
              />
              <RadioButton
                id="productActive"
                label="Product Active"
                checked={formik.values.isActive}
                onChange={formik.handleChange}
                name="isActive"
              />
              <RadioButton
                id="productFeatured"
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
            <CustomButton label="Submit" type="submit" />
          </div>
        </form>
      </Spin>
      <ToastContainer />
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
      <div className="w-full flex flex-row flex-wrap gap-1">
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
