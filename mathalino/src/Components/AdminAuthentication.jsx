import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminAuthentication = ({ children }) => {
    const token = localStorage.getItem('admin');
    let admin = null;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp > currentTime) {
                admin = decodedToken;
            } else {
                localStorage.removeItem('admin');
            }
        } catch (error) {
            console.error('Token decoding failed:', error);
            localStorage.removeItem('admin');
        }
    }

    if (!admin) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AdminAuthentication;