import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Authentication = ({ children }) => {
    const token = localStorage.getItem('userToken');

    if (token) {
        try {
            const decodedToken = jwtDecode(token); // Use named import
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp > currentTime) {
                return children;
            } else {
                localStorage.removeItem('userToken');
                return <Navigate to="/login" />;
            }
        } catch (error) {
            console.error('Token decoding failed:', error);
            localStorage.removeItem('userToken');
            return <Navigate to="/login" />;
        }
    }

    return <Navigate to="/login" />;
};

export default Authentication;