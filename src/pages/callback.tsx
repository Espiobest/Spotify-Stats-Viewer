import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import '../app/globals.css';

const Callback: React.FC = () => {
    const router = useRouter();
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    const [loading, setLoading] = useState(true);

    if (!redirectUri) {
        console.error('Redirect URI not found in environment variables');
    }

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        const { code } = router.query;
        if (!code) {
            console.log("code not found");
            router.push('/login');
            return;
        }

        setTimeout(() => {
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
            setLoading(false);
        }, 1500);

        
    }, [router, redirectUri]);

    return (
        loading ? <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <Image src="/loading.svg" alt="Loading" width={128} height={128} className="mx-auto mb-4" />
            </div>
        </div> : null
    );
};

export default Callback;