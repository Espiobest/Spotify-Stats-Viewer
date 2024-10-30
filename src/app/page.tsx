'use client'

import React from 'react'; 
import { useEffect, useState } from 'react';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';


const MainPage: React.FC = () => {
   
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('spotify_access_token'));
    }, []);

    return (
      isAuthenticated ? <Dashboard /> : <Login />
        // <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        //     <header className="w-full p-4 bg-gray-800 text-white text-center">
        //         <h1 className="text-2xl font-bold">My Spotify Dashboard</h1>
        //     </header>

        //     <main className="flex flex-col items-center justify-center flex-1">
        //         {!isAuthenticated ? (
        //             <div className="flex flex-col items-center">
        //                 <h2 className="text-xl mb-4">Welcome to the Spotify Dashboard</h2>
        //                 <button
        //                     onClick={handleLogin}
        //                     className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        //                 >
        //                     Login with Spotify
        //                 </button>
        //             </div>
        //         ) : (
        //             <div>
        //                 <h2 className="text-xl mb-4">You are logged in!</h2>
        //                 <p>Redirecting to your dashboard...</p>
        //                 {router.push('/dashboard')} {/* Automatically redirect to dashboard */}
        //             </div>
        //         )}
        //     </main>

        //     <footer className="w-full p-4 bg-gray-800 text-white text-center">
        //         <p>&copy; {new Date().getFullYear()} My Spotify Dashboard. All rights reserved.</p>
        //     </footer>
        // </div>
    );
};

export default MainPage;
