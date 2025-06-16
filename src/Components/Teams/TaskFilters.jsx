import React, { useEffect, useState } from "react";
import CustomInput from "../SharedComponents/CustomInput";
import FilterInput from "../SharedComponents/FilterInput/FilterInput";
import FilterSelect from "../SharedComponents/FilterSelect/FilterSelect";
import { useNavigate } from "react-router";
import { routes, statusOptions } from "../../utils/config";
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
  console.log(filters,'fasldfkjhalsdfhalskdfalsd')
  return (
    <div className="w-full flex flex-col items-start gap-5 justify-between">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="font-bold text-[25px] !m-0 !p-0">
          {teamsData?.team_title}
        </h1>
        <div className="flex shrink-0 flex-row items-center gap-7 px-3 py-1 border-[1px] border-gray-500 rounded-[10px]">
          <div className="flex flex-col gap-1">
            <p className="text-gray-400 text-[16px]">Admin</p>
            <p>{teamsData?.created_by?.name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-400 text-[16px]">Manager</p>
            <p>{teamsData?.manager?.name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-400 text-[16px]">Team Lead</p>
            <p>{teamsData?.team_lead?.name}</p>
          </div>
        </div>
      </div>
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
            <FilterSelect
              label={"Assigned To"}
              name={"assigned_to"}
              options={options}
              handleChange={handleChange}
            />
            <FilterSelect
              label={"Status"}
              name={"status"}
              options={status}
              handleChange={() =>
                setFilters((prev) => ({
                  ...prev,
                  status: status?.value,
                }))
              }
            />
            <FilterInput label="Status" />
          </div>
        </div>
        <button
          onClick={() =>
            navigate(`${routes.CREATE_TASK_TEAMS}?teams_id=${teamsData?._id}`)
          }
          className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {"Create Task"}
        </button>
      </div>
    </div>
  );
}

export default TaskFilters;
