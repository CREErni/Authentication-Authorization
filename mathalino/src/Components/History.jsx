import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

function History() {
    const [username, setUsername] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.username) {
            setUsername(user.username);
            fetchHistory(user.userId);
        }
    }, []);

    const fetchHistory = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5273/api/scores/user/${userId}`);
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    const getOperatorName = (operator) => {
        switch (operator) {
            case 'addition':
                return 'Addition';
            case '-':
                return 'Subtraction';
            case '*':
                return 'Multiplication';
            case '/':
                return 'Division';
            default:
                return operator;
        }
    };

    return (
        <div className="min-h-screen bg-[#61ADAB]">
            <NavBar username={username} />
            <main className="flex flex-col items-center justify-center mt-10">
                <div className="w-full max-w-4xl bg-[#BCFFCA] p-8 rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold text-center text-[#0C7F18] mb-6">History</h2>
                    {history.length === 0 ? (
                        <p className="text-center text-xl">No quiz history available.</p>
                    ) : (
                        <table className="w-full table-auto border-collapse border border-green-800">
                            <thead>
                                <tr>
                                    <th className="border border-green-800 px-4 py-2">Date and Time Attempted</th>
                                    <th className="border border-green-800 px-4 py-2">Operator</th>
                                    <th className="border border-green-800 px-4 py-2">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((item) => {
                                    const attemptedAtDate = new Date(item.attemptedAt);
                                    console.log(attemptedAtDate);

                                    return (
                                        <tr key={item.scoreId}>
                                            <td className="border border-green-800 px-4 py-2 text-center">
                                                {attemptedAtDate.toLocaleString()}
                                            </td>
                                            <td className="border border-green-800 px-4 py-2 text-center">
                                                {getOperatorName(item.operator)}
                                            </td>
                                            <td className="border border-green-800 px-4 py-2 text-center">
                                                {item.scoreValue}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
}

export default History;