import { Image } from "antd";
import React from "react";

function ClientTable() {
    const data = [{}];
  return (
    <div className="relative overflow-y-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-[#78778B] uppercase bg-transparent">
          <tr>
            <th scope="col" className="px-6 py-3">
              Full Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3">
              Company Name
            </th>
            <th scope="col" className="px-6 py-3">
              Country
            </th>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Postal Code
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              Website
            </th>
            <th scope="col" className="px-6 py-3 text-nowrap">
              Notes
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((element, idx) => {
            // const items = generateItems(element, ["Edit", "Delete"]);
            return (
              <tr className=" border-b  dark:border-gray-700 border-gray-200 bg-gransparent dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  
                  Full Name
                </th>
                <td className="px-6 py-4">Email</td>
                <td className="px-6 py-4">
                  {/* <Tooltip
                    placement="topLeft"
                    title={
                      element?.description?.length > 30
                        ? `${element?.description}...`
                        : element?.description
                    }
                  >
                    {element?.description?.length > 30
                      ? `${element?.description}...`
                      : element?.description}
                  </Tooltip> */}
                        Phone Number
                </td>
                <td className="px-6 py-4">
                  {/* <Tooltip
                    placement="topLeft"
                    title={
                      element?.short_description?.length > 30
                        ? `${element?.short_description}...`
                        : element?.short_description
                    }
                  >
                    {element?.short_description?.length > 30
                      ? `${element?.short_description}...`
                      : element?.short_description}
                  </Tooltip> */}
                  Company Name
                </td>
                <td className="px-6 py-4">Address</td>
                <td className="px-6 py-4 uppercase">City</td>
                <td className="px-6 py-4 uppercase">
                  Country
                </td>
                <td className="px-6 py-4 uppercase">
                  Postal Code
                </td>
                <td className="px-6 py-4 uppercase">
                  Website
                </td>
                <td className="px-6 py-4 uppercase">
                  Notes
                </td>
                
                <td className="flex items-center px-6 py-4">
                  {/* <Dropdown
                    maxHeight={20}
                    trigger={"click"}
                    menu={{ items }}
                    placement="bottomLeft"
                  >
                    <button>
                      <ThreeDots />
                    </button>
                  </Dropdown> */}
                  Actions
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ClientTable;
