import React from 'react';
import { useEffect } from 'react';
import { NextPage } from 'next';
import Lottie from 'lottie-react';

import animation from '../../public/animation.json';
import '../app/globals.css'


const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

const Login: NextPage = () => {

    useEffect(() => {
        if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token') !== 'undefined') {
            window.location.href = '/dashboard';
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
            <h1 className="text-5xl p-2 text-center font-bold mb-6">Spotify Stats</h1>
            <Lottie className="w-1/2 lg:w-1/8 sm:w-1/4" animationData={animation} loop={true} autoplay={true}/>
            <br></br>
            <h1 className="text-3xl p-2 text-center font-bold mb-6">Explore Your Spotify Data</h1>
            <button onClick={() => handleLogin()} className="bg-green-500 text-white px-8 py-4 rounded hover:bg-green-600">
            Login with Spotify
            </button>
        </div>
    );
};

export default Login;