import React from "react";
import {Outlet, Navigate} from "react-router-dom";

const ProtectedRoute = (props) => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");

    return isAuthenticated === "true" ? (
        <Outlet {...props} />
    ) : (
        <Navigate to="/login"/>
    );
};

export default ProtectedRoute;