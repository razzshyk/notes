import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const index = () => {
  return !localStorage.getItem("uid") ? <Outlet /> : <Navigate to={"/"} />;
};

export default index;
