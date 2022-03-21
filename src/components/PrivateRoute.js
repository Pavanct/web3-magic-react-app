import React, { useContext } from "react"
import { Navigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

function PrivateRoute({ children }) {
    const isLoggedIn = useContext(UserContext);
    return isLoggedIn ? (
      children
    ) : (
      <Navigate to="/login" />
    )
}

export default PrivateRoute