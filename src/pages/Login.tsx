import React from 'react';
import { useEffect } from 'react';
import { NextPage } from 'next';
import '../app/globals.css'


const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

const LoginView: NextPage = () => {

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            window.location.href = '/Dashboard';
        }
    }, []);

    const handleLogin = () => {
        
        const scopes = [
            'user-read-currently-playing',
            'user-read-recently-played',
            'user-top-read',
            'user-library-read',
            'user-follow-read',
            'user-follow-modify',
        ];
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes.join('%20')}&redirect_uri=${redirectUri}`;

        window.location.href = authUrl;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Welcome to Spotify Stats</h1>
            <button onClick={() => handleLogin()} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Login with Spotify
            </button>
        </div>
    );
};

export default LoginView;