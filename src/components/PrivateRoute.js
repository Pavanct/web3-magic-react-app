import React, { useContext } from "react"
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from "../context/userContext";

function PrivateRoute({ isLoggedIn, children }) {
    return isLoggedIn ? children : <Navigate to="/login" />
}

export default PrivateRoute