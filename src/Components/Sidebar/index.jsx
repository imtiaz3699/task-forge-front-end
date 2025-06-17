import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { routes } from "../../utils/config";
import Cookies from "js-cookie";
import { Invoice } from "../../utils/icons";
function Sidebar() {
  const navigate = useNavigate();
  const [collapseShow, setCollapseShow] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const location = useLocation();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setCollapseShow(true);
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const isUserActive =
    location.pathname === routes.CREATE_USERS ||
    location.pathname === routes.USERS ||
    location.pathname.startsWith(routes.UPDATE_USERS);
  const isTeamActive =
    location.pathname === routes.CREATE_TEAMS ||
    location.pathname === routes.TEAMS ||
    location.pathname.startsWith(routes.UPDATE_TEAMS);
  const isTaskActive =
    location.pathname === routes.TASK ||
    location.pathname === routes.CREATE_TASK ||
    location.pathname.startsWith(routes.UPDATE_TASK);
  const isInvoiceMateActive = location.pathname.startsWith(
    routes.INVOICE_MATE.DASHBOARD
  );
  return (
    <div className="">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className={` top-0 left-0 z-40 h-screen w-64 transition-transform`}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col justify-between px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to={routes?.TASK}>
                <div
                  className={`flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isTaskActive ? "bg-gray-100 dark:bg-gray-700" : ""
                  } group `}
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Tasks</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to={routes?.USERS}>
                <div
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isUserActive ? "bg-gray-100 dark:bg-gray-700" : ""
                  }  group`}
                >
                  <svg
                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to={routes?.TEAMS}>
                <div
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isTeamActive ? "bg-gray-100 dark:bg-gray-700" : ""
                  }  group`}
                >
                  <svg
                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Teams</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to={routes?.INVOICE_MATE?.INDEX}>
                <div
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isInvoiceMateActive ? "bg-gray-100 dark:bg-gray-700" : ""
                  }  group`}
                >
                  <Invoice />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Invoice Mate
                  </span>
                </div>
              </Link>
            </li>
          </ul>
          <div
            className="text-red-800 font-medium text-[20px] flex flex-row items-center gap-2 cursor-pointer"
            onClick={() => {
              Cookies.remove("user");
              Cookies.remove("token");
              navigate("/");
            }}
          >
            Logout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7e1616"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-log-out-icon lucide-log-out"
            >
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            </svg>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
