import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { routes } from "../../../utils/config";
import { useLocation } from "react-router";
function PageHeading({ url }) {
  const [data, setData] = React.useState({
    heading: "Tasks",
    button: "Create Task",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname;
  const currentModule = Object.keys(routes).find(
    (key) =>
      pathname.startsWith(routes[key]) &&
      !pathname.includes("/create") &&
      !pathname.includes("/update")
  );
  const getHeading = (url) => {
    switch (url) {
      case routes.CREATE_TASK:
        setData({
          heading: "Task",
          button: "Create Task",
          navigate: routes.TASK,
        });
        break;
      case routes.UPDATE_TASK:
        setData({
          heading: "Task",
          button: "Update Task",
          navigate: routes.TASK,
        });
        break;
      case routes.USERS:
        setData({
          heading: "Users",
          button: "Create User",
          navigate: routes.CREATE_USERS,
        });
        break;
      case routes.TEAMS:
        setData({
          heading: "Teams",
          button: "Create Teams",
          navigate: routes.CREATE_TEAMS,
        });
        break;
      case routes.CREATE_USERS:
        setData({
          heading: "Create User",
        });
        break;
      case routes.UPDATE_USERS:
        setData({
          heading: "Update User",
        });
        break;
      default:
        setData({
          heading: "Tasks",
          button: "Create Task",
          navigate: routes.CREATE_TASK,
        });
        break;
    }
  };
  useEffect(() => {
    getHeading(location.pathname);
  }, [location.pathname, routes]);

  return (
    <div className="w-full flex flex-row items-center justify-between px-5">
      {/* <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {data?.heading}
      </h1>
      {currentModule && (
        <button
          onClick={() => navigate(data?.navigate)}
          className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {data?.button}
        </button>
      )} */}
    </div>
  );
}

export default PageHeading;
