import React from 'react';
import { useEffect, useState } from 'react';
import TopTracksList from '../components/TopTracksList';
import TopArtistsList from '../components/TopArtistsList';
import { fetchSpotifyData } from '../services/spotifyService';

const Dashboard: React.FC = () => {

    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);

    useEffect(() => {
        const fetchTopTracks = async () => {
            const data = await fetchSpotifyData('me/top/tracks?time_range=medium_term&limit=10');
            setTopTracks(data.items);
        };
        const fetchTopArtists = async () => {
            const data = await fetchSpotifyData('me/top/artists?time_range=medium_term&limit=10');
            setTopArtists(data.items);
        };
        fetchTopTracks();
        fetchTopArtists();

    }, []);


    return (
        <div>
            <h1>Welcome to your Dashboard</h1>
            <p>Here you can see your Spotify stats.</p>
            <TopTracksList tracks={topTracks} />
            <TopArtistsList artists={topArtists} />
        </div>
    );
};

export default Dashboard;