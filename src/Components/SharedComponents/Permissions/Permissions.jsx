import React from "react";
import { useUser } from "../../../context/userContext";
import NotAuthorized from "../NotAuthorized/NotAuthorized";
import { useLocation } from "react-router";
import { routes } from "../../../utils/config";

function Permissions({ children }) {
  const { user } = useUser();
  const location = useLocation();
  const pathname = location.pathname;
  const verifyPermissions = () => {
    let isAllowed;
    if (user?.role === "admin") {
      isAllowed = true;
    }
    if (user?.role === "manager" && !pathname.startsWith(routes.CREATE_TEAMS)) {
      isAllowed = true;
    }
    if (
      user?.role === "team_lead" &&
      !pathname.startsWith(routes?.CREATE_TEAMS)
    ) {
      isAllowed = true;
    }
    if (
      user?.role === "member" &&
      (pathname.startsWith(routes.UPDATE_TASK) ||
        pathname.startsWith(routes.TASK))
    ) {
      isAllowed = true;
    }
    if (
      user?.role !== "admin" &&
      (pathname.startsWith(routes.USERS) ||
        pathname.startsWith(routes.UPDATE_USERS) ||
        pathname.startsWith(routes.CREATE_USERS))
    ) {
      isAllowed = false;
    }
    return isAllowed;
  };
  console.log(user,'fasdlfjkhasdlfhasldh')
  const isAllowed = verifyPermissions();
  return <>{isAllowed ? <div>{children}</div> : <NotAuthorized />}</>;
}

export default Permissions;
