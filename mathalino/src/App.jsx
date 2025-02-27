import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import EditProfile from './Components/EditProfile';
import Quiz from './Components/Quiz';
import History from './Components/History';
import Authentication from './Components/Authentication';
import AdminLogin from './Components/AdminLogin';
import AdminAuthentication from './Components/AdminAuthentication';
import AdminHome from './Components/AdminHome';

function App() {
    const token = localStorage.getItem('userToken');
    let user = null;

    if (token) {
        console.log('hihihi');
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp > currentTime) {
                user = decodedToken;
                console.log('User:', user);
            } else {
                localStorage.removeItem('userToken');
            }
        } catch (error) {
            console.error('Token decoding failed:', error);
            localStorage.removeItem('userToken');
        }
    }

    const adminToken = localStorage.getItem('admin');
    let admin = null;

    if (adminToken) {
        console.log('hahaha');
        try {
            const adminDecodedToken = jwtDecode(adminToken);
            const currentTime = Date.now() / 1000;

            if (adminDecodedToken.exp > currentTime) {
                admin = adminDecodedToken;
                console.log('Admin:', admin);
            } else {
                localStorage.removeItem('admin');
            }
        } catch (error) {
            console.error('adminToken decoding failed:', error);
            localStorage.removeItem('admin');
        }
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={user ? "/home" : admin ? "/adminhome" : "/login"} />} />
                <Route path="/login" element={user ? <Navigate to="/home" /> : admin ? <Navigate to="/adminhome" /> : <Login />} />
                <Route path="/home" element={<Authentication><Home /></Authentication>} />
                <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup />} />
                <Route path="/editprofile" element={<Authentication><EditProfile /></Authentication>} />
                <Route path="/quiz" element={<Authentication><Quiz /></Authentication>} />
                <Route path="/history" element={<Authentication><History /></Authentication>} />
                <Route path="/adminlogin" element={admin ? <Navigate to="/adminhome" /> : <AdminLogin />} />
                <Route path="/adminhome" element={<AdminAuthentication><AdminHome /></AdminAuthentication>} /> 
                <Route path="*" element={<Navigate to={user ? "/home" : admin ? "/adminhome" : "/login"} />} />
            </Routes>
        </Router>
    );
}

export default App;