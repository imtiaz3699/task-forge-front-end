import React, { createContext, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router";
import { routes } from "../utils/config";
import { Spin } from "antd";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userCookie = Cookies.get("user");
  const [loading,setLoading] = React.useState(true);
  const [user, setUser] = React.useState(
    userCookie ? JSON.parse(userCookie) : ""
  );
  const [token, setToken] = React.useState(
    Cookies.get("token") ? Cookies.get("token") : ""
  );
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const cookieToken = Cookies.get("token") ?? "";
    if (cookieToken && pathName === "/") {
      navigate(routes.TASK);
    }
    setLoading(false); // done checking
  }, [token, pathName, navigate]);
  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
