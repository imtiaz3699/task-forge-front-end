import { useEffect } from "react";
import { useUser } from "../../../context/userContext";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL, routes } from "../../../utils/config";
import CustomInput from "../../../Components/SharedComponents/CustomInput";
import CustomSelect from "../../../Components/SharedComponents/CustomSelect";
import * as Yup from "yup";
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
function CreateUser() {
  const { id } = useParams();
  const { setUser, setToken, user, token } = useUser();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
      name: "",
      created_by: user?._id,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (id) {
          const response = await axios.post(
            BASE_URL + `/auth/update-user/${id}`,
            values,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response?.status === 200) {
            navigate(routes.USERS, { replace: true });
          }
        } else {
          const response = await axios.post(
            BASE_URL + "/auth/create-user",
            values,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Uncomment if you need to send a token
              },
            }
          );
          if (response?.status === 201) {
            navigate(routes.USERS, { replace: true });
          }
          alert("User Created Successfull!");
          resetForm();
        }
      } catch (e) {
        console.log(e);
      } finally {
        setSubmitting(false);
      }
    },
  });
  const fetchSingleUser = async () => {
    if (!id) {
      return;
    } else {
      try {
        const user = await axios.get(`${BASE_URL}/auth/get-single-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (user?.status === 200) {
          formik.setValues({
            email: user?.data?.email,
            password: user?.data?.password ?? "",
            role: user?.data?.role,
            name: user?.data?.name,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    fetchSingleUser();
  }, [id]);
  return (
    <div className=" ">
      <div className="flex  items-center justify-center h-full">
        <div className="flex-auto   w-full">
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={formik.handleSubmit}
          >
            <div className="w-full flex flex-row gap-5 justify-between">
              <CustomInput
                label="Name"
                placeholder={"Enter your name..."}
                name="name"
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.errors.name}
              />
              <CustomInput
                label="Email"
                placeholder={"Enter your email..."}
                name="email"
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
              />
            </div>
            <div className="w-full flex flex-row gap-5 justify-between ">
              <CustomSelect
                color={true}
                label="Role"
                options={[
                  { label: "Employee", value: "member" },
                  { label: "Manager", value: "manager" },
                  { label: "Team Lead", value: "team_lead" },
                ]}
                onChange={formik.handleChange}
                name="role"
                value={formik.values.role}
                error={formik.errors.role}
              />
              <CustomInput
                label="Password"
                placeholder={"Enter your password..."}
                name="password"
                disabled={formik.isSubmitting}
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password}
              />
            </div>

            <div className="flex items-center justify-end w-full mt-6">
              <button
                className="bg-gray-800 cursor-pointer text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                {id ? "Update User" : "Create User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
4;

export default CreateUser;
