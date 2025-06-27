import React from "react";
import CustomInputTwo from "../../../../Components/SharedComponents/CustomInput/CustomInputTwo";
import CustomButton from "../../../../Components/SharedComponents/CustomButton/CustomButton";

function CreateCategory({ formik, handleCancel }) {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-2 pt-10 px-5"
    >
      <CustomInputTwo
        label="Category Name"
        value={formik.values.title}
        onChange={formik.handleChange}
        name="title"
        error={formik.touched.title && formik.errors.title}
      />
      <CustomInputTwo
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        name="description"
        error={formik.touched.description && formik.errors.description}
      />
      <div className="flex items-center gap-2 w-full justify-end pt-5">
        <CustomButton
          label="Cancel"
          onClick={() => {
            handleCancel();
            formik.resetForm();
          }}
          cancelButton={true}
        />{" "}
        <CustomButton label="Submit" type="submit" />
      </div>
    </form>
  );
}

export default CreateCategory;
