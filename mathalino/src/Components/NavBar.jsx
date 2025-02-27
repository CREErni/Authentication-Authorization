import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ username }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
        const user = localStorage.getItem('user');
        if (!user) {
            console.log('User successfully removed from localStorage');
        } else {
            console.log('Failed to remove user from localStorage');
        }
        navigate('/login');
    
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-[#0F382A] text-yellow-300 p-4 flex justify-between items-center">
            <Link to="/home">
                <h1 className="text-xl">Hi, {username}!</h1>
            </Link>
            <div className="block sm:hidden">
                <button onClick={toggleMenu} className="focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                    </svg>
                </button>
            </div>
            <div className={`sm:flex ${isOpen ? 'block' : 'hidden'}`}>
                <Link to="/home">
                    <button className="mr-4">Home</button>
                </Link>
                <Link to="/editprofile">
                    <button className="mr-4">Profile</button>
                </Link>
                <Link to="/history">
                    <button className="mr-4">My History</button>
                </Link>
                <button onClick={handleLogout}>Logout</button>

            </div>
        </header>
    );
}

export default NavBar;