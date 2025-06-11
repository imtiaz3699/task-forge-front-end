import React from 'react'
import Pagination from '../../Components/SharedComponents/Pagination';
import { Dropdown } from 'antd';
import { ThreeDots } from '../../utils/icons';
import { Link, useOutletContext } from 'react-router';
import { BASE_URL, routes } from '../../utils/config';
import { useUser } from '../../context/userContext';
import axios from 'axios';

function Teams() {
    const [messageApi] = useOutletContext();
  const { token,user } = useUser();
  const [data, setData] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
    total: 0,
    displayPages: 5,
  });
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/teams/get-teams?page=${pagination.page}&limit=${pagination.limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response,'totalRecords213131')
      if (response?.status === 200) {
        setData(response?.data?.data);
        setPagination((prev) => ({
          ...prev,
          totalPages: response?.data?.totalPages,
          totalRecords: response?.data?.totalRecords,
          total: response?.data?.total,
        }));
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, [pagination.page, pagination.limit]);
  const handlePaginationClick = (value) => {
    if (value === "next") {
      if (pagination.totalPages === pagination.page) return;
      setPagination((prev) => ({
        ...pagination,
        page: pagination.page + 1,
      }));
    } else if (value === "prev") {
      if (pagination.page === 1) return;
      setPagination((prev) => ({
        ...prev,
        page: pagination.page - 1,
      }));
    } else {
      if (pagination.page === value) return;
      setPagination((prev) => ({
        ...prev,
        page: value,
      }));
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/teams/delete-teams/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.status === 200) {
        messageApi.open({
          type: "success",
          content: "User deleted successfully!",
        });
      }
      fetchData();
    } catch (error) {
      messageApi.error("Error deleting task");
    }
  };
  const generateItems = (obj) => {
    const arr = ["Edit", "Delete"];
    return arr.map((element, idx) => {
      const key = (idx + 1).toString();
      const isEdit = element === "Edit";
      return {
        key,
        label: isEdit ? (
          <Link to={`${routes.UPDATE_TEAMS}/${obj._id}`}>{element}</Link>
        ) : (
          <div onClick={() => handleDelete(obj._id)}>{element}</div>
        ),
      };
    });
  };
  return (
    <div className="pb-20 w-full flex flex-col gap-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Team Title
              </th>
              <th scope="col" className="px-6 py-3">
                Team Members
              </th>
              <th scope="col" className="px-6 py-3">
                Created By
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((element, idx) => {
              const items = generateItems(element);
              return (
                <tr
                  key={element?._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {element?.team_title}
                  </th>
                  <td className="px-6 py-4">{"Team members"}</td>
                  <td className="px-6 py-4">{element?.created_by?.name}</td>
                  <td className="px-6 py-4">
                    <Dropdown
                      trigger={"click"}
                      menu={{ items }}
                      placement="bottomLeft"
                    >
                      <div>
                        <ThreeDots />
                      </div>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        pagination={pagination}
        handlePaginationClick={handlePaginationClick}
      />
    </div>
  )
}

export default Teams