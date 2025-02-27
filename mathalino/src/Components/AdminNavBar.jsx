import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';

function AdminNavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('admin');
        const admin = localStorage.getItem('admin');
        if (!admin) {
            console.log('Admin successfully removed from localStorage');
        } else {
            console.log('Failed to remove admin from localStorage');
        }
        navigate('/login');
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return(
        <header className="bg-[#0F382A] text-yellow-300 p-4 flex justify-between items-center">
            <Link to="/adminhome">
                <h1 className="text-xl">Admin Dashboard</h1>
            </Link>

            <div className="block sm:hidden">
                <button onClick={ toggleMenu } className="focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                    </svg>
                </button>
            </div>

            <div className={`sm:flex ${isOpen ? "block" : "hidden"}`}>
                <Link to="/adminhome">
                    <button className="mr-4">Admin Home</button>
                </Link>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
}

export default AdminNavBar