import React, { useState, useEffect } from 'react';

import { fetchSpotifyData } from '../../services/spotifyService';
import { UserProfile } from '../../types/spotify';
import Navbar from '../../components/Navbar';
import TopArtistsList from '../../components/TopArtistsList';

import '../../app/globals.css';


const TracksPage: React.FC = () => {

    const [timeRange, setTimeRange] = useState("short_term");
    const [topArtists, setTopArtists] = useState([]);
    const [userData, setUserData] = useState<UserProfile | null>(null);
    
    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        const fetchArtists = async () => {
            const data = await fetchSpotifyData(`me/top/artists?time_range=${timeRange}&limit=50`);
            setTopArtists(data.items);
        };

        const userData = localStorage.getItem('user');
        const parsedUserData = userData ? JSON.parse(userData as string) : null;
        setUserData(parsedUserData);

        fetchArtists();
    }, [timeRange]);

    return (
        <div className="p-4" style={{ backgroundColor: '#121212' }}>
            {userData && <Navbar userData={userData}></Navbar>}
            <h1 className="text-3xl font-bold text-white mb-4">Top Artists</h1>
            <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="mb-4 p-2 border border-gray-600 rounded text-black"
            >
                <option value="short_term">Last Month</option>
                <option value="medium_term">Last 6 Months</option>
                <option value="long_term">All Time</option>
            </select>
            <TopArtistsList artists={topArtists} />
        </div>
    );
};

export default TracksPage;
