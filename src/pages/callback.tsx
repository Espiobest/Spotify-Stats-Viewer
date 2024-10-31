import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Callback: React.FC = () => {
    const router = useRouter();
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

    if (!redirectUri) {
        console.error('Redirect URI not found in environment variables');
    }

    useEffect(() => {
        const { code } = router.query;
        if (!code) {
            console.error('No code found in query string');
            console.log("not found");
            router.push('/login');
            return;
        }

        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code as string,
                redirect_uri: redirectUri as string,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            try {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('expiry', (Date.now() + data.expires_in * 1000).toString());
                localStorage.setItem('refresh_token', data.refresh_token);
                router.push('/dashboard');
            }
            catch (error) {
                console.error('Error saving token to local storage:', error);
                router.push('/login');
            }
        })
        .catch((error) => {
            console.error('Error fetching token:', error);
            router.push('/login');
        });
    }, [router, redirectUri]);

    return (
        <div>
            <h1>Loading...</h1>
        </div>
    );
};

export default Callback;