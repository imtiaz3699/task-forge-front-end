import React from "react";
import MultiSelect from "../../../../../Components/SharedComponents/MultiSelect/MultiSelect";
import CustomDatePickerTwo from "../../../../../Components/SharedComponents/DatePicker/CustomDatePickerTwo";
import CustomSelectTwo from "../../../../../Components/SharedComponents/CustomSelect/CustomSelectTwo";
import CustomInputTwo from "../../../../../Components/SharedComponents/CustomInput/CustomInputTwo";
import MultiProduct from "../MultiProduct/MultiProduct";
import { RadioButton } from "../../../../../Components/SharedComponents/RadioButton/RadioButton";
import CustomButton from "../../../../../Components/SharedComponents/CustomButton/CustomButton";

function CreateInvoiceForm({
  formik,
  searchedClient,
  handleSearchClient,
  clients,
  handleChangeClient,
  handleDateChange,
  handleDueDate,
  status,
  handleChange,
  paymentMethods,
  handleSearchProduct,
  products,
  handleSelectProduct,
  currency,
}) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-[40px] mt-5">
        <div className="flex flex-row items-center gap-[40px] justify-between w-full">
          <MultiSelect
            value={searchedClient}
            showSearh={true}
            onSearch={handleSearchClient}
            label="Client"
            options={clients ?? []}
            onChange={handleChangeClient}
            error={formik.touched.client_id && formik.errors.client_id}
          />
        </div>
        <div className="flex flex-row items-center gap-[40px] justify-between w-full">
          <CustomDatePickerTwo
            label="Date Issue"
            value={formik.values.date_of_issue}
            onChange={handleDateChange}
            error={formik.touched.date_of_issue && formik.errors.date_of_issue}
            // disabled={!eidt}
          />
          <CustomDatePickerTwo
            label="Due Date"
            value={formik.values.due_date}
            onChange={handleDueDate}
            error={formik.touched.due_date && formik.errors.due_date}
          />
        </div>
        <div className="flex flex-row items-center gap-[40px] justify-between max-w-full  ">
          <CustomSelectTwo
            label="Status"
            options={status}
            preSelect={"Select Status"}
            name="status"
            value={formik.values.status}
            onChange={handleChange}
            error={formik.touched.status && formik.errors.status}
          />
          <CustomSelectTwo
            label="Payment Method"
            options={paymentMethods}
            onChange={handleChange}
            preSelect={"Select Payment Method"}
            name="payment_method"
            value={formik.values.payment_method}
             error={formik.touched.payment_method && formik.errors.payment_method}
          />
        </div>
        <div className="flex flex-row items-center gap-[40px] justify-between max-w-full  ">
          <CustomInputTwo
            label="Notes"
            name="notes"
            value={formik.values.notes}
            onChange={formik.handleChange}
             error={formik.touched.notes && formik.errors.notes}
          />
          <CustomInputTwo
            label="Terms"
            name="terms"
            value={formik.values.terms}
            onChange={formik.handleChange}
             error={formik.touched.terms && formik.errors.terms}
          />
        </div>
        <div className="flex flex-row items-start gap-[40px] justify-between max-w-full  ">
          <CustomSelectTwo
            label="Currency"
            value={formik.values.currency}
            options={currency}
            preSelect={"Select Currency"}
            onChange={handleChange}
            error={formik.touched.currency && formik.errors.currency}
          />
          <div className="flex flex-col items-start gap-3 w-full">
            <MultiSelect
              onSearch={handleSearchProduct}
              label="Products"
              options={products ?? []}
              onChange={handleSelectProduct}
              error={formik.touched.product_id && formik.errors.product_id}
            />
            <div className="flex flex-row gap-2 flex-wrap">
              {formik?.values?.products?.length > 0 &&
                formik?.values?.products?.map((element, idx) => {
                  return (
                    <MultiProduct
                      key={element?._id}
                      index={idx}
                      product={element}
                      setFieldValue={formik.setFieldValue}
                      values={formik.values}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div className="w-full">
          <RadioButton
            label="Tax Included"
            checked={formik.values.tax_included}
            name="tax_included"
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex items-center justify-end max-w-full gap-5">
          <CustomButton label="Cancel" cancelButton={true} />
          <CustomButton label="Submit" type="submit" />
        </div>
      </div>
    </form>
  );
}

export default CreateInvoiceForm;
