"use client";

import React from 'react';
import { NextPage } from 'next';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
console.log("clientId", clientId, redirectUri);

const Login: NextPage = () => {
    const handleLogin = () => {
        
        console.log("test", clientId, redirectUri);
        const scopes = [
            'user-read-private',
            'user-read-email',
            // Add other scopes as needed
        ];
        const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${scopes.join('%20')}&redirect_uri=${redirectUri}`;

        window.location.href = authUrl;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Login to Spotify</h1>
            <button onClick={() => handleLogin()} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Login with Spotify
            </button>
        </div>
    );
};

export default Login;