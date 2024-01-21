import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import ajax from "../Services/fetchService";
import { useUser } from "../UserProvider";
import config from "../config";

const PrivateRoute = ({ children }) => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  if (user) {
    ajax(
      `${config.baseURL}/api/auth/validation?token=${user.jwt}`,
      "GET",
      user.jwt
    ).then((isValid) => {
      setIsValid(isValid);
      setIsLoading(false);
    });
  } else {
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;