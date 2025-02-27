import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function AdminLogin() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const adminToken = localStorage.getItem('admin');
        if (adminToken) {
            navigate('/adminhome');
        }
    }, [navigate]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5273/api/admins/login', data);
            console.log('Login successful:', response.data);
            localStorage.setItem('admin', response.data.token);
            navigate('/adminhome');
        } catch (err) {
            console.error('Login failed:', err.response ? err.response.data : err.message);
            setLoginError('Invalid username or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#61ADAB]">
            <div className="p-8 rounded-lg w-96">
                <h2 className="text-4xl text-center text-[#0C7F18] font-bold mb-6">Admin Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="text-2xl block text-[#0F382A] mb-1" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...register('username', { required: 'Username is required' })}
                            className="w-full p-2 rounded border bg-[#BCFFCA] border-[#BCFFCA] focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="text-2xl block text-[#0F382A] mb-1" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            className="w-full p-2 rounded border bg-[#BCFFCA] border-[#BCFFCA] focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    {loginError && <p className="text-red-500 text-center">{loginError}</p>}
                    <button type="submit" className="w-full bg-[#0F382A] font-bold text-3xl text-[#F8E21E] p-2 rounded hover:bg-green-600 transition duration-200">
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;