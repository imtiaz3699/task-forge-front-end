import React, { useEffect, useState } from "react";
import { routes, BASE_URL } from "../../../utils/config";
import axios from "axios";
import { useUser } from "../../../context/userContext";
import Pagination from "../../../Components/SharedComponents/Pagination";
import { Dropdown } from "antd";
import { ThreeDots } from "../../../utils/icons";
import { Link, useOutletContext, useParams } from "react-router";
import dayjs from "dayjs";
import TaskFilters from "../../../Components/Teams/TaskFilters";

function TaskList() {
  const { token } = useUser();
  const { id } = useParams();
  const teamsId = id;
  const [data, setData] = React.useState([]);
  const [messageApi] = useOutletContext();
  const [teamsData, setTeamsData] = useState({});
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    created_by: "",
    assigned_to: "",
    status: "",
    priority: "",
  });
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
    total: 0,
    displayPages: 5,
  });
  const handlePaginationClick = (value) => {
    if (value === "next") {
      if (pagination?.totalPages?.toString() === pagination?.page?.toString())
        return;
      setPagination((prev) => ({
        ...pagination,
        page: parseInt(pagination.page) + 1,
      }));
    } else if (value === "prev") {
      if (parseInt(pagination.page) === 1) return;
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
      const res = await axios.delete(`${BASE_URL}/task/delete-task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.status === 200) {
        messageApi.open({
          type: "success",
          content: "Task deleted successfully",
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
          <Link to={`${routes.UPDATE_TASK}/${obj._id}`}>{element}</Link>
        ) : (
          <div onClick={() => handleDelete(obj._id)}>{element}</div>
        ),
      };
    });
  };
  const handleAssignUser = async () => {};
  useEffect(() => {
    const getSingleTeam = async () => {
      if (!teamsId) return;
      try {
        const res = await axios.get(
          `${BASE_URL}/teams/get-single-teams/${teamsId}?page=${
            pagination?.page
          }&limit=${pagination?.limit}&title=${
            filters?.title ?? ""
          }&assigned_to=${filters?.assigned_to}&status=${
            filters?.status
          }&priority=${filters?.priority}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res?.status === 200) {
          setTeamsData(res?.data);
          const user = res?.data?.team_members?.map((element, idx) => {
            return {
              key: element?._id,
              label: (
                <div onClick={() => handleAssignUser(element?._id)}>
                  {" "}
                  {element?.name}
                </div>
              ),
            };
          });
          setUsers(user);
          setData(res?.data?.tasks);
          setPagination({
            page: res?.data?.page,
            limit: res?.data?.limit,
            totalPages: res?.data?.totalPages,
            totalRecords: res?.data?.totalRecords,
          });
        }
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    getSingleTeam();
  }, [
    teamsId,
    token,
    pagination.page,
    pagination.limit,
    filters.title,
    filters,
  ]);
  return (
    <div className="pb-20 w-full flex flex-col gap-5">
      <TaskFilters
        teamsData={teamsData}
        filters={filters}
        setFilters={setFilters}
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Created By
              </th>
              <th
                scope="col"
                className="px-6 py-3 flex flex-row items-center gap-2 "
              >
                Assigned To
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Priority
              </th>
              <th scope="col" className="px-6 py-3">
                Due Date
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
                    {element?.title}
                  </th>
                  <td className="px-6 py-4">{element?.description}</td>
                  <td className="px-6 py-4">{element?.created_by?.name}</td>
                  <td className="px-6 py-4">
                    {element?.assigned_to?.name || "Unassigned"}
                  </td>
                  <td className="px-6 py-4">{element?.status}</td>
                  <td className="px-6 py-4">{element?.priority}</td>
                  <td className="px-6 py-4">
                    {dayjs(element?.due_date).format("YYYY-MM-DD")}
                  </td>
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
  );
}

export default TaskList;
