import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

function Home() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.username) {
            setUsername(user.username);
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#61ADAB]">
            <NavBar username={username} />
            <main className="flex flex-col items-center justify-center mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/quiz?operation=addition">
                        <button className="w-full md:w-[400px] h-[275px] text-5xl font-bold bg-[#1AF2E8] text-white p-4 rounded-lg shadow-lg hover:bg-cyan-500">
                            Addition<br /> <span className="text-8xl font-bold">+</span>
                        </button>
                    </Link>
                    <Link to="/quiz?operation=-">
                        <button className="w-full md:w-[400px] h-[275px] bg-[#E9014D] text-5xl font-bold text-white p-4 rounded-lg shadow-lg hover:bg-red-600">
                            Subtract <br /> <span className="text-8xl font-bold">-</span>
                        </button>
                    </Link>
                    <Link to="/quiz?operation=*">
                        <button className="w-full md:w-[400px] h-[275px] text-5xl font-bold bg-[#147917] text-white p-4 rounded-lg shadow-lg hover:bg-green-700">
                            Multiplication <br /> <span className="text-8xl font-bold">×</span>
                        </button>
                    </Link>
                    <Link to="/quiz?operation=/">
                        <button className="w-full md:w-[400px] h-[275px] bg-[#0D059E] text-5xl font-bold text-white p-4 rounded-lg shadow-lg hover:bg-blue-900">
                            Division <br /> <span className="text-8xl font-bold">÷</span>
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default Home;