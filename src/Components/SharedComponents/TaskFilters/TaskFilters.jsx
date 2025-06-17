import React, { useEffect, useState } from "react";
import FilterInput from "../../SharedComponents/FilterInput/FilterInput";
import FilterSelect from "../../SharedComponents/FilterSelect/FilterSelect";
import { useNavigate } from "react-router";
import { routes, statusOptions, priorityOptions } from "../../../utils/config";
function TaskFilters({ teamsData, filters, setFilters }) {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [status, setStatus] = useState([]);
  const handleChange = (e) => {
    if (e?.target) {
      setFilters((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        assigned_to: e,
      }));
    }
  };
  useEffect(() => {
    const res = [
      { value: "", label: "Select" },
      ...(Array.isArray(teamsData?.team_members)
        ? teamsData.team_members.map((element) => ({
            value: element?._id,
            label: element?.name,
          }))
        : []),
    ];
    const statusRes = [
      { value: "", label: "Select status" },
      ...(Array.isArray(statusOptions)
        ? statusOptions.map((element) => ({
            value: element?.value,
            label: element?.label,
          }))
        : []),
    ];
    setStatus(statusRes);
    setOptions(res);
  }, [teamsData]);
  const handleChangeStatus = (e) => {
    setFilters((prev) => ({
      ...prev,
      status: e,
    }));
  };
  const handleChangePriority = (e) => {
    setFilters((prev) => ({
      ...prev,
      priority: e,
    }));
  };
  return (
    <div className="w-full flex flex-col items-start gap-5 justify-between">
      <div className="flex flex-row items-center justify-between w-full gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-[20px] text-gray-400 ">Filters</p>
          <div className="w-full flex flex-row gap-10">
            <FilterInput
              value={filters?.title}
              onChange={handleChange}
              label="Title"
              name="title"
            />
            <FilterInput
              value={filters?.user_name}
              onChange={handleChange}
              label="User Name"
              name="user_name"
            />
            <FilterSelect
              label={"Status"}
              name={"status"}
              options={status}
              handleChange={handleChangeStatus}
            />
            <FilterSelect
              label={"Priority"}
              name={"priority"}
              options={priorityOptions}
              handleChange={handleChangePriority}
            />
          </div>
        </div>
        <button
          onClick={() => navigate(`${routes.CREATE_TASK}`)}
          className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {"Create Task"}
        </button>
      </div>
    </div>
  );
}

export default TaskFilters;
