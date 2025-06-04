import React, { useEffect } from "react";
import { useUser } from "../../context/userContext";
import { useLocation, useNavigate } from "react-router";
import { routes } from "../../utils/config";

function ProtectedRoute({ children }) {
  const { token } = useUser();
  const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else if (token && pathName === "/"){
        navigate(routes.TASK)
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoute;