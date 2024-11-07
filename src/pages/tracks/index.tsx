import React, { useState, useEffect } from 'react';

import TopTracksList from '../../components/TopTracksList';
import Navbar from '../../components/Navbar';

import { UserProfile } from '../../types/spotify';
import { fetchSpotifyData } from '../../services/spotifyService';

import '../../app/globals.css';

const TracksPage: React.FC = () => {

    const [timeRange, setTimeRange] = useState("short_term");
    const [topTracks, setTopTracks] = useState([]);
    const [userData, setUserData] = useState<UserProfile | null>(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        const fetchTracks = async () => {
            const data = await fetchSpotifyData(`me/top/tracks?time_range=${timeRange}&limit=50`);
            setTopTracks(data.items);
        };

        fetchTracks();
    }, [timeRange]);

    return (
        <div className="p-4" style={{ backgroundColor: '#121212' }}>
            {userData && <Navbar userData={userData}></Navbar>}
            <h1 className="text-3xl font-bold text-white mb-4">Top Tracks</h1>
            <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="mb-4 p-2 border border-gray-600 rounded text-black"
            >
                <option value="short_term">Last Month</option>
                <option value="medium_term">Last 6 Months</option>
                <option value="long_term">All Time</option>
            </select>
            <TopTracksList tracks={topTracks} />
        </div>
    );
};

export default TracksPage;
