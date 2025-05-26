import React from 'react'
import { Link } from 'react-router'
import CustomInput from "../SharedComponents/CustomInput/index"
import { useFormik } from 'formik'
function index() {
    const formik = useFormik({
        initialValues:{
            email: '',
            password: '',
        }
    })
    return (
        <div className="container mx-auto px-4 h-full ">
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-400 border-0">
                        <div className="flex-auto px-4 lg:px-10 py-10 ">
                            <div className="text-blueGray-400 text-center mb-3 font-bold">
                                <p className='text-[35px] font-medium'>Sign In</p>
                            </div>
                            <form className='flex flex-col gap-5 w-full'>
                                <CustomInput label="Email" placeholder={"Enter your email..."} />
                                <CustomInput label="Email" placeholder={"Enter your password..."} />
                                <div>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            id="customCheckLogin"
                                            type="checkbox"
                                            className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                        />
                                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                            Remember me
                                        </span>
                                    </label>
                                </div>

                                <div className="text-center mt-6">
                                    <button
                                        className="bg-gray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        Sign In
                                    </button>
                                </div>
                                <div className="flex flex-wrap  relative text-white">
                                    <div className="w-1/2 ">
                                        <a
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            className="text-blueGray-200"
                                        >
                                            <small>Forgot password?</small>
                                        </a>
                                    </div>
                                    <div className="w-1/2 text-right">
                                        <Link to="/auth/signup" className="text-blueGray-200">
                                            <small>Create new account</small>
                                        </Link>
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
