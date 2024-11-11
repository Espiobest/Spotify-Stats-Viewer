import React, { useState, useEffect } from 'react';

import { fetchSpotifyData } from '../../services/spotifyService';
import { UserProfile } from '../../types/spotify';
import Navbar from '../../components/Navbar';
import TopArtistsList from '../../components/TopArtistsList';

import '../../app/globals.css';


const ArtistPage: React.FC = () => {

    const [timeRange, setTimeRange] = useState("short_term");
    const [topArtists, setTopArtists] = useState([]);
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [fade, setFade] = useState(false);
    
    useEffect(() => {
        
        const isAuthenticated = !!localStorage.getItem('access_token');
        setIsAuthenticated(isAuthenticated);
        
        if (!isAuthenticated) {
            window.location.href = '/login';
        }

        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        const fetchArtists = async () => {
            setFade(false);
            const data = await fetchSpotifyData(`me/top/artists?time_range=${timeRange}&limit=50`);
            setTopArtists(data.items);
            setTimeout(() => {
                setFade(true);
            }, 100);
        };

        const userData = localStorage.getItem('user');
        const parsedUserData = userData ? JSON.parse(userData as string) : null;
        setUserData(parsedUserData);

        fetchArtists();
    }, [timeRange]);

    return (
        <>
            {isAuthenticated ? (
                <div className="p-4" style={{ backgroundColor: '#121212' }}>
                    {userData && <Navbar userData={userData}></Navbar>}
                    <h1 className="text-3xl font-bold text-white mb-4 text-center">Your Top Artists</h1>
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="mb-4 p-2 border border-gray-600 rounded text-black sm:float-right"
                    >
                        <option value="short_term">Last Month</option>
                        <option value="medium_term">Last 6 Months</option>
                        <option value="long_term">All Time</option>
                    </select>
                    <br></br>
                   
                    <div className={`fade-in ${fade ? 'visible' : ''}`}>
                        <TopArtistsList artists={topArtists} showHeader={false} />
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ArtistPage;
