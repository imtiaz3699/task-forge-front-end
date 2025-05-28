import React from 'react'
import CustomInput from './../../Components/SharedComponents/CustomInput'
import { Link } from 'react-router'
import CustomSelect from '../../Components/SharedComponents/CustomSelect'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios'
import { BASE_URL } from '../../utils/config'
function index() {
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required.'),
        email: Yup.string().email('Invalid email address.').required('Email is required.'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required.'),
        role: Yup.string().required('Role is required.'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await axios.post(BASE_URL + '/auth/register', values);
                alert('User registered successfully!');
                resetForm();
            } catch (error) {
                alert('Registration failed. Please try again.');
            } finally {
                setSubmitting(false);
            }
        },
    });
    return (
        <div className="container mx-auto px-4 h-full ">
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-400 border-0">
                        <div className="flex-auto px-4 lg:px-10 py-10 ">
                            <div className="text-blueGray-400 text-center mb-3 font-bold">
                                <p className='text-[35px] font-medium'>Sign up</p>
                            </div>
                            <form className='flex flex-col gap-5 w-full' onSubmit={formik.handleSubmit}>
                                <CustomInput
                                    label="Name"
                                    placeholder={"Enter your name..."}
                                    onChange={formik.handleChange}
                                    name="name"
                                    value={formik.values.name}
                                    error={formik.errors.name}
                                />
                                <CustomInput
                                    label="Email"
                                    placeholder={"Enter your email..."}
                                    onChange={formik.handleChange}
                                    name="email"
                                    value={formik.values.email}
                                    error={formik.errors.email}
                                />
                                <CustomInput
                                    label="Password"
                                    placeholder={"Enter your password..."}
                                    onChange={formik.handleChange}
                                    name="password"
                                    value={formik.values.password}
                                    error={formik.errors.password}
                                />
                                <CustomSelect
                                    label="Role"
                                    options={[{ label: "Admin", value: "admin" }, { label: "Member", value: "member" }]}
                                    onChange={formik.handleChange}
                                    name="role"
                                    value={formik.values.role}
                                    error={formik.errors.role}
                                />
                                <div className="text-center mt-6">
                                    <button
                                        className="bg-gray-800 cursor-pointer text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Signup
                                    </button>
                                </div>
                                <div className="flex flex-wrap  relative text-slate-800 font-medium">
                                    <div className="w-1/2 ">
                                        <a
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            className="text-blueGray-200"
                                        >
                                            <small className='underline'>Already have an account?</small>
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index
