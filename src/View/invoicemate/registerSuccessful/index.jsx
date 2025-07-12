import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { BASE_URL_TWO, routes } from "../../../utils/config";
import axios from "axios";

function RegistrationSuccessful({ heading, description, success, verified }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [searchPrams] = useSearchParams();
  const token = searchPrams.get("token");

  const verifyUser = async () => {
    try {
      if (!token) {
        return;
      }
      const res = await axios.get(`${BASE_URL_TWO}/users/verified/${token}`);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log("Axios error:", e.response?.data?.message);
        setError(e.response?.data?.message);
      } else {
        console.log("Unexpected error:", e);
      }
    }
  };
  useEffect(() => {
    verifyUser();
  }, [token]);
  if (verified && !token) {
    return (
      <div className="h-screen text-white flex items-center justify-center text-[30px]">
        Please contact support at imtiazali78652@gmail.com
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl p-4 bg-white shadow-2xl dark:bg-gray-900 sm:p-10 sm:rounded-3xl">
        <div className="text-center">
          <div className="flex items-center justify-center ">
            {error ? (
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full dark:bg-red-500">
                {" "}
                <svg
                  className="h-12 w-12 text-red-500 dark:text-green-100"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-ban-icon lucide-ban"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.9 4.9 14.2 14.2" />
                </svg>
              </div>
            ) : (
              <div className=" flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full dark:bg-green-500">
                <svg
                  className="h-12 w-12 text-green-600 dark:text-green-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  ></path>
                </svg>
              </div>
            )}
          </div>
          <h1>
            {error ? (
              <p className="text-4xl font-extrabold text-red-700 dark:text-red-500">
                User not verified
              </p>
            ) : (
              <p className="text-4xl font-extrabold text-green-700 dark:text-green-400">
                {heading}
              </p>
            )}
          </h1>
          <p className="mt-4 text-lg text-gray-800 dark:text-gray-300">
            {error
              ? "Error verifying user please contact support"
              : description}
          </p>
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-400">
            If you have any questions or need further assistance, feel free to
            contact us at:
            <a
              href="mailto:admin@eliteai.tools"
              className="font-medium text-indigo-600 dark:text-indigo-400 underline"
            >
              imtiazali78652@gmail.com
            </a>
          </p>
        </div>
        {success && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate(routes.INVOICE_MATE.SIGNUP)}
              href="http://127.0.0.1:8000"
              className="inline-block px-6 py-2 cursor-pointer text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 hover:from-indigo-700 hover:to-blue-700 dark:from-indigo-500 dark:to-blue-500 dark:hover:from-indigo-600 dark:hover:to-blue-600"
            >
              Back to Home
            </button>
          </div>
        )}
        {verified && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate(routes.INVOICE_MATE.INDEX)}
              href="http://127.0.0.1:8000"
              className="inline-block px-6 py-2 cursor-pointer text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 hover:from-indigo-700 hover:to-blue-700 dark:from-indigo-500 dark:to-blue-500 dark:hover:from-indigo-600 dark:hover:to-blue-600"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegistrationSuccessful;
