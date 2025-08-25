import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = useSelector((state) => state.user.token);
    if (!token || token === 'null' || token === '') {
        return <Navigate to="/" replace />;
    }
    console.log("Token valid, allowing access");
    return children;
};

export default ProtectedRoute;