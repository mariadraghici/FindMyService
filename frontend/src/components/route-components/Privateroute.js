import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const auth = localStorage.getItem('jwt');

    if (auth) {
        return children;
    }

    return <Navigate to="/signin" />;
}

export default PrivateRoute;