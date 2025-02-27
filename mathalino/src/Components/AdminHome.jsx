import React from 'react';
import AdminNavBar from './AdminNavBar';

function AdminHome() {
    console.log('AdminHome component rendered');
    return (
        <div className="min-h-screen bg-[#61ADAB]">
            <AdminNavBar />
            <main className="flex flex-col items-center justify-center mt-10">
                <h1 className="text-center">Hi admin</h1>
            </main>
        </div>
    );
}

export default AdminHome;