import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import { useForm } from 'react-hook-form';

function EditProfile() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUsername(user.username);
            setValue("password", "");
        }
    }, [setValue]);

    const onUpdate = async (data) => {

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            setError('User not found');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5273/api/users/${user.userId}`, {
                username,
                password: data.password,
            });

            console.log('Update successful:', response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            alert("Successfully updated password");
        } catch (err) {
            console.error('Update failed:', err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data : 'An error occurred');
        }
    };

    const handleDelete = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            setError('User not found');
            return;
        }

        try {
            await axios.delete(`http://localhost:5273/api/users/${user.userId}`);
            console.log('Delete successful');
            localStorage.removeItem('user');
            navigate('/login');
        } catch (err) {
            console.error('Delete failed:', err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data : 'An error occurred');
        }
    };

    return (
        <div className="min-h-screen bg-[#61ADAB]">
            <NavBar username={username} />
            <div className="flex items-center justify-center min-h-screen bg-[#61ADAB]">
                <div className="p-8 rounded-lg w-96">
                    <h2 className="text-3xl font-bold text-center text-[#0C7F18] mb-6">Profile</h2>
                    <form onSubmit={handleSubmit(onUpdate)}>
                        <div className="mb-4">
                            <label className="text-2xl block text-[#0F382A] mb-1" htmlFor="username">Username</label>
                            <input
                                readOnly
                                type="text"
                                id="username"
                                value={username}
                                className="w-full p-2 rounded border bg-[#BCFFCA] border-[#BCFFCA] focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="text-2xl block text-[#0F382A] mb-1" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full p-2 rounded border bg-[#BCFFCA] border-[#BCFFCA] focus:outline-none focus:ring-2 focus:ring-teal-500"
                                {...register("password", { required: 'Password is required' })}
                            />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-[#0F382A] font-bold text-3xl text-[#F8E21E] p-2 rounded hover:bg-green-600 transition duration-200">
                            Update
                        </button>
                    </form>
                    <p className="text-center mt-4 text-[#0F382A]">
                        <button onClick={handleDelete}
                        className="w-full bg-[#E9014D] font-bold text-3xl text-white p-2 rounded hover:bg-red-700 transition duration-200 mt-4">
                            Delete
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;